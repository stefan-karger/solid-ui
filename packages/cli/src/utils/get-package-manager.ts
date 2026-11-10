import { execa } from "execa"
import { type Agent, detect, resolveCommand } from "package-manager-detector"

export async function getPackageManager(targetDir: string): Promise<Agent> {
  const result = await detect({ cwd: targetDir })
  return result?.agent ?? "npm"
}

/**
 * Installs `dependencies` in `cwd` with the project's package manager,
 * using that manager's own add syntax (e.g. `npm i`, `pnpm add`, `deno add npm:<pkg>`).
 */
export async function installDependencies(cwd: string, dependencies: string[]) {
  if (!dependencies.length) {
    return
  }

  const agent = await getPackageManager(cwd)
  const resolved = resolveCommand(agent, "add", dependencies)
  if (!resolved) {
    throw new Error(`${agent} does not support adding dependencies.`)
  }

  await execa(resolved.command, resolved.args, { cwd })
}
