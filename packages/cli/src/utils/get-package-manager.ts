import { detect } from "@antfu/ni"

export async function getPackageManager(
  targetDir: string
): Promise<"yarn" | "pnpm" | "bun" | "npm" | "deno"> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir })

  switch (packageManager) {
    case "yarn":
    case "yarn@berry":
      return "yarn"
    case "pnpm":
    case "pnpm@6":
      return "pnpm"
    case "bun":
    case "deno":
      return packageManager
    default:
      return "npm"
  }
}
