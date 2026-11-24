# Registry themes and SDK composition

The registry uses UI SDK `0.1.0-beta.10` with Solid
`2.0.1`. Components compose named SDK parts directly and import each part
as `SdkXxx`, following [spec-01's convention](https://github.com/shuding/spec-01/tree/b8f91b6646d9280d9de8e0f5b2c6453cb4f237cb/registry/hardware/ui).
There are no SDK namespace imports, `Primitive.Root` maps, fake portals, or
collection compatibility helpers in the registry.

The structural reference is shadcn/ui
[`968d8cb9dc42ae5d52e8fd356cf84596ec832a26`](https://github.com/shadcn-ui/ui/tree/968d8cb9dc42ae5d52e8fd356cf84596ec832a26/apps/v4/registry/bases/base/ui),
primarily its Base UI implementation. The audit also compared the Radix and
new-york-v4 implementations. Delta Bar remains a project extension.

## Themes and shared styles

Edit the eight themes directly in `apps/docs/src/registry/styles`. The docs load
these stylesheets. The registry source exporter expands their semantic classes
into Tailwind utilities for the selected style. Delta Bar rules live alongside
the other components in each theme.

`apps/docs/src/registry/lib/style-utilities.css` defines shared component state
variants, accordion keyframes, scroll fades, and shimmer. The docs and manual
installation use the same file. The project LICENSE preserves the attribution
for code and styles adapted from shadcn/ui.

Inside theme files, write parent-relative variants before `dark:`, as in
`group-data-checked/questionnaire-choice:dark:bg-primary` or
`in-data-[slot=tooltip-content]:dark:bg-background/10`. Under the nested
`.style-*` scope, the reverse order compiles to a selector that never matches.
`registry-theme.test.ts` rejects the reverse order.

Menu surfaces carry `cn-menu-target` and `cn-menu-translucent` as upstream does.
They only take effect in the preset preview, where the preset's menu color
inverts or blurs every menu. The exporter strips both tokens, matching shadcn's
default `menuColor`, so installed menus are opaque.

## Publishing the Registry

Run `pnpm --filter docs build` to build the site. The `prebuild` script uses
the same catalog and source exporter as the docs and generates the registry
before Astro starts. Run `pnpm --filter docs prebuild` to refresh only the registry.

| URL                             | Contents                                                    |
| ------------------------------- | ----------------------------------------------------------- |
| `/r/index.json`                 | Array of installable items and their dependency metadata    |
| `/r/styles/<style>/<name>.json` | Installable item with file contents for a selected style    |
| `/registry/index.json`          | Catalog for the published Solid UI CLI                      |
| `/registry/ui/<name>.json`      | Default-style TypeScript source in the published CLI format |

The generated files live in `apps/docs/public/r` and
`apps/docs/public/registry`. Git ignores both directories. Astro copies
them into `dist` when building the site. The registry includes dependencies
found in component imports and uses the workspace's tested npm versions.
Missing registry files and dependency cycles fail the prebuild.

Use `apps/docs` as the Vercel project root. Its build configuration runs
`pnpm build` and publishes `dist`, including the registry from the same
checkout as the docs. Include source files outside the project root so Vercel
can access the workspace lockfile and the pinned Astro packages.

The published `solidui-cli` 0.7.2 uses the production domain and its older
initialization flow. Its `add` command passes an empty argument to the package
manager. With pnpm 12, dependency installation stops at that argument.
The compatibility endpoints expose its JSON format for existing clients.
The `/r/` format also carries the shared stylesheet and its target path.
See the [Introduction](./apps/docs/src/content/docs/index.mdx#shared-styles)
for the manual installation steps.

Items that import Lucide use the Solid 2 setup documented in
[Compatibility patches](./patches/README.md#lucide-solid1410). The published
`lucide-solid` package still declares a Solid 1 peer range.

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
- The UI SDK Select has no scroll-arrow parts, so there is no `SelectScrollUpButton` or
  `SelectScrollDownButton`; long lists scroll natively. Groups carry upstream's padding,
  and the list pads only items rendered outside a group.

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
- Accordion animations use `--accordion-panel-height`. The shared stylesheet defines
  those keyframes for the docs and copied components. Collapsible
  examples use `--collapsible-panel-height`.
- Registry previews keep a layout box for Astro `client:visible`, with explicit
  width and alignment. This avoids the zero-width tracks found by the audit.

## Verification

`registry-theme.test.ts` verifies SDK selectors and source-export styling across
the eight themes. Collection tests cover replacement search results,
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

The registry now includes Attachment, Bubble, Message, Marker, Message Scroller, Code Block, Trace, Questionnaire, Calendar, Carousel, Drawer, Input OTP, Resizable, Scroll Area, and Toast. Interactive parts use SDK primitives. The Date Picker guide composes Calendar and Popover. Toast uses the SDK toast queue.

Calendar uses ISO values and focusable table cells. Carousel uses the SDK page/controller API. Drawer uses native snap points and movement. OTP uses one native field. Message Scroller uses native Scroll Area stick-to-end behavior and a controller. Questionnaire composes radio, checkbox, and input controls with explicit ordered steps and controlled answers. Each page documents the Solid API differences. Code Block accepts text or pre-highlighted JSX and keeps syntax highlighting optional. Native presentational parts use fixed semantic elements; interactive parts expose SDK render composition.

The component pages follow the pinned Radix catalog for titles, descriptions, sections, and preview names. Preview interactions use the Solid and UI SDK APIs. The Persian calendar and RTL sections are deferred. The upstream Chart uses React Recharts, and the Data Table guide uses TanStack Table v9, whose Solid adapter targets Solid 1.
