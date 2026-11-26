import { copyToClipboard } from "~/lib/clipboard"

export type CopyKind = "code" | "command"
export type CopyState = "idle" | "success" | "error"

const RESET_DELAY = 2000

const feedbackText: Record<
  CopyKind,
  Record<CopyState, { label: string; status: string }>
> = {
  code: {
    idle: { label: "Copy code", status: "" },
    success: { label: "Code copied", status: "Code copied" },
    error: { label: "Copy failed", status: "Could not copy code" }
  },
  command: {
    idle: { label: "Copy command", status: "" },
    success: { label: "Command copied", status: "Command copied" },
    error: { label: "Copy failed", status: "Could not copy command" }
  }
}

/**
 * Applies copy feedback to a button. `root` owns the copy and check icons and
 * the polite live region. Idle clears the live region so a reset is silent.
 */
export function setCopyFeedback(
  button: HTMLButtonElement,
  root: HTMLElement,
  kind: CopyKind,
  state: CopyState
) {
  const { label, status } = feedbackText[kind][state]
  button.dataset.copyState = state
  button.setAttribute("aria-label", label)
  root
    .querySelector<SVGElement>("[data-copy-icon]")
    ?.classList.toggle("hidden", state === "success")
  root
    .querySelector<SVGElement>("[data-check-icon]")
    ?.classList.toggle("hidden", state !== "success")
  const copyStatus = root.querySelector<HTMLElement>("[data-copy-status]")
  if (copyStatus) copyStatus.textContent = status
}

function initializeCopyButton(button: HTMLButtonElement) {
  if (button.dataset.initialized === "true") return
  button.dataset.initialized = "true"

  let operation = 0
  let resetTimer: number | undefined

  button.addEventListener("click", async () => {
    const value = button.dataset.copyValue
    if (!value) return

    const current = ++operation
    window.clearTimeout(resetTimer)
    const copied = await copyToClipboard(value)
    // A newer click owns the feedback once it starts.
    if (current !== operation) return

    setCopyFeedback(button, button, "code", copied ? "success" : "error")
    resetTimer = window.setTimeout(
      () => setCopyFeedback(button, button, "code", "idle"),
      RESET_DELAY
    )
  })
}

export function initializeCopyButtons() {
  for (const button of document.querySelectorAll<HTMLButtonElement>(
    "[data-copy-button]"
  )) {
    initializeCopyButton(button)
  }
}
