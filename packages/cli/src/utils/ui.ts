import * as p from "@clack/prompts"

import { CliError } from "./errors"

export type SelectOption<T> = { value: T; label: string; hint?: string }

// What the commands print and ask. The terminal UI uses clack; tests record
// the messages and answer the prompts.
export type Ui = {
  intro(title: string): void
  outro(message: string): void
  info(message: string): void
  success(message: string): void
  warn(message: string): void
  error(message: string): void
  note(message: string, title?: string): void
  select<T>(
    message: string,
    options: SelectOption<T>[],
    initial?: T
  ): Promise<T>
  multiselect<T>(message: string, options: SelectOption<T>[]): Promise<T[]>
  confirm(message: string, initial?: boolean): Promise<boolean>
  task<T>(message: string, run: () => Promise<T>, done?: string): Promise<T>
}

function cancelled<T>(value: T | symbol): T {
  if (p.isCancel(value)) {
    p.cancel("Cancelled.")
    throw new CliError("Cancelled.", 0)
  }
  return value as T
}

export const terminalUi: Ui = {
  // A blank line, then the badge, as create-solid prints it.
  intro: (title) => p.intro(`\n${title}`),
  outro: (message) => p.outro(message),
  info: (message) => p.log.info(message),
  success: (message) => p.log.success(message),
  warn: (message) => p.log.warn(message),
  error: (message) => p.log.error(message),
  note: (message, title) => p.note(message, title),
  select: async (message, options, initial) =>
    cancelled(
      await p.select({
        message,
        options: options as Parameters<typeof p.select>[0]["options"],
        initialValue: initial
      })
    ) as never,
  multiselect: async (message, options) =>
    cancelled(
      await p.multiselect({
        message,
        options: options as Parameters<typeof p.multiselect>[0]["options"],
        required: false
      })
    ) as never,
  confirm: async (message, initial = true) =>
    cancelled<boolean>(await p.confirm({ message, initialValue: initial })),
  task: async (message, run, done) => {
    const spinner = p.spinner()
    spinner.start(message)
    try {
      const result = await run()
      spinner.stop(done ?? message)
      return result
    } catch (error) {
      spinner.stop(`${message} failed.`)
      throw error
    }
  }
}
