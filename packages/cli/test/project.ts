import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

import { SUPPORTED_VERSIONS } from "@solid-ui/registry/versions"
import semver from "semver"
import { afterEach } from "vitest"

// The lowest version each supported range allows, as an installed project
// would have it.
export const supportedInstall = Object.fromEntries(
  Object.entries(SUPPORTED_VERSIONS.requirements).map(([name, range]) => [
    name,
    semver.minVersion(range)!.version
  ])
)

// tsconfig.json of the solidjs/templates solid-v2 starters (331a9bd).
export const TEMPLATE_TSCONFIG = `{
  "compilerOptions": {
    // General
    "jsx": "preserve",
    "jsxImportSource": "@solidjs/web",
    "target": "ESNext",

    // Modules
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,

    // Type Checking & Safety
    "strict": true,
    "skipLibCheck": true,
    "types": ["vite/client"]
  }
}
`

// vite.config.ts of the solid-v2 Tailwind starter (331a9bd).
export const TEMPLATE_VITE_CONFIG = `import tailwindcss from '@tailwindcss/vite';
import { fileRoutes } from 'filesystem-routing/vite';
import { defineConfig } from 'vitest/config';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  // Turnkey client mode: no index.html and no mount file — the plugin generates
  // the entries around src/App.tsx (wrapped in src/Document.tsx) and \`vite build\`
  // prerenders the shell into a purely static dist/client.
  plugins: [
    // \`extensions\` makes @solidjs/vite-plugin also compile the \`?pick=\` route
    // modules the fileRoutes plugin emits (their ids end in a query string).
    solid({ start: true, extensions: ['.jsx', '.tsx'], diagnostics: true }), // add \`ssr: true\` for streaming SSR
    fileRoutes({ types: true }),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./vitest-setup.ts'],
    // if you have few tests, try commenting this
    // out to improve performance:
    isolate: false,
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
  },
});
`

export type ProjectOptions = {
  // Installed packages, as name → version. Each also lands in package.json.
  installed?: Record<string, string>
  // Declared in package.json without an install.
  declared?: Record<string, string>
  files?: Record<string, string>
}

const created: string[] = []

afterEach(() => {
  for (const dir of created.splice(0))
    rmSync(dir, { recursive: true, force: true })
})

export function createProject({
  installed = { ...supportedInstall, typescript: "7.0.2" },
  declared = {},
  files = {
    "tsconfig.json": TEMPLATE_TSCONFIG,
    "vite.config.ts": TEMPLATE_VITE_CONFIG,
    "src/App.css": "@import 'tailwindcss';\n"
  }
}: ProjectOptions = {}) {
  const cwd = mkdtempSync(path.join(tmpdir(), "solidui-cli-"))
  created.push(cwd)
  const write = (file: string, content: string) => {
    mkdirSync(path.dirname(path.join(cwd, file)), { recursive: true })
    writeFileSync(path.join(cwd, file), content)
  }

  const dependencies = {
    ...Object.fromEntries(
      Object.entries(installed).map(([name, version]) => [name, `^${version}`])
    ),
    ...declared
  }
  write(
    "package.json",
    JSON.stringify({ name: "app", type: "module", dependencies }, null, 2)
  )
  for (const [name, version] of Object.entries(installed))
    write(
      `node_modules/${name}/package.json`,
      JSON.stringify({ name, version })
    )
  for (const [file, content] of Object.entries(files)) write(file, content)
  return cwd
}
