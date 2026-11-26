#! /usr/bin/env node
import { Command } from "commander"

import { add } from "~/commands/add"
import { init } from "~/commands/init"
import { CliError } from "~/utils/errors"
import { terminalUi } from "~/utils/ui"
import { CLI_NAME, CLI_VERSION } from "~/utils/version"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name(CLI_NAME)
    .description("add Solid UI components to your Solid 2 project")
    .version(CLI_VERSION, "-v, --version", "display the version number")
    .addCommand(init)
    .addCommand(add)

  try {
    await program.parseAsync()
  } catch (error) {
    if (error instanceof CliError) {
      if (error.exitCode !== 0) terminalUi.error(error.message)
      process.exitCode = error.exitCode
      return
    }
    throw error
  }
}

void main()
