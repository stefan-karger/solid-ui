import { readFileSync } from "node:fs"
import path from "node:path"

export type PackageJson = {
  name?: string
  version?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

export function readPackageJson(dir: string): PackageJson | null {
  try {
    return JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8"))
  } catch {
    return null
  }
}

export function declaredRange(pkg: PackageJson, name: string) {
  return pkg.dependencies?.[name] ?? pkg.devDependencies?.[name]
}
