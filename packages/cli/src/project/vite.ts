import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

const CONFIG_NAMES = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
  "vite.config.cts",
  "vite.config.cjs"
]

export function findViteConfig(cwd: string): string | null {
  for (const name of CONFIG_NAMES) {
    const file = path.join(cwd, name)
    if (existsSync(file)) return file
  }
  return null
}

// True when the config visibly resolves `~/`: Vite's own tsconfig paths
// option, the vite-tsconfig-paths plugin, or an alias for `~`.
export function resolvesTildeAlias(configText: string) {
  return (
    /tsconfigPaths\s*:\s*true/.test(configText) ||
    /tsconfigPaths\s*\(/.test(configText) ||
    /["'`]~["'`]\s*:/.test(configText) ||
    /find\s*:\s*["'`]~/.test(configText)
  )
}

export function readViteConfig(cwd: string) {
  const file = findViteConfig(cwd)
  return file ? { path: file, text: readFileSync(file, "utf8") } : null
}

export const TSCONFIG_PATHS_SNIPPET = `export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [solid(), tailwindcss()]
})`
