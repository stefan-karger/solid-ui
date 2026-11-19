import { createHash } from "node:crypto"
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { basename, dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { gzipSync } from "node:zlib"

import ts from "typescript"

const root = fileURLToPath(new URL("../", import.meta.url))
const vendor = join(root, "vendor/astro-solid")
const upstream = join(vendor, "upstream")
const manifest = JSON.parse(await readFile(join(vendor, "revision.json"), "utf8")) as {
  revision: string
  files: Record<string, string>
  packages: Array<{
    name: string
    path: string
    version: string
    archive: string
    dependencies: Record<string, string>
  }>
}
const dependencyArg = process.argv.indexOf("--dependencies")
const dependencyRoot = dependencyArg < 0 ? root : resolve(process.argv[dependencyArg + 1]!)
for (const [file, hash] of Object.entries(manifest.files)) {
  const contents = await readFile(join(upstream, file))
  if (createHash("sha256").update(contents).digest("hex") !== hash)
    throw new Error(`Pinned Astro source changed: ${file}`)
}
async function sources(directory: string): Promise<string[]> {
  return (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? sources(join(directory, entry.name)) : [join(directory, entry.name)]
      )
    )
  )
    .flat()
    .sort()
}

// Emit declarations with the pinned upstream source unchanged. The resolver's
// fallback supports pnpm's isolated transitive dependencies during packaging.
const declarationRoot = await mkdtemp(join(tmpdir(), "astro-solid-types-"))
const allSources = (
  await Promise.all(manifest.packages.map((pkg) => sources(join(upstream, pkg.path, "src"))))
).flat()
const options: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  newLine: ts.NewLineKind.LineFeed,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  skipLibCheck: true,
  declaration: true,
  emitDeclarationOnly: true,
  // Like upstream's build:ci transpilation, packaging does not alter or repair
  // PR source types. Consumers are checked against the emitted declarations.
  noCheck: true,
  customConditions: ["node"],
  rootDir: join(upstream, "packages"),
  outDir: declarationRoot,
  paths: {
    "@astrojs/solid-js-renderer": [join(upstream, "packages/renderers/solid-js/src/index.ts")],
    "@astrojs/solid-js-renderer/*": [join(upstream, "packages/renderers/solid-js/src/*")]
  }
}
const host = ts.createCompilerHost(options)
host.resolveModuleNames = (names, containingFile) =>
  names.map((name) => {
    const dependencies = [
      join(dependencyRoot, "apps/docs/resolve.ts"),
      join(dependencyRoot, "node_modules/.pnpm/resolve.ts")
    ]
    for (const from of name.startsWith(".")
      ? [containingFile]
      : [...dependencies, containingFile]) {
      const found = ts.resolveModuleName(name, from, options, host).resolvedModule
      if (found) return found
    }
    return undefined
  })
const program = ts.createProgram(allSources, options, host)
const diagnostics = ts.getPreEmitDiagnostics(program)
if (diagnostics.some((item) => item.category === ts.DiagnosticCategory.Error)) {
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => root,
      getCanonicalFileName: (file) => file,
      getNewLine: () => "\n"
    })
  )
}
program.emit()

// Portable USTAR + a zero-time gzip header makes the committed archives
// reproducible without platform-specific tar flags or an upstream monorepo install.
function archive(files: Map<string, Buffer>) {
  const chunks: Buffer[] = []
  for (const [path, bytes] of [...files].sort(([a], [b]) => a.localeCompare(b, "en"))) {
    const name = `package/${path}`
    if (Buffer.byteLength(name) > 100) throw new Error(`Tar path is too long: ${name}`)
    const header = Buffer.alloc(512)
    header.write(name, 0, 100)
    const octal = (value: number, offset: number, length: number) =>
      header.write(value.toString(8).padStart(length - 1, "0") + "\0", offset, length)
    octal(0o644, 100, 8)
    octal(0, 108, 8)
    octal(0, 116, 8)
    octal(bytes.length, 124, 12)
    octal(0, 136, 12)
    header.fill(32, 148, 156)
    header.write("0", 156)
    header.write("ustar\0", 257)
    header.write("00", 263)
    const checksum = header.reduce((sum, byte) => sum + byte, 0)
    header.write(checksum.toString(8).padStart(6, "0") + "\0 ", 148, 8)
    chunks.push(header, bytes, Buffer.alloc((512 - (bytes.length % 512)) % 512))
  }
  chunks.push(Buffer.alloc(1024))
  const compressed = gzipSync(Buffer.concat(chunks), { level: 9 })
  // zlib writes a platform-specific OS byte even with a zero timestamp.
  // Use gzip's "unknown" value so Windows and Linux produce identical archives.
  compressed[9] = 255
  return compressed
}

try {
  for (const pkg of manifest.packages) {
    const original = JSON.parse(await readFile(join(upstream, pkg.path, "package.json"), "utf8"))
    const packaged = { ...original, version: pkg.version, dependencies: pkg.dependencies }
    delete packaged.devDependencies
    delete packaged.scripts
    const files = new Map<string, Buffer>([
      ["package.json", Buffer.from(JSON.stringify(packaged, null, 2) + "\n")],
      ["LICENSE", await readFile(join(upstream, "LICENSE"))],
      ["README.md", await readFile(join(upstream, pkg.path, "README.md"))]
    ])
    for (const file of await sources(join(upstream, pkg.path, "src"))) {
      const local = relative(join(upstream, pkg.path, "src"), file).replaceAll("\\", "/")
      if (file.endsWith(".d.ts")) {
        files.set(`dist/${local}`, await readFile(file))
        continue
      }
      if (!file.endsWith(".ts")) continue
      const source = await readFile(file, "utf8")
      const js = ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          newLine: ts.NewLineKind.LineFeed
        }
      }).outputText
      files.set(`dist/${local.slice(0, -3)}.js`, Buffer.from(js))
      const declaration = join(declarationRoot, relative(join(upstream, "packages"), file)).replace(
        /\.ts$/,
        ".d.ts"
      )
      files.set(`dist/${local.slice(0, -3)}.d.ts`, await readFile(declaration))
    }
    const bytes = archive(files)
    const target = join(vendor, pkg.archive)
    if (process.argv.includes("--check")) {
      if (!(await readFile(target)).equals(bytes))
        throw new Error(`Rebuild upstream package: ${pkg.archive}`)
    } else await writeFile(target, bytes)
    process.stdout.write(
      `${pkg.name}@${pkg.version} ${createHash("sha256").update(bytes).digest("hex")}\n`
    )
  }
} finally {
  await removeDeclarations()
}

async function removeDeclarations() {
  // mkdtemp created this exact directory; it contains generated declarations only.
  const temporary = resolve(declarationRoot)
  if (
    dirname(temporary) !== resolve(tmpdir()) ||
    !basename(temporary).startsWith("astro-solid-types-")
  )
    throw new Error(`Unexpected temporary directory: ${temporary}`)
  await rm(temporary, { recursive: true, force: true })
}
