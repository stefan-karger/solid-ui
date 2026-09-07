// TODO: Replace this temporary console feedback with Sonner toasts once they are available.
export async function copyToClipboard(value: string) {
  if (!navigator.clipboard?.writeText) {
    console.error("[clipboard] Clipboard API is unavailable.");
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    console.info("[clipboard] Copied to clipboard.");
    return true;
  } catch (error) {
    console.error("[clipboard] Failed to copy to clipboard.", error);
    return false;
  }
}
