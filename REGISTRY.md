# Registry

Solid UI's components live in `apps/docs/src/registry`. They compose named UI
SDK parts directly and import each part as `SdkXxx`, following
[spec-01's convention](https://github.com/shuding/spec-01/tree/b8f91b6646d9280d9de8e0f5b2c6453cb4f237cb/registry/hardware/ui).
There are no SDK namespace imports, `Primitive.Root` maps, fake portals, or
collection compatibility helpers. The pins in `apps/docs/package.json` set the
Solid and UI SDK versions the registry is built and tested with.

The structural reference is shadcn/ui
[`968d8cb`](https://github.com/shadcn-ui/ui/tree/968d8cb9dc42ae5d52e8fd356cf84596ec832a26/apps/v4/registry/bases/base/ui),
primarily its Base UI implementation. Delta Bar is a project extension.

## Themes and shared styles

Edit the eight themes directly in `apps/docs/src/registry/styles`. The docs load
these stylesheets, and the source exporter expands their semantic classes into
Tailwind utilities for the selected style. `apps/docs/src/registry/lib/style-utilities.css`
holds the shared state variants, accordion keyframes, scroll fades, and shimmer.

Inside theme files, write parent-relative variants before `dark:`, as in
`group-data-checked/questionnaire-choice:dark:bg-primary`. Under the nested
`.style-*` scope, the reverse order compiles to a selector that never matches,
and `registry-theme.test.ts` rejects it.

Menu surfaces carry the upstream markers `cn-menu-target` and
`cn-menu-translucent`. The registry keeps them; `solidui-cli` resolves them from
the project's `menuColor` (inverted adds `dark`, translucent adds the blur
utilities), and the docs show the default, opaque menus.

## Shared package and CLI

`packages/registry` (`@solid-ui/registry`, private) holds the code the docs and
the CLI share: the preset codec and named presets, the theme and `solid-ui.css`
generation, the menu and icon transforms, the `components.json` schema, and
the supported versions. The docs import it as TypeScript source; tsup bundles it
into `solidui-cli`.

`packages/cli` is `solidui-cli` 1.x with two commands. `init` checks the
project, writes `components.json`, `solid-ui.css` and `lib/utils.ts`, wires the
import alias into `tsconfig.json` and `vite.config`, and installs the shared
packages. `add` resolves registry dependencies, rewrites imports to the
project's aliases, resolves the menu markers and icon placeholders and installs
the packages each item lists. The CLI reference is shadcn/ui
[`055aa6b`](https://github.com/shadcn-ui/ui/tree/055aa6b7837b1808456a24beb4c97a677864aa82/packages/shadcn).
User-facing behavior is documented on `/docs/cli`; the version rules are in
[AGENTS.md](./AGENTS.md#solidui-cli).

`components.json` follows shadcn/ui's file without the React and Tailwind 3
options: `style`, `preset`, `tailwind.css`, `iconLibrary`, `menuColor`,
`menuAccent`, and `aliases`. Its JSON schema is generated to `/schema.json`.

## Publishing the registry

`pnpm --filter docs build` generates the registry in its `prebuild` step from
the same catalog and source exporter the docs use; `pnpm --filter docs prebuild`
refreshes only the registry. The output in `apps/docs/public/r` and
`public/schema.json` is ignored by Git and copied into `dist`.

| URL                               | Contents                                                 |
| --------------------------------- | -------------------------------------------------------- |
| `/r/index.json`                   | Array of installable items and their dependency metadata |
| `/r/styles/index.json`            | Available styles as `{ name, label }`                    |
| `/r/styles/<style>/registry.json` | Catalog of every item for a style, without file contents |
| `/r/styles/<style>/<name>.json`   | Item, including examples, with file contents for a style |
| `/schema.json`                    | JSON schema of `components.json`                         |
| `/registry/index.json`            | Frozen v1 catalog for `solidui-cli` 0.7                  |
| `/registry/ui/<name>.json`        | Frozen v1 component source for `solidui-cli` 0.7         |

The `/r/` layout follows shadcn/ui's
([`f50887a`](https://github.com/shadcn-ui/ui/blob/f50887ae68d0fdcbfbe86b57be08af94a4c88a68/apps/v4/scripts/build-registry.mts)),
with plain style names such as `nova` since Solid UI has only the UI SDK base.
Item files import through `~/` aliases and list registry dependencies by item
name. Package dependencies come from the component imports with the ranges in
`@solid-ui/registry/versions`; `solid-js`, `@solidjs/web`, and `tailwindcss`
belong to the project and are never listed. Missing files and dependency
cycles fail the prebuild.

Use `apps/docs` as the Vercel project root. It runs `pnpm build` and publishes
`dist`, so the registry always matches the docs from the same checkout.

`apps/docs/public/registry` holds the v1 registry from the `v1-final` tag as
committed static files for `solidui-cli` 0.7.2 (Solid 1, Kobalte, Tailwind CSS
3). No script touches it; delete it when the transition period ends.

## Icons

Components and examples name each icon for every icon library, as shadcn/ui
[`0e5b2e6`](https://github.com/shadcn-ui/ui/blob/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4/apps/v4/app/%28app%29/%28create%29/components/icon-placeholder.tsx)
does: `<IconPlaceholder lucide="ChevronDownIcon" class="size-4" />`, imported
from `~/registry/icons/icon-placeholder`. Lucide (`@lucide/solid`, its Solid 2
package) is the only library so far; `@solid-ui/registry/icons` lists the
libraries in the order presets encode them, which is shadcn/ui's.

The registry serves the placeholders. `solidui-cli add` replaces each one with
the component of the `iconLibrary` in `components.json`, keeping the other
props, and swaps the placeholder import for one default import per icon, such
as `@lucide/solid/icons/chevron-down`. Solid's Vite plugin keeps Solid packages
out of dependency prebundling, so a named import from `@lucide/solid` would
load all of its 2,400 modules on every page in development. Use Lucide's
canonical names: deprecated aliases such as `BoldIcon` and names whose digits
don't map back to the file, such as `ArrowDown01Icon`, have no module, and
`scripts/build-icons.ts` fails on them. Items don't list
the icon library; `init` and `add` install the project's. The docs show Lucide:
their source views resolve the placeholders with the same transform, and the
previews render `src/registry/icons/icon-placeholder.tsx`, which loads only the
icons `scripts/build-icons.ts` collects into `__lucide__.ts` in the `prebuild`
step. Placeholders take string icon names and no children. Lucide hides an
icon from assistive technology unless it gets an `aria-*` prop or `role`.

The LICENSE carries the shadcn/ui attribution; THIRD_PARTY_NOTICES.md carries
Lucide's ISC notice for the icon paths the docs site still inlines.

## Component API

The API changes from solidui-cli 0.7 (Kobalte and Corvu) are listed in the
[migration guide](./apps/docs/src/content/docs/migration.mdx#api-changes).

Object values remain supported through `itemToValue` and `itemToLabel`.
Presentation-only parts use Solid's `dynamic()` for element overrides;
interactive SDK parts keep the SDK `render` callback. Button defaults to a
native button with `type="button"` and sets its variant, size, and slot on the
element chosen by `as`.

## Intentional SDK differences

- Switches keep each upstream shape, including round Lyra and square Sera.
  Thumbs inherit custom track corners and move in the reading direction.
- The SDK Select has no scroll-arrow parts, so there is no
  `SelectScrollUpButton` or `SelectScrollDownButton`; long lists scroll
  natively.
- The SDK owns slots, roles, references, and state attributes. Styled
  compositions that expose their own slot set it on the rendered element.
  InputGroup uses `data-ui="input-group-control"` as a separate styling hook.
- Popups render in place in the browser top layer. Content supplies placement
  options and `data-ending-style` the exit styling; there are no portal or
  positioner wrappers.
- Slider thumbs belong inside the track, and a native range input inside each
  thumb receives focus, so themes use `:has(:focus-visible)`.
- Accordion animations use `--accordion-panel-height`, Collapsible examples
  `--collapsible-panel-height`.
- Calendar uses ISO values and focusable table cells, Carousel the SDK
  page/controller API, Drawer native snap points, Input OTP one native field,
  Message Scroller native Scroll Area stick-to-end, and Toast the SDK queue.
- Chart (Recharts) and Data Table (TanStack Table, whose Solid adapter targets
  Solid 1) are not ported yet. The Persian calendar and RTL sections are
  deferred.

## Verification

Unit tests cover the registry catalog and source export, the preset codec, the
shared package, the CLI, the adapter, and component logic such as filtered
auto-highlight, Questionnaire answers, and slider thumb identity. Browser tests
hydrate every docs preview, exercise the component flows, and check SDK
controls in all eight styles in light/LTR and dark/RTL. They don't pin one-off
pixel geometry or retest SDK behavior through thin wrappers, and they don't
claim DOM or pixel equality with Radix or Base UI.
