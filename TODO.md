# Remaining registry work

The current registry has 63 components and 442 examples. Docs include responsive navigation, a page TOC, persistent light/dark mode, and all eight shadcn styles in upstream order. See [SHADCN_PARITY.md](./SHADCN_PARITY.md) for the pinned inputs and intentional SDK differences.

Calendar, date picker, carousel, drawer, OTP, resizable panels, scroll area, and notifications now use UI SDK. The chat, attachment, code block, trace, and questionnaire families have examples, registry metadata, and docs.

Chart remains excluded. The upstream implementation uses React Recharts, and UI SDK has no chart engine. Select a Solid 2-compatible chart library before porting that component.

Data Table remains deferred. The upstream guide uses TanStack Table v9, whose Solid adapter targets Solid 1.

Further example coverage can add the remaining historical variants and optional product-specific chat integrations. The current examples exercise the exported components and their supported behavior. Do not add React, Kobalte, or Corvu compatibility layers for those variants.
