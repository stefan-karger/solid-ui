# Shadcn themes and SDK composition

The registry uses UI SDK `0.1.0-beta.10` with Solid
`2.0.1`. Components compose named SDK parts directly and import each part
as `SdkXxx`, following [spec-01's convention](https://github.com/shuding/spec-01/tree/b8f91b6646d9280d9de8e0f5b2c6453cb4f237cb/registry/hardware/ui).
There are no SDK namespace imports, `Primitive.Root` maps, fake portals, or
collection compatibility helpers in the registry.

The structural reference is shadcn/ui
[`968d8cb9dc42ae5d52e8fd356cf84596ec832a26`](https://github.com/shadcn-ui/ui/tree/968d8cb9dc42ae5d52e8fd356cf84596ec832a26/apps/v4/registry/bases/base/ui),
primarily its Base UI implementation. The audit also compared the Radix and
new-york-v4 implementations. Delta Bar remains a project extension.

## Upstream inputs and generated themes

`vendor/shadcn/styles/style-{vega,nova,maia,lyra,mira,luma,sera,rhea}.css` are byte-for-byte
upstream inputs. `vendor/shadcn/revision.json` pins their revision and SHA-256
checksums. The upstream MIT license is included. Formatting excludes the vendor
directory so it cannot silently rewrite those inputs.

Run `pnpm themes:generate` after changing the pinned inputs or the mapping in
`apps/docs/src/lib/registry-theme.ts`. It writes the eight effective styles under
`apps/docs/src/registry/styles`. The docs import those files, and
`prepareRegistrySource` expands the same rules into the installed component's
Tailwind classes. `pnpm themes:check`, included in `pnpm validate`, rejects stale
outputs or modified upstream inputs.

The mapping covers SDK slot names, orientation attributes, popup exit presence,
Command group labels and highlight state, tab selection, native slider focus and
dragging, navigation state, InputGroup focus hooks, and hidden form inputs in
ButtonGroup selectors, OTP active state, and Drawer side attributes. Delta Bar's four rules per theme are separate extensions.
Upstream-only Aria styles and components outside this registry remain in the
inputs; they do not require adding those components to this project.

## Component API changes

| Previous API                                                                 | Current API                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `as={Button}` on SDK parts                                                   | `render={(partProps) => <Button {...partProps} />}`                            |
| `options`, `optionValue`, `optionLabel`, `itemComponent`, `sectionComponent` | Explicit items and groups, usually rendered with `For`                         |
| Collection `onChange`                                                        | Select/Combobox `onValueChange`, Command `onAction`                            |
| `onInputChange`                                                              | `onQueryChange`                                                                |
| Select-generated content/list                                                | Caller children inside `SelectContent`                                         |
| Custom Combobox chip state/removal                                           | SDK `ComboboxValue`, `ComboboxChips`, `ComboboxChip`, and `ComboboxChipRemove` |
| Root popup `placement`/`gutter`                                              | Content `side`/`align`/`sideOffset`                                            |
| Checkbox `indeterminate` boolean                                             | `checked="indeterminate"`                                                      |
| Checkbox/Switch `onChange`                                                   | `onCheckedChange`                                                              |

Object values remain supported through native `itemToValue` and `itemToLabel`.
Examples, manual installation instructions, and registry dependencies use these
APIs. Presentation-only parts use Solid's `dynamic()` for element overrides.
Interactive SDK parts retain the SDK `render` callback.

Button sets its variant, size, and slot on the element chosen by `as`. It
defaults to a native button with `type="button"`. SDK controls can use Button
as their renderer and own the interaction props they forward to it.

## Intentional SDK differences

- Switches retain each upstream shape, including round Lyra and square Sera. Thumbs inherit
  custom track corners, align at the track edge, and move in the reading direction.

- SDK owns slots, roles, references, and state attributes. A wrapper cannot rename
  `tabs-tab`, `tabs-panel`, `accordion-panel`, or `slider-indicator` by passing a
  different slot. Styled compositions that expose their own slot set it on the
  rendered element and forward the SDK part props. InputGroup uses `data-ui="input-group-control"` as a separate
  styling hook, including its native input and SDK Combobox inputs.
- Popups render in place and use the browser top layer. Content supplies placement
  options and `data-ending-style` supplies exit styling. There are no Radix portal
  or positioner wrappers.
- SDK slider thumbs belong inside the track. A native range input inside each
  thumb receives focus, so themes use `:has(:focus-visible)`. Thumb identity stays
  stable as values change. Navigation Menu uses the SDK viewport and indicator.
- Accordion animations use `--accordion-panel-height`. The component also bridges
  that variable to tw-animate-css's height input for copied source. Collapsible
  examples use `--collapsible-panel-height`.
- Registry previews keep a layout box for Astro `client:visible`, with explicit
  width and alignment. This avoids the zero-width tracks found by the audit.

## Verification

`registry-theme.test.ts` verifies every upstream checksum, generated rule map,
and source-export styling. Collection tests cover replacement search results,
object selection, explicit Select children, and SDK agent actions. Browser theme
checks cover all eight styles in light/LTR and dark/RTL, slider geometry and stable
keyboard focus, InputGroup focus, Command parts, accordion keyframes, checked
controls, and selected tabs. The adapter's SSR/hydration and DOM-identity checks
remain part of `pnpm validate`.

These tests validate the SDK integration and the supported theme states. They do
not claim identical DOM or pixel equality with Radix or Base UI.

An SDK beta.6 limitation surfaced during the agent check: setting a composed,
object-valued Select by label emitted its string key. Agent-controlled examples
and tests use string choice values. Pointer and keyboard selection of objects
remain covered separately; the SDK callbacks expose their native behavior.

## Added component families

The registry now includes Attachment, Bubble, Message, Marker, Message Scroller, Code Block, Trace, Questionnaire, Calendar, Carousel, Drawer, Input OTP, Resizable, Scroll Area, and Sonner. Interactive parts use SDK primitives. The Date Picker guide composes Calendar and Popover. The deprecated Toast guide points to Sonner, which uses the SDK toast queue.

Calendar uses ISO values and focusable table cells. Carousel uses the SDK page/controller API. Drawer uses native snap points and movement. OTP uses one native field. Message Scroller uses native Scroll Area stick-to-end behavior and a controller. Questionnaire composes radio, checkbox, and input controls with explicit ordered steps and controlled answers. Each page documents the Solid API differences. Code Block accepts text or pre-highlighted JSX and keeps syntax highlighting optional. Native presentational parts use fixed semantic elements; interactive parts expose SDK render composition.

The component pages follow the pinned Radix catalog for titles, descriptions, sections, and preview names. Preview interactions use the Solid and UI SDK APIs. The Persian calendar and RTL sections are deferred. The upstream Chart uses React Recharts, and the Data Table guide uses TanStack Table v9, whose Solid adapter targets Solid 1.

The global stylesheet imports `shadcn/tailwind.css` once, as shadcn does. This supplies accordion animations, scroll fade and shimmer. The theme generator uses explicit presence selectors for SDK selection state. Components use the shared utilities through their Tailwind classes.
