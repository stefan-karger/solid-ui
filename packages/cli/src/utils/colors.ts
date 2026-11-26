import { styleText } from "node:util"

import { CLI_VERSION } from "./version"

type Format = Parameters<typeof styleText>[0]

// styleText drops the codes when stdout is no color terminal and honors
// NO_COLOR and FORCE_COLOR, as clack does for its own symbols.
const style = (format: Format) => (text: string) => styleText(format, text)

export const color = {
  // Commands and code to copy.
  command: style("cyan"),
  // Files init or add creates, changes or leaves alone.
  added: style("green"),
  changed: style("cyan"),
  kept: style("yellow"),
  muted: style("dim")
}

// The intro badge, styled like create-solid's.
export function badge(title = `Solid UI v${CLI_VERSION}`) {
  return styleText(["bgCyan", "black"], ` ${title} `)
}
