// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Marker, MarkerContent, MarkerIcon } from "~/registry/ui/marker"
import { Toaster, createToaster } from "~/registry/ui/toast"

export default function MarkerLinkButtonDemo() {
  const toast = createToaster()
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Toaster toaster={toast} />
      <Marker
        render={(partProps) => (
          <a {...partProps} href="#links-and-buttons">
            <MarkerIcon>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M15 6a9 9 0 0 0-9 9V3" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
              </svg>
            </MarkerIcon>
            <MarkerContent>View the pull request</MarkerContent>
          </a>
        )}
      />
      <Marker
        render={(partProps) => (
          <button
            {...partProps}
            type="button"
            class={`${partProps.class} transition-colors hover:text-foreground`}
            onClick={() => toast("You clicked the revert button")}
          >
            <MarkerIcon>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </MarkerIcon>
            <MarkerContent>Revert this change</MarkerContent>
          </button>
        )}
      />
    </div>
  )
}
