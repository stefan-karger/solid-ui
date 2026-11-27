// Runs the independent checks and builds in parallel, then the browser tests.
// `pnpm validate` runs the @smoke browser tests against the built docs;
// `pnpm validate:full` also builds the adapter fixture and runs every test.
import { spawn } from "node:child_process"

const full = process.argv.includes("--full")

type Result = { name: string; code: number | null; output: string }

function run(name: string, command: string, quiet = true) {
  return new Promise<Result>((resolve) => {
    const started = performance.now()
    const child = spawn(command, {
      shell: true,
      stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
      env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? "1" }
    })
    let output = ""
    child.stdout?.on("data", (chunk: Buffer) => (output += chunk))
    child.stderr?.on("data", (chunk: Buffer) => (output += chunk))
    child.on("close", (code) => {
      const seconds = ((performance.now() - started) / 1000).toFixed(1)
      console.log(`${code === 0 ? "✓" : "✗"} ${name} (${seconds}s)`)
      resolve({ name, code, output })
    })
  })
}

// None of these steps reads another's output. The docs build and `astro check`
// both regenerate the same Astro types, so their overlap is harmless.
const results = await Promise.all([
  run("astro:check", "pnpm astro:check"),
  run("format:check", "pnpm format:check"),
  run("lint", "pnpm lint"),
  run("check", "pnpm check"),
  run("test", "pnpm test"),
  run("build", "pnpm build"),
  ...(full
    ? [
        run(
          "adapter fixture build",
          "pnpm --filter docs exec astro build --root test/fixtures/adapter"
        )
      ]
    : [])
])
const failed = results.filter((result) => result.code !== 0)
for (const result of failed)
  console.log(`\n──── ${result.name} ────\n${result.output.trimEnd()}`)
if (failed.length) process.exit(1)

// The smoke tests need only the docs server (see playwright.config.ts).
if (!full) process.env.E2E_SCOPE = "docs"
const browser = await run(
  full ? "browser tests" : "browser smoke tests",
  full ? "pnpm test:e2e" : "pnpm test:e2e --grep @smoke",
  false
)
if (browser.code !== 0) process.exit(1)
if (!full)
  console.log(
    "\nSmoke validation passed. Run `pnpm validate:full` before handing back a larger change."
  )
