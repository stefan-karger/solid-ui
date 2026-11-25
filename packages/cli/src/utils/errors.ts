// An expected failure with a message for the user. The CLI prints it without
// a stack trace and exits with the code.
export class CliError extends Error {
  constructor(
    message: string,
    readonly exitCode = 1
  ) {
    super(message)
    this.name = "CliError"
  }
}
