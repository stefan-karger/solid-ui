import { copyToClipboard } from "@/lib/clipboard";

function initializeCopyButton(button: HTMLButtonElement) {
  if (button.dataset.initialized === "true") return;
  button.dataset.initialized = "true";

  const copyIcon = button.querySelector<SVGElement>("[data-copy-icon]");
  const checkIcon = button.querySelector<SVGElement>("[data-check-icon]");
  const copyStatus = button.querySelector<HTMLElement>("[data-copy-status]");
  let resetTimer: number | undefined;

  button.addEventListener("click", async () => {
    const value = button.dataset.copyValue;
    if (!value || !(await copyToClipboard(value))) return;

    button.dataset.copied = "true";
    button.setAttribute("aria-label", "Code copied");
    copyIcon?.classList.add("hidden");
    checkIcon?.classList.remove("hidden");
    if (copyStatus) copyStatus.textContent = "Code copied";

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      delete button.dataset.copied;
      button.setAttribute("aria-label", "Copy code");
      copyIcon?.classList.remove("hidden");
      checkIcon?.classList.add("hidden");
      if (copyStatus) copyStatus.textContent = "Copy code";
    }, 2000);
  });
}

export function initializeCopyButtons() {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy-button]")) {
    initializeCopyButton(button);
  }
}
