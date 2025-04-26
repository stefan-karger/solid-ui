#! /usr/bin/env node
import { Command } from "commander"

import { add } from "@/commands/add"
import { init } from "@/commands/init"
import { getPackageInfo } from "@/utils/get-package-info"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  console.clear()

  const packageInfo = getPackageInfo()

  new Command()
    .name("solidui-cli")
    .description("add SolidUI components to your project")
    .version(packageInfo.version || "0.0.0", "-v, --version", "display the version number")
    .addCommand(init)
    .addCommand(add)
    .parse()
}

main()
