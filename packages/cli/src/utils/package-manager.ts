import { execa } from "execa"
import type { Agent } from "package-manager-detector"
import { resolveCommand } from "package-manager-detector/commands"
import { detect } from "package-manager-detector/detect"

export type Installer = (cwd: string, specs: string[]) => Promise<void>

export async function detectAgent(cwd: string): Promise<Agent> {
  return (await detect({ cwd }))?.agent ?? "npm"
}

// Installs the packages in one call with the project's package manager.
export const installPackages: Installer = async (cwd, specs) => {
  if (!specs.length) return
  const agent = await detectAgent(cwd)
  const args = agent === "deno" ? specs.map((spec) => `npm:${spec}`) : specs
  const command = resolveCommand(agent, "add", args)
  if (!command)
    throw new Error(`Could not build an install command for ${agent}.`)
  await execa(command.command, command.args, { cwd, stdio: "inherit" })
}
