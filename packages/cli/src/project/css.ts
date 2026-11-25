import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const IGNORED_DIRS = new Set([
  "node_modules",
  "dist",
  "build",
  "public",
  "coverage",
  ".git",
  ".output",
  ".vinxi",
  ".astro",
  ".turbo"
])

const TAILWIND_IMPORT = /@import\s+(?:url\()?["']tailwindcss["']/

export function importsTailwind(css: string) {
  return TAILWIND_IMPORT.test(css)
}

// Stylesheets that import Tailwind CSS 4, relative to cwd with forward slashes.
export function findTailwindStylesheets(cwd: string, maxDepth = 5): string[] {
  const found: string[] = []
  const walk = (dir: string, depth: number) => {
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (depth < maxDepth && !IGNORED_DIRS.has(entry.name))
          walk(full, depth + 1)
      } else if (entry.name.endsWith(".css")) {
        try {
          if (importsTailwind(readFileSync(full, "utf8"))) {
            found.push(path.relative(cwd, full).split(path.sep).join("/"))
          }
        } catch {
          // Unreadable files can't be the entry stylesheet.
        }
      }
    }
  }
  walk(cwd, 0)
  return found.sort()
}
