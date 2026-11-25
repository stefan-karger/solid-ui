// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarBadgeIconExample() {
  return (
    <Avatar class="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
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
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </AvatarBadge>
    </Avatar>
  )
}
