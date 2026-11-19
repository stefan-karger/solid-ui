import { render } from "@solidjs/web"
import { expect, it } from "vitest"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle
} from "./alert-dialog"

it.each(["confirm", "cancel"])(
  "reports the %s action through the native SDK return value",
  async (response) => {
    const host = document.createElement("div")
    document.body.append(host)
    let result: string | undefined
    const dispose = render(
      () => (
        <AlertDialog
          defaultOpen
          onOpenChange={(open, details) => {
            if (!open) result = details.returnValue
          }}
        >
          <AlertDialogContent>
            <AlertDialogTitle>Confirm test action</AlertDialogTitle>
            <AlertDialogAction>Confirm</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ),
      host
    )
    try {
      await new Promise((resolve) => setTimeout(resolve, 0))
      const button = Array.from(document.querySelectorAll("button")).find(
        (node) => node.textContent?.toLowerCase() === response
      )!
      button.click()
      await new Promise((resolve) => setTimeout(resolve, 0))
      expect(result).toBe(response)
    } finally {
      dispose()
      host.remove()
    }
  }
)
