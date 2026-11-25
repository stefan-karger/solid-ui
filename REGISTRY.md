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

| URL                               | Contents                                                  |
| --------------------------------- | --------------------------------------------------------- |
| `/r/index.json`                   | Array of installable items and their dependency metadata  |
| `/r/styles/index.json`            | Available styles as `{ name, label }`                     |
| `/r/styles/<style>/registry.json` | Catalog of every item for a style, without file contents  |
| `/r/styles/<style>/<name>.json`   | Item, including examples, with file contents for a style  |
| `/r/<name>.json`                  | Frozen v1 item for shadcn CLI installs (Solid 1, Kobalte) |
| `/registry/index.json`            | Frozen v1 catalog for `solidui-cli` 0.7                   |
| `/registry/ui/<name>.json`        | Frozen v1 component source for `solidui-cli` 0.7          |

The `/r/` layout follows shadcn/ui's own registry
([`f50887a`](https://github.com/shadcn-ui/ui/blob/f50887ae68d0fdcbfbe86b57be08af94a4c88a68/apps/v4/scripts/build-registry.mts)).
`<style>` is a visual style such as `nova`. Upstream prefixes it with the
primitive base, as in `base-nova`, but Solid UI has only the UI SDK base.
Registry dependencies use plain item names and resolve within this registry.
Item files use the Solid `~/` aliases.

The docs load style-specific source from `/r/styles/<style>/<name>.json` when
the reader changes the style.

The generated files live in `apps/docs/public/r` and
`apps/docs/public/registry`. Git ignores both directories. The prebuild
copies the v1 files from `apps/docs/registry-v1` into them byte for byte and
fails if a v1 file would replace a v2 file. Astro copies
them into `dist` when building the site. The registry includes dependencies
found in component imports and uses the workspace's tested npm versions.
Missing registry files and dependency cycles fail the prebuild.

Use `apps/docs` as the Vercel project root. Its build configuration runs
`pnpm build` and publishes `dist`, including the registry from the same
checkout as the docs. Include source files outside the project root so Vercel
can access the workspace lockfile and the pinned Astro packages.

The published `solidui-cli` 0.7.2 and shadcn CLI installs from v1 use the
production domain. Their projects run Solid 1, Kobalte and Tailwind CSS 3 or 4,
so the v1 endpoints keep serving the v1 registry from the `v1-final` tag
instead of v2 source. This gives existing users time to switch. The v2 `/r/` format also carries the shared stylesheet and its target path.
See the [Introduction](./apps/docs/src/content/docs/index.mdx#shared-styles)
for the manual installation steps.

Components, examples, and the docs site inline their icons as SVG markup
copied from Lucide. The published `lucide-solid` package still declares a
Solid 1 peer range, so nothing depends on it. Each inlined icon keeps Lucide's
24px stroke geometry and is decorative with `aria-hidden="true"` unless the
markup names it, as Spinner does. Examples that pass icons as values, such as
Command items, declare them as local components that accept SVG props. Each
file credits Lucide in its first line, and the project LICENSE carries the
full ISC notice.

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

Tests cover behavior Solid UI owns and SDK integration that can regress. Unit
tests cover the registry catalog and source export, the preset codec, the
adapter, and component logic such as filtered auto-highlight, Questionnaire
answers and shortcuts, and slider thumb identity. Browser tests hydrate every
docs preview and exercise the component flows. They also check SDK controls in
all eight styles in light/LTR and dark/RTL. The suite does not pin
one-off pixel geometry or palette values, and it does not retest SDK behavior
through thin wrappers.

These tests do not claim identical DOM or pixel equality with Radix or Base UI.

An SDK beta.6 limitation: setting a composed, object-valued Select by label
emitted its string key. Agent-controlled examples use string choice values.

## Added component families

The registry now includes Attachment, Bubble, Message, Marker, Message Scroller, Code Block, Trace, Questionnaire, Calendar, Carousel, Drawer, Input OTP, Resizable, Scroll Area, and Toast. Interactive parts use SDK primitives. The Date Picker guide composes Calendar and Popover. Toast uses the SDK toast queue.

Calendar uses ISO values and focusable table cells. Carousel uses the SDK page/controller API. Drawer uses native snap points and movement. OTP uses one native field. Message Scroller uses native Scroll Area stick-to-end behavior and a controller. Questionnaire composes radio, checkbox, and input controls with explicit ordered steps and controlled answers. Each page documents the Solid API differences. Code Block accepts text or pre-highlighted JSX and keeps syntax highlighting optional. Native presentational parts use fixed semantic elements; interactive parts expose SDK render composition.

The component pages follow the pinned Radix catalog for titles, descriptions, sections, and preview names. Preview interactions use the Solid and UI SDK APIs. The Persian calendar and RTL sections are deferred. The upstream Chart uses React Recharts, and the Data Table guide uses TanStack Table v9, whose Solid adapter targets Solid 1.
