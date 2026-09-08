# Astro-native registry previews and source code

Status: implementation plan  
Primary target: `apps/docs`  
Reference implementations: `docs/solid-ui-astro` and `docs/ui/apps/v4`  
Intended reader: an implementation agent working in this repository

## Objective

Implement the next MDX building blocks for the Astro documentation site:

- `ComponentPreview.astro`, which resolves a registry entry and renders its live Solid component.
- `ComponentSource.astro`, which resolves and prepares a registry file for display.
- `ComponentCode.astro`, which renders already-prepared and highlighted code.
- A very small Solid bridge that is responsible only for loading and hydrating the selected preview component.

The implementation must use `apps/docs/src/registry/index.ts` directly as the registry metadata source. It must not add a registry build script, a checked-in generated index, a `__REGISTRY__` global, or generated lazy-component shards.

The result should be Astro-first:

- Astro owns registry lookup, validation, source loading, source transformation, syntax highlighting, preview chrome, source disclosure, captions, and block iframe routing.
- Solid owns only the live preview subtree that actually needs Solid rendering and hydration.
- Vite owns compile-time module discovery and code splitting through `import.meta.glob`.

## Definition of done

The work is complete when all of the following are true:

- MDX can render `<ComponentPreview name="button-demo" />` without importing the component in the MDX file.
- MDX can render `<ComponentSource name="button" />` and optionally choose an exact registry file.
- The registry metadata is imported from `apps/docs/src/registry/index.ts`; there is no generated registry artifact or prebuild step.
- A normal inline preview is server-rendered into the static HTML and hydrates only when near the viewport.
- Interactive Kobalte-based examples still work after hydration and do not report hydration errors.
- Preview modules are emitted as lazy chunks rather than being eagerly bundled into every docs page.
- Source code is loaded through Vite, transformed into consumer-facing code, highlighted during the Astro build, and copied through the existing Astro copy-button infrastructure.
- Invalid registry metadata, unknown preview names, missing files, unsupported preview types, and missing preview modules fail the build with actionable errors.
- The implementation has focused automated tests and passes the repository validation commands.
- The temporary `TestButton` MDX proof is replaced by representative registry-backed preview/source examples and removed once unused.

## Scope

### In scope

- Infrastructure for registry-backed component previews and source code in `apps/docs`.
- A small initial set of representative examples needed to prove the architecture.
- Direct registry lookup, validation, source loading, source transformation, highlighting, and caching.
- Inline examples and complete component previews.
- A block preview route and iframe composition if at least one real block is included in the implementation milestone.
- MDX component registration and a showcase page proving static, interactive, and source-only cases.
- Unit/integration tests and build-output inspection.

### Out of scope

- Porting the entire example catalog from either reference tree in the same change.
- Reproducing every shadcn React option, provider, toolbar, tab, direction, icon-library, or style-switching behavior.
- A new client-side code viewer, client-side syntax highlighter, or client-side registry.
- A public registry JSON endpoint. The server-side source pipeline should be reusable by one later.
- Arbitrary filesystem reads supplied by MDX authors.
- Runtime compilation of TSX strings.
- A redesign of the custom Solid 2 Astro integration, unless the Phase 0 compatibility gate exposes a general renderer defect that must be fixed for correct SSR/hydration.
- Installing an end-to-end test framework solely for this feature. Use the existing test stack plus browser verification unless the repository adopts E2E tooling separately.

## Repository context

### Target application

`apps/docs` is an Astro 7 static application using Solid 2 RC through the workspace package `@solid-ui/astro-solid2`.

Relevant existing files:

- `apps/docs/astro.config.ts` configures MDX, the Solid integration, Tailwind, and rehype-pretty-code.
- `apps/docs/src/pages/docs/[...slug].astro` renders MDX with `mdxComponents`.
- `apps/docs/src/components/mdx-components.ts` currently maps standard Markdown elements only.
- `apps/docs/src/components/docs/code.astro` and `pre.astro` already establish code-block markup.
- `apps/docs/src/components/copy-button.astro` and `apps/docs/src/lib/copy-buttons.ts` already provide framework-free copy behavior initialized once by `DocsLayout`.
- `apps/docs/src/lib/highlight-code.ts` currently exposes only rehype transformers.
- `apps/docs/src/registry/index.ts` directly combines the `lib`, `ui`, and `hooks` metadata arrays.
- `apps/docs/src/registry/schema.ts` already includes `registry:example`, `registry:component`, and `registry:block` item types.
- `apps/docs/src/styles/global.css` imports all registry style sheets, while the root document currently uses `style-nova`.
- `packages/astro-solid2/src/server.ts` uses async `renderToStream`, which should be compatible with Solid `lazy` but must be proven before building the full feature.

At planning time, the target registry has UI, hook, and library entries, but no target examples or blocks. The initial implementation therefore needs a small `examples` registry to exercise the feature.

### Reference implementations

Use the references selectively and keep them read-only during this work.

`docs/solid-ui-astro` is useful for:

- Existing Solid example source.
- The basic Astro/Solid split.
- Source-style token expansion logic.
- Expected visual treatment for preview and code containers.

Do not copy these parts from it:

- Generated `registry/__index__.tsx`.
- Its registry generation script or generated lazy imports.
- `client:only="solid-js"` as the default rendering mode.
- Node `fs`, `path`, or `process.cwd()` source resolution.
- Duplicate short and full highlighted source trees.
- A Solid island used only to collapse code.
- Per-instance inline scripts.

`docs/ui/apps/v4` is useful for:

- Current shadcn preview/source UX and naming.
- Current registry item coverage and metadata conventions.
- Edge cases worth accounting for when more examples are ported.

Do not copy these parts from it:

- Next.js or React server-component assumptions.
- Generated `__components__` shards or component maps.
- React context/provider machinery.
- React-specific source cleanup, lint directives, `ts-morph` transforms, or icon-library substitution.
- Image-specific or Next-specific block fallbacks.

## Fixed architecture decisions

These decisions are part of the implementation contract. Do not replace them with a generated registry design without first revisiting this plan with the maintainer.

### 1. The registry index remains serializable metadata

`apps/docs/src/registry/index.ts` remains a plain metadata object. Add the examples array to it directly:

```ts
import { examples } from "~/registry/examples/_registry"
import { hooks } from "~/registry/hooks/_registry"
import { lib } from "~/registry/lib/_registry"
import type { Registry } from "~/registry/schema"
import { ui } from "~/registry/ui/_registry"

export const registry = {
  name: "SolidUI",
  homepage: "https://www.solid-ui.com",
  items: [...lib, ...ui, ...hooks, ...examples]
} satisfies Registry
```

Keep component functions, loader functions, Astro components, Shiki output, and loaded file contents out of this object. That allows the same metadata to remain useful to future registry endpoints and tooling.

### 2. Vite performs module discovery

There are two distinct file views:

- The Astro/server layer uses a lazy `?raw` glob to read registry source text.
- The Solid bridge uses a lazy component-module glob to import compiled preview modules.

`import.meta.glob` is a compile-time Vite transformation. It does create an internal map of import functions in the compiled bundle, but it does not require a custom script or checked-in generated file. That internal map is the desired replacement for `__index__.tsx` and `__REGISTRY__`.

All glob patterns must be literal strings in source. Do not construct a glob pattern dynamically.

### 3. A statically imported Solid bridge is mandatory

Astro hydration directives cannot be attached to an arbitrary dynamic component selected at runtime. `ComponentPreview.astro` must therefore statically import one Solid component, proposed as `RegistryPreview`, and pass it a serializable module identifier.

The bridge must not import `registry/index.ts`. Doing so would pull the registry metadata graph into the browser bundle. Astro resolves the name and passes only the canonical module ID, for example `/src/registry/examples/button-demo.tsx`.

### 4. Normal previews SSR and hydrate near the viewport

Use the statically imported bridge with:

```astro
<RegistryPreview moduleId={descriptor.moduleId} client:visible={{ rootMargin: "200px" }} />
```

This should produce static preview markup during the build while delaying client hydration until the preview is near the viewport. Do not use `client:only` globally.

`client:only="solid-js"` is permitted only for a documented registry entry that genuinely cannot be evaluated during SSR. Such an exception must be explicit metadata, validated, and covered by a browser test. It is not a workaround for an uninvestigated renderer problem.

### 5. Astro owns all non-component UI

Preview borders, padding, alignment, captions, source disclosure, file titles, highlighted code, copy controls, error reporting, and iframes are `.astro` components. The Solid bridge must not grow tabs, style pickers, copy behavior, registry search, or source state.

### 6. Source disclosure uses native HTML

Use a single `<details>/<summary>` disclosure for source code. This provides keyboard behavior and a no-JavaScript fallback without a Solid island.

Do not render a three-line highlighted teaser and a second full highlighted tree. The page should contain one highlighted source tree and one copy value. If a designed teaser/animation becomes important later, enhance the same DOM with one processed Astro script or a small custom element; do not introduce per-instance `is:inline` scripts.

### 7. The first milestone uses one active visual style

The docs root currently has `style-nova`. Nested style classes are not a safe style switch because both the root selector and nested selector can match, and Solid portals escape a local wrapper. Therefore:

- Preview rendering uses the active page style, currently `nova`.
- The source transformer accepts an internal `styleName` option and defaults to `nova` so it is reusable later.
- Do not expose per-preview style switching in the initial MDX API.
- Do not claim that another style is previewed correctly until style isolation is designed at the page or iframe boundary and portals are tested.

### 8. Registry mistakes are build errors

Documentation examples are authored at build time. Unknown names and bad file paths must throw actionable errors rather than silently rendering `null` or an in-page “not found” message. A runtime chunk-load failure may render an accessible fallback in the Solid bridge, but SSR/build-time failures must propagate.

## Data flow

### Inline preview flow

```text
MDX <ComponentPreview name="button-demo" />
  -> ComponentPreview.astro
     -> direct registry metadata lookup by name
     -> validate previewable type and resolve entry file
     -> load/transform/highlight source on the server
     -> render Astro preview shell and native source disclosure
     -> render static RegistryPreview import with moduleId string
        -> lazy Vite loader imports one compiled Solid example
        -> Solid SSR emits static markup
        -> client:visible hydrates that island near the viewport
```

### Source-only flow

```text
MDX <ComponentSource name="button" />
  -> ComponentSource.astro
     -> direct registry metadata lookup
     -> choose first file or exact `file` override
     -> lazy ?raw Vite loader reads source
     -> normalize and transform source for consumers
     -> Shiki highlights during build
     -> ComponentCode.astro renders one code tree and Astro CopyButton
```

### Block flow

```text
MDX <ComponentPreview name="dashboard-block" />
  -> registry type infers block behavior
  -> ComponentPreview.astro renders a lazy iframe
  -> /view/dashboard-block static route
     -> direct registry lookup
     -> minimal preview layout
     -> RegistryPreview client:load
        -> block module lazy import
```

The iframe document uses `client:load` because the iframe itself is already `loading="lazy"`; after its document loads, there is no benefit in delaying its internal hydration again.

## Registry conventions

### Registry entry shape

Create `apps/docs/src/registry/examples/_registry.ts` and type it as `Registry["items"]`, matching the existing registry groups.

A normal example should look like:

```ts
{
  name: "button-demo",
  type: "registry:example",
  registryDependencies: ["button"],
  files: [
    {
      path: "examples/button-demo.tsx",
      type: "registry:example"
    }
  ]
}
```

Conventions:

- Registry file paths are POSIX paths relative to `apps/docs/src/registry`.
- The first file is the default source file and preview entry.
- A preview entry must be `.tsx` or `.jsx` and default-export a Solid component that does not require props.
- UI, hook, and library items may be displayed with `ComponentSource`, but they may not be passed directly to `ComponentPreview`.
- Previewable types are `registry:example`, `registry:component`, and `registry:block`.
- Complete blocks belong under `registry/blocks`; ordinary examples belong under `registry/examples`.
- Names must be unique and route-safe: lowercase ASCII letters/numbers with internal hyphens, matching `^[a-z0-9]+(?:-[a-z0-9]+)*$`.

### Exceptional docs metadata

The existing `meta` field is an unknown record. Define and parse a narrow docs-specific schema in the registry server module rather than scattering casts:

```ts
const registryDocsMetaSchema = z
  .object({
    previewEntry: z.string().optional(),
    clientOnly: z.boolean().optional()
  })
  .strict()
```

Read this from `item.meta?.docs`. It is optional and should be absent for normal examples.

- `previewEntry` overrides the first file only for a multi-file preview whose entry is not first. It must exactly match a path listed in the same item.
- `clientOnly` is allowed only after a concrete SSR incompatibility is documented. It changes the Astro hydration branch but must not weaken the remaining validation.

Do not place import functions in metadata. Do not add a preview path function or component reference to the registry schema.

## Proposed file layout and responsibilities

### Registry content

Add:

- `apps/docs/src/registry/examples/_registry.ts`
- `apps/docs/src/registry/examples/button-demo.tsx`
- At least one interactive representative example, preferably an accordion, checkbox, popover, or dialog example.
- At least one portal-based example if the chosen Kobalte component uses a portal.

Update:

- `apps/docs/src/registry/index.ts` to import and include `examples` directly and to use `satisfies Registry`.

Port the smallest useful fixtures from `docs/solid-ui-astro/src/registry/examples`, then adapt imports and APIs to the target Solid 2/Kobalte versions. Do not bulk-copy its full example registry as infrastructure work.

### `apps/docs/src/lib/registry.server.ts`

This module is the Astro/build-side catalog. The `.server` suffix communicates its import boundary even though the static build is the enforcement mechanism.

It should own:

- Direct import of `registry` from `~/registry`.
- `registrySchema` parsing.
- Cross-item validation not represented by the schema.
- A map from unique item name to parsed item.
- A lazy raw-source glob.
- Path normalization and canonical module-ID construction.
- Registry item and file lookup.
- Preview descriptor resolution.
- Source loading and caches.

It must not be imported by `RegistryPreview.tsx` or any other client-hydrated component.

Suggested public API:

```ts
export type PreviewDescriptor = {
  name: string
  type: "registry:example" | "registry:component" | "registry:block"
  moduleId: string
  filePath: string
  clientOnly: boolean
}

export function getRegistryItem(name: string): RegistryItem
export function getRegistryFile(name: string, file?: string): RegistryItemFile
export function resolvePreview(name: string): PreviewDescriptor
export function getBlockPreviews(): PreviewDescriptor[]
export async function getRegistrySource(options: {
  name: string
  file?: string
  styleName?: string
}): Promise<PreparedRegistrySource>
```

Use a raw glob equivalent to:

```ts
const rawRegistryFiles = import.meta.glob<string>("/src/registry/**/*.{ts,tsx,js,jsx,css,json}", {
  query: "?raw",
  import: "default"
})
```

The canonical key for registry metadata path `examples/button-demo.tsx` is `/src/registry/examples/button-demo.tsx`.

Path validation must:

- Convert backslashes to forward slashes before checking.
- Reject absolute paths.
- Reject empty segments, `.` segments, and `..` segments.
- Reject a leading slash after normalization.
- Require an exact key in the raw glob.
- Include item name, declared file path, and expected canonical key in an error.

Do not use `node:fs`, `node:path`, `process.cwd()`, or an arbitrary `src` argument. The Vite raw glob makes source files part of the module graph, works in development/HMR, and is portable across working directories.

### `apps/docs/src/lib/registry-source.ts`

Keep pure source transformation in a separate module so it can be unit-tested without loading the whole catalog and later reused by a registry endpoint.

Suggested API:

```ts
export type PreparedRegistrySource = {
  code: string
  language: "tsx" | "ts" | "jsx" | "js" | "css" | "json" | "text"
  registryPath: string
  displayPath: string
}

export async function prepareRegistrySource(
  raw: string,
  options: { registryPath: string; styleName: string; styleCss?: string }
): Promise<PreparedRegistrySource>
```

Define one shared server-side constant for the current style, for example `ACTIVE_REGISTRY_STYLE = "nova"`. `registry.server.ts` should resolve `/src/registry/styles/style-${styleName}.css` through the same raw glob and pass that text into this pipeline. A requested style must not silently fall back to another style; fallback would make the displayed code disagree with the preview.

The pipeline order is:

1. Normalize CRLF/CR line endings to LF and trim trailing whitespace at the end of the document.
2. Rewrite known internal registry import aliases into consumer aliases.
3. For TS/JS sources, replace internal `cn-*` semantic style tokens with the selected style's `@apply` utility classes.
4. Verify no known internal import alias or `cn-*` token that should have been transformed remains.
5. Infer the highlighting language and consumer-facing display path.

Import rewrites for the initial implementation:

```text
~/registry/ui/     -> ~/components/ui/
~/registry/lib/    -> ~/lib/
~/registry/hooks/  -> ~/hooks/
```

Preserve `~/lib/utils` as-is. Do not perform broad string replacements outside the known prefixes, and do not add React-specific import, lint, or icon transformations.

Consumer display-path rules:

- Use a registry file's explicit `target` when present.
- `ui/foo.tsx` becomes `components/ui/foo.tsx`.
- `lib/foo.ts` becomes `lib/foo.ts`.
- `hooks/foo.ts` becomes `hooks/foo.ts`.
- Example and block paths can retain their registry-relative path unless the entry defines a target.

Do not strip or change `export default` merely because the references do. Keeping source semantics intact is safer and avoids producing invalid code for anonymous default exports.

#### Style map extraction

The target component source deliberately contains internal tokens such as `cn-button` while `style-nova.css` defines their utility payloads. Copy only the focused parser idea from the old Astro reference:

- Find `.cn-*` rule blocks.
- Match braces with a depth-aware scanner rather than assuming the next `}` always closes the rule.
- Collect one or more `@apply ...;` declarations from each block.
- Produce a `Map<string, string>` from semantic token to utility classes.
- Reject duplicate/conflicting definitions and malformed blocks with the style file name in the error.
- Cache the parsed map by style name.

When replacing tokens in TSX/JSX, only replace complete whitespace-delimited class tokens inside quoted string literals. Preserve the quote and surrounding whitespace, and correctly escape any occurrence of the surrounding quote in an injected utility such as `[class*='size-']`. If a string form cannot be transformed without changing JavaScript semantics, fail explicitly instead of emitting invalid source. Do not silently delete an unknown `cn-*` token; throw with the token and source path.

The initial target sources are already repository-formatted. Avoid adding `prettier`, `ts-morph`, or another parser to the runtime build path unless a real structural transform makes it necessary. The alias and token operations should preserve valid syntax without a general formatter.

Cache prepared-source promises by canonical source path plus style name. Caching promises, rather than only resolved values, also deduplicates concurrent requests during a static build.

### `apps/docs/src/lib/highlight-code.ts`

Extend the existing module rather than adding a second theme definition.

It should export:

- Shared light and dark theme constants used by both `astro.config.ts` and programmatic highlighting.
- The existing rehype transformer list.
- `highlightCode(code, language)`, returning trusted Shiki HTML.

Requirements:

- Use the same light/dark themes as MDX code blocks (`github-light-default` and `github-dark` unless deliberately changed everywhere).
- Reuse a singleton/cached Shiki highlighter rather than creating a highlighter for every preview.
- Emit the pre/code/line attributes and classes expected by `global.css`, including line wrappers if line-number styling relies on them.
- Keep raw code separate from highlighted HTML; copy behavior receives raw transformed code.
- Unknown extensions fall back to plain text instead of crashing, while supported registry extensions use their exact grammar.
- Only local, Shiki-produced HTML may reach `set:html`.

Update `apps/docs/astro.config.ts` to import the shared theme constants so MDX and registry source cannot drift.

### `apps/docs/src/components/registry-preview.tsx`

This is the only required Solid layer.

Use a lazy component glob with literal patterns, for example:

```ts
type PreviewModule = {
  default: Component<Record<string, never>>
}

const previewLoaders = import.meta.glob<PreviewModule>([
  "/src/registry/examples/**/*.{tsx,jsx}",
  "/src/registry/components/**/*.{tsx,jsx}",
  "/src/registry/blocks/**/*.{tsx,jsx}"
])
```

Do not add `{ eager: true }` in production.

The component should:

- Accept only `moduleId: string`.
- Resolve that exact key in `previewLoaders`.
- Turn the loader into a Solid `lazy` component.
- Cache lazy component wrappers at module scope by module ID so rerenders do not recreate them.
- Render through `Suspense` with a stable, accessible loading placeholder.
- Allow errors to propagate during SSR/build.
- Render a small `role="alert"` fallback for a client-side chunk failure without leaking stack details.

The exact lookup in this component is the final production check that the server-computed ID matches the component glob. The Astro/server catalog must not import the client bridge merely to inspect its map: the shared path/root/extension rules make the mapping deterministic, the bridge throws on a missing key during SSR, and the registry integrity test covers entries not currently embedded in MDX.

Illustrative shape, not code to paste without checking Solid 2 types:

```tsx
const componentCache = new Map<string, Component>()

function getPreview(moduleId: string) {
  const loader = previewLoaders[moduleId]
  if (!loader) throw new Error(`[registry-preview] No preview module for ${moduleId}`)

  let Preview = componentCache.get(moduleId)
  if (!Preview) {
    Preview = lazy(loader)
    componentCache.set(moduleId, Preview)
  }
  return Preview
}
```

No registry metadata, code display, layout classes, tabs, source loading, or style logic belongs in this file.

### `apps/docs/src/components/component-code.astro`

This is a presentational component. It accepts prepared values and performs no registry lookup.

Suggested props:

```ts
type Props = {
  code: string
  highlightedCode: string
  language: string
  title?: string
  class?: string
}
```

Responsibilities:

- Render a `figure` with the existing `data-rehype-pretty-code-figure` contract.
- Render an optional `figcaption` and `data-language`.
- Reuse `~/components/copy-button.astro`; do not create a Solid copy button.
- Pass raw transformed code to the copy button.
- Insert only Shiki output through `set:html`.
- Apply a sensible maximum code-block height while preserving keyboard-accessible scrolling.

A file-type icon is optional. Prefer no icon in the first implementation over adding a client component or a large icon mapping for decorative chrome.

### `apps/docs/src/components/component-source.astro`

This is the MDX-facing source resolver.

Suggested props:

```ts
type Props = {
  name: string
  file?: string
  title?: string
  language?: string
  class?: string
}
```

Behavior:

- `name` is required.
- `file`, when present, must exactly equal one of the selected registry item's declared file paths.
- Without `file`, select the first declared file.
- Resolve and prepare source through `registry.server.ts`.
- Use the inferred language unless explicitly overridden.
- Use the prepared consumer path as the default title.
- Highlight once and pass values into `ComponentCode.astro`.
- Throw if the item, file, source module, or transformation cannot be resolved.

Do not support an arbitrary `src` filesystem path in the first version. Do not add `collapsible` or `maxLines`; disclosure belongs to `ComponentPreview.astro`, and source should have one full representation.

### `apps/docs/src/components/component-preview.astro`

This is the main MDX-facing composition component.

Suggested public props:

```ts
type Props = Omit<HTMLAttributes<"div">, "align"> & {
  name: string
  align?: "start" | "center" | "end"
  previewClassName?: string
  hideCode?: boolean
  caption?: string
  file?: string
}
```

Notes:

- `file` chooses which declared file is displayed as source. It does not select an unrelated component to render.
- Do not expose `type`; infer block/component/example behavior from the registry item.
- Do not expose hydration directives as props.
- Do not add `chromeLessOnMobile`, `description`, `direction`, or per-preview `styleName` until there is a demonstrated target requirement.
- Use an explicit alignment-to-class map so Tailwind sees complete class names.

For an inline preview:

1. Resolve a validated preview descriptor in Astro frontmatter.
2. Resolve source unless `hideCode` is true.
3. Render the preview shell and a statically imported `RegistryPreview`.
4. Use `client:visible` for normal entries.
5. Use a separate explicit Astro branch with `client:only="solid-js"` only when parsed docs metadata says `clientOnly: true`.
6. Render source once inside `<details>`.
7. Use `<summary>` text such as “View code”; make the expanded/collapsed state understandable without relying only on an icon.
8. Wrap with `figure`/`figcaption` semantics when `caption` is present.

When resolving the source shown beneath a preview, pass the explicit `file` prop when supplied; otherwise pass the descriptor's resolved preview entry. This keeps the displayed source aligned with `meta.docs.previewEntry` rather than accidentally falling back to a different first file.

For a block:

- Infer the block from `registry:block`.
- Render a responsive, lazy iframe pointing at `/view/${encodeURIComponent(name)}`.
- Give the iframe a descriptive title.
- Give the container a stable aspect ratio or minimum height to avoid layout shift.
- Let the iframe viewport be genuinely responsive; do not copy the old hard-coded 1600-pixel inner canvas unless a specific block demonstrates that need.
- Do not sandbox the same-origin iframe by default without testing portals, forms, links, and clipboard behavior. If a sandbox is later added, enumerate only the capabilities the real blocks need.

### Block route and layout

Add these when block preview support is included:

- `apps/docs/src/pages/view/[name].astro`
- Optionally `apps/docs/src/layouts/preview-layout.astro` if `DocsLayout` is not appropriately minimal.

The route must:

- Export `getStaticPaths()` derived directly from `getBlockPreviews()`.
- Generate paths only for validated `registry:block` entries.
- Resolve the descriptor again or pass only serializable validated props.
- Render no documentation navigation or source chrome.
- Load global/theme styles once.
- Render `RegistryPreview` with `client:load` for SSR-safe blocks.
- Handle an explicit `clientOnly` block through a separate branch.
- Set a useful document title and retain normal viewport metadata.

Do not create a catch-all runtime route. The application output is static and registry names are known at build time.

### MDX registration

Update `apps/docs/src/components/mdx-components.ts` to include:

```ts
;(ComponentPreview, ComponentSource)
```

Keep `ComponentCode` internal; MDX authors should provide registry identity, not pre-highlighted HTML.

Expected authoring examples:

```mdx
<ComponentPreview name="button-demo" />

<ComponentPreview name="checkbox-table" align="start" previewClassName="p-4 md:p-8" />

<ComponentPreview name="chart-demo" hideCode />

<ComponentSource name="button" title="components/ui/button.tsx" />

<ComponentSource name="multi-file-example" file="examples/multi-file-helper.ts" />
```

Update `apps/docs/src/content/docs/mdx-components.mdx` to exercise the real components. Once it no longer imports `TestButton`, remove `apps/docs/src/components/test-button.tsx`.

## Validation rules

Run registry validation when `registry.server.ts` initializes so both development and static builds fail early.

Validate all of the following:

- `registrySchema.parse(registry)` succeeds.
- Every item name is unique.
- Every item name is route-safe.
- Every declared file path is normalized, relative, traversal-free, and present in the raw module map.
- Every item used as a preview has at least one file.
- A `previewEntry` override exactly matches one file on its item.
- Preview entry extensions are `.tsx` or `.jsx`.
- Preview entries are under the allowed `examples`, `components`, or `blocks` roots.
- The registry type and directory agree; for example, a block preview entry is under `blocks`.
- UI, hook, library, theme, style, and font entries are rejected by `resolvePreview` with a message instructing authors to create an example.
- `clientOnly`, if set, is boolean and belongs to a previewable item.
- Every production preview module ID exists in the Solid bridge's glob map before rendering.
- Normal SSR-safe preview modules default-export a component.
- All `cn-*` tokens found while preparing a source file have a mapping in the selected style.
- Source transformation leaves no known internal registry alias behind.

Error examples should identify the author action:

```text
[registry] ComponentPreview "button" has type "registry:ui" and cannot be previewed directly. Add a registry:example entry such as "button-demo".

[registry] Item "button-demo" declares "examples/button-demo.tsx", but Vite did not discover "/src/registry/examples/button-demo.tsx".

[registry] Source "ui/button.tsx" uses style token "cn-button-size-wide", but style "nova" does not define it.
```

Avoid dumping all known registry names or stack internals into user-facing browser fallbacks.

## Phase-by-phase implementation

Each phase has a completion gate. Do not proceed past Phase 0 by silently changing the SSR strategy.

### Phase 0: Establish the baseline and prove the risky boundary

- [ ] Read repository-local `AGENTS.md` files, if present, before editing.
- [ ] Inspect `git status` and preserve all unrelated user changes.
- [ ] Run and record focused baseline checks for `apps/docs`; do not fix unrelated failures without authorization.
- [ ] Add the minimum examples registry with one static example and one interactive/portal example.
- [ ] Add a temporary minimal lazy Solid bridge using the intended production `import.meta.glob` shape.
- [ ] Render both examples from one Astro test/showcase page with `client:visible`.
- [ ] Build the static app and inspect generated HTML for actual example markup before any browser JavaScript runs.
- [ ] In a browser, test interaction after hydration and check the console for hydration mismatches.
- [ ] Confirm an offscreen preview does not immediately request its preview chunk.

Gate:

- Static example HTML is present in the built page.
- Interactive and portal behavior works after hydration.
- No hydration mismatch or duplicate-ID warnings occur.
- The selected preview code is emitted lazily.

If the gate fails:

1. Determine whether the failure is in Solid `lazy`, Astro's directive handling, or `@solid-ui/astro-solid2` async streaming.
2. Add the smallest renderer-level regression test if the custom integration is defective.
3. Prefer a general fix in `packages/astro-solid2` when the defect is genuinely in that integration.
4. If a dependency/RC limitation cannot safely be fixed, document the exact limitation and isolate `client:only` to affected entries. Do not switch every preview to client-only without maintainer approval.

### Phase 1: Build the direct registry catalog

- [ ] Add `examples/_registry.ts` and include it directly in `registry/index.ts`.
- [ ] Add `satisfies Registry` to the registry object.
- [ ] Implement `registry.server.ts` with schema parsing, name map, raw glob, path helpers, docs metadata parsing, and caches.
- [ ] Implement actionable duplicate/name/path/type validation.
- [ ] Implement `resolvePreview`, `getRegistryFile`, and `getBlockPreviews`.
- [ ] Keep all metadata serializable and all client imports out of this module.
- [ ] Add unit tests for pure path and validation behavior.

Gate:

- Adding a correctly registered source file requires only editing its source and `_registry.ts` entry.
- No generator needs to run.
- Adding, changing, and removing an example produces correct dev-server HMR/full reload behavior.
- Missing files and duplicate names fail deterministically.

### Phase 2: Build the source and code pipeline

- [ ] Implement pure source normalization, import rewriting, display-path mapping, and language inference.
- [ ] Implement strict style-map extraction and semantic-token replacement.
- [ ] Add source/style promise caches.
- [ ] Extend `highlight-code.ts` with shared themes and programmatic highlighting.
- [ ] Point `astro.config.ts` at the shared theme constants.
- [ ] Implement `ComponentCode.astro` using the existing Astro copy button.
- [ ] Implement `ComponentSource.astro` with `name` and exact `file` lookup only.
- [ ] Add unit tests for every transform and representative TSX/CSS/JSON inputs.

Gate:

- `ComponentSource` renders consumer-facing code for both an example and a UI primitive.
- Copied text exactly equals the transformed visible source.
- Highlighted markup matches current light/dark code styling.
- No new client island is created for source display or copy behavior.
- Unknown names, files, styles, and semantic tokens fail with focused messages.

### Phase 3: Compose the Astro preview component

- [ ] Finalize `registry-preview.tsx` as the thin loader/hydration bridge.
- [ ] Add module-scope lazy-component caching.
- [ ] Implement SSR error propagation and client chunk-load fallback.
- [ ] Implement `ComponentPreview.astro` shell, alignment, caption, and `hideCode` behavior.
- [ ] Add one native source disclosure using `details`/`summary`.
- [ ] Branch explicitly between `client:visible` and the exceptional `client:only` mode.
- [ ] Ensure preview loading/fallback content has stable dimensions and accessible text.
- [ ] Verify multiple previews on one MDX page have isolated copy buttons and no duplicate initialization.

Gate:

- JavaScript-disabled output still shows normal preview markup, source disclosure, and readable highlighted source.
- JavaScript-enabled output hydrates only the Solid preview.
- Details and copy behavior work without a Solid source island.
- Multiple instances do not duplicate source trees or event handlers.

### Phase 4: Add block previews

- [ ] Add or port one representative block entry if block support is part of the current delivery.
- [ ] Add the static `/view/[name]` route derived from the direct registry.
- [ ] Add a minimal preview layout only if needed.
- [ ] Infer iframe behavior from `registry:block`; do not require an MDX `type` prop.
- [ ] Use iframe `loading="lazy"` and internal `client:load` hydration.
- [ ] Test desktop and narrow iframe sizes, portals, focus, links, and scrolling.

Gate:

- Only registered block routes are emitted.
- Direct navigation to a block route works.
- The docs page does not load the iframe until it nears the viewport.
- The iframe has a meaningful title and no avoidable layout shift.

If there is no real block ready to validate, defer this phase as a clearly tracked follow-up rather than shipping an untested generic route. The inline preview/source definition of done can be completed independently.

### Phase 5: Wire MDX and remove the proof component

- [ ] Register `ComponentPreview` and `ComponentSource` in `mdx-components.ts`.
- [ ] Replace the `TestButton` showcase with registry-backed examples.
- [ ] Cover static, interactive, `hideCode`, source-only, alignment, caption, and exact-file cases where fixtures exist.
- [ ] Remove `test-button.tsx` only after confirming it has no remaining references.
- [ ] Check the page at mobile, tablet, and desktop widths.

Gate:

- MDX authors need only a registry name for the common case.
- The showcase is useful documentation rather than a hidden implementation test.
- No MDX file imports a generated registry map or manually selected preview component.

### Phase 6: Harden and verify

- [ ] Add a registry integrity test covering every current registry item.
- [ ] Add a test-only module check for default exports of SSR-safe previews. A test may eagerly import modules; production code may not.
- [ ] Test `clientOnly` entries separately without evaluating them in a Node SSR test.
- [ ] Verify production output contains separate async preview chunks.
- [ ] Verify the bridge bundle does not contain the full registry metadata, raw sources, or Shiki.
- [ ] Verify no generated file or prebuild command is required from a fresh checkout.
- [ ] Run all repository validation commands.
- [ ] Perform final browser checks with console and network inspection.

Gate:

- `pnpm validate` passes, or any pre-existing unrelated failure is documented precisely.
- The built showcase has SSR preview markup.
- No console, hydration, accessibility, or missing-chunk errors remain.
- The implementation satisfies every applicable item in the acceptance matrix below.

### Phase 7: Port the broader example catalog separately

- [ ] Port examples component-by-component after the infrastructure is stable.
- [ ] Prefer the Solid reference for behavior and the React reference for current coverage/UX.
- [ ] Adapt each example to target Solid 2 and current Kobalte APIs rather than bulk-copying blindly.
- [ ] Register each example directly in the appropriate `_registry.ts` file.
- [ ] Keep each batch reviewable and test interactions for that component family.

This phase should normally be one or more follow-up changes, not part of the infrastructure change.

## Test plan

### Unit tests

Add focused `*.test.ts` files beside the relevant library modules or in the repository's established test location.

Registry/path cases:

- Valid POSIX registry paths produce the expected `/src/registry/...` module ID.
- Windows separators normalize before validation.
- Absolute, empty, dot-segment, and parent-traversal paths are rejected.
- Duplicate item names are rejected.
- Invalid route names are rejected.
- Unknown item names and exact-file misses produce actionable errors.
- First-file fallback and `previewEntry` override resolve correctly.
- Non-previewable registry types are rejected for preview but remain available for source.

Source-transform cases:

- CRLF and CR normalize to LF.
- All three internal registry alias prefixes rewrite correctly with both quote styles.
- Unrelated strings and already-consumer-facing aliases remain unchanged.
- Style CSS with nested blocks is scanned correctly.
- Multiple `@apply` declarations combine in source order.
- Duplicate or malformed semantic rules fail.
- Complete `cn-*` tokens are replaced without matching substrings.
- Unknown semantic tokens fail rather than disappearing.
- `target` wins for display path; otherwise category mappings apply.
- TSX, TS, JSX, JS, CSS, JSON, and unknown extensions infer correctly.
- Default exports remain intact.

Highlight/code cases:

- Programmatic highlighting uses the shared theme pair.
- Output includes the markup hooks expected by the existing CSS.
- Plain-text fallback safely highlights an unknown extension.
- Raw copy text is not HTML-escaped or replaced by Shiki output.

### Registry integrity test

For every current registry item:

- Parse against the schema.
- Confirm unique and route-safe identity.
- Confirm every declared file exists in the raw glob.
- Confirm preview descriptors point into the production preview glob.
- Import every non-`clientOnly` preview module in the test environment and assert that `default` is callable/renderable.

Keep eager module importing confined to the test. It must not leak into production code.

### Build assertions

After `pnpm --filter docs build`:

- Inspect the generated showcase HTML and verify visible preview content exists before hydration.
- Verify the page references shared Solid/Astro runtime assets plus async preview chunks.
- Verify unrelated preview implementations are not inlined into the showcase entry chunk.
- Search output for accidental registry metadata/source inclusion in the bridge bundle if bundle naming permits a stable check.
- Verify no `__index__`, `__REGISTRY__`, or generated component-map artifact appears in source or build scripts.

Avoid brittle assertions against hashed filenames. Assert behavior or recognizable module boundaries instead.

### Browser acceptance matrix

| Case                  | JavaScript off / before hydration | JavaScript on                                | Expected loading                                       |
| --------------------- | --------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Static button example | Markup visible                    | Same visual result                           | Chunk requested only near viewport                     |
| Interactive control   | Initial markup visible            | State and events work                        | Hydrates with no mismatch                              |
| Portal overlay        | Trigger visible                   | Overlay opens, focuses, and closes correctly | No duplicate portal content                            |
| Closed source details | Summary visible; opens natively   | Same behavior                                | No Solid island                                        |
| Copy button           | Button visible                    | Copies exact transformed code                | Uses existing global initializer                       |
| Multiple previews     | All SSR shells are stable         | Interactions remain isolated                 | Shared runtime, selected chunks only                   |
| `hideCode` preview    | Preview visible                   | Preview interactive                          | No source HTML/highlight work for that instance        |
| Block iframe          | Stable placeholder/container      | Block interactive in iframe                  | Outer iframe lazy; inner island eager on document load |
| Invalid name fixture  | Build fails                       | Not applicable                               | Actionable error                                       |

Also check:

- Browser console has no hydration, duplicate-ID, unhandled promise, or accessibility warnings.
- Keyboard focus can reach preview controls, source summary, code scroller, and copy button.
- Loading and error states do not rely on color alone.
- Captions use `figcaption` semantics.
- Iframes have titles.
- Narrow viewports do not create page-level horizontal scrolling.

## Performance requirements

- The production preview glob must remain lazy.
- Do not import registry metadata from the client bridge.
- Do not serialize raw source or a registry item object into the Solid island; pass only the module ID.
- Skip source loading, transformation, and highlighting entirely when `hideCode` is true.
- Cache registry maps, raw source promises, parsed style maps, transformed source promises, and the Shiki highlighter at module scope.
- Render one source tree per preview.
- Reuse the existing global copy-button initializer rather than hydrating one component per copy button.
- Use `client:visible` for normal inline previews.
- Use a lazy iframe plus `client:load` inside block documents.

The Vite glob map itself will grow as examples grow. Measure its gzip size after the broader catalog is ported. If it becomes material, split the bridge by registry family with multiple statically imported thin bridges and literal globs. Do not add sharding before measurement.

Closed `<details>` content is still present in HTML. This is an intentional first tradeoff: it preserves static output and avoids a source-fetching client. Record built page size as examples accumulate. If source dominates real page payloads, a future Astro static source endpoint plus progressively enhanced disclosure can be considered using the same source pipeline.

## Accessibility requirements

- Preview loading content should use stable layout and an appropriate `aria-busy`/status treatment without repeatedly announcing during SSR streaming.
- A client-side preview-load failure should use `role="alert"` and concise recovery guidance.
- `<summary>` must contain visible text, not only a chevron.
- Copy controls retain the existing accessible label and live status.
- Code remains selectable and horizontally keyboard-scrollable.
- Captions use `figure`/`figcaption` only when they describe the whole preview.
- Iframes use a title derived from the registry item's title or name.
- Interactive examples remain responsible for their own component-level accessibility; the bridge must not wrap them in semantics that interfere with Kobalte.
- Directionality is not added as superficial preview chrome. Add it later through a tested Solid direction provider/page context if RTL examples require it.

## Security and trust boundaries

- Registry names and paths are build-authored local data, but still validate them before constructing module IDs or URLs.
- Never accept arbitrary MDX filesystem paths in `ComponentSource`.
- Never interpolate an unchecked runtime string into a dynamic `import()` call.
- `set:html` receives only Shiki output produced from local registry source.
- Astro must escape titles, captions, raw copy values, and error text normally.
- Do not execute registry source as text; previews load compiled modules selected from the fixed Vite glob.
- Do not expose build paths, stack traces, or module maps in browser error messages.

## Failure handling

### Build-time failures

Throw immediately for authoring/configuration failures. Prefix messages consistently with `[registry]`, `[registry-source]`, or `[registry-preview]`. Include the registry name and relevant declared path.

Do not catch and log transformation/highlighting failures while returning partially transformed code. A docs build that displays incorrect copyable code is a failed build.

### Runtime failures

The only expected runtime failure class is failure to download or evaluate a lazy client chunk after a successful build. The Solid bridge may show a compact accessible fallback. It should not expose the exception text to end users. Log enough detail to the development console to diagnose the module ID.

SSR failures must not be swallowed by that fallback. Confirm this behavior with a deliberately broken fixture during development, then remove the fixture.

## Explicit anti-patterns

Do not implement any of the following:

- `scripts/build-registry.ts` or an equivalent prebuild generator.
- A checked-in `registry/__index__.tsx`, `__components__`, or `__REGISTRY__` artifact.
- Loader functions embedded in `registry/index.ts`.
- A production `{ eager: true }` component glob.
- `import(registryPathFromProps)` with an unconstrained runtime string.
- Importing the full registry into the Solid bridge.
- Blanket `client:only` previews.
- A Solid/React island for preview tabs, code disclosure, or copy state.
- Two separately highlighted copies of the same source for teaser/full states.
- One `is:inline` script per preview.
- Direct `fs` reads based on `process.cwd()`.
- An arbitrary `src` prop exposed to MDX.
- Silent `null` rendering for missing items or files.
- Silent deletion of unmapped `cn-*` tokens.
- React-specific source transforms that the Solid registry does not need.
- Per-preview style switching under the current globally styled root.
- Bulk example migration before the infrastructure gate is proven.

## Suggested implementation sequence by file

This is the recommended edit order for an agent:

1. Add two or three representative files under `apps/docs/src/registry/examples` and their `_registry.ts` metadata.
2. Update `apps/docs/src/registry/index.ts`.
3. Add `apps/docs/src/lib/registry-source.ts` and tests for its pure functions.
4. Add `apps/docs/src/lib/registry.server.ts` and registry/path tests.
5. Extend `apps/docs/src/lib/highlight-code.ts` and update `apps/docs/astro.config.ts`.
6. Add `apps/docs/src/components/component-code.astro`.
7. Add `apps/docs/src/components/component-source.astro`.
8. Add `apps/docs/src/components/registry-preview.tsx` and complete the Phase 0 SSR/hydration gate.
9. Add `apps/docs/src/components/component-preview.astro`.
10. Register the MDX components and update the showcase MDX.
11. Remove `test-button.tsx` after verifying it is unused.
12. Add the block route/layout only with a real validated block fixture.
13. Run focused tests, the full validation pipeline, production build inspection, and browser acceptance checks.

The bridge proof is listed after source infrastructure for a clean final dependency graph, but an implementation agent may perform the small Phase 0 spike earlier on a temporary branch/worktree. The final submitted state should follow the responsibilities above and contain no throwaway generated artifacts.

## Verification commands

Use the repository-pinned Node and pnpm versions from the root `package.json`.

Focused iteration:

```sh
pnpm --filter docs check
pnpm --filter docs build
pnpm test
```

Final validation:

```sh
pnpm format:check
pnpm lint
pnpm check
pnpm test
pnpm build
```

The root shortcut is:

```sh
pnpm validate
```

If a command fails before the implementation begins, record the exact baseline failure and distinguish it from regressions. Do not weaken checks, add broad ignores, or modify unrelated files to make the final command green.

## Handoff expectations for the implementation agent

- Treat `apps/docs` as the write target and both `docs/...` trees as references unless a maintainer explicitly expands scope.
- Inspect the current worktree before every broad edit and preserve unrelated user changes.
- Implement in the phase order above and report the Phase 0 SSR/hydration result before adopting an exception.
- Prefer small, typed helpers with pure tests over copied framework abstractions.
- Keep all Vite glob patterns literal and narrow.
- Keep the Solid bridge visibly thin in code review.
- Do not leave the implementation halfway between generated and direct registries.
- Do not claim completion without static HTML inspection and a real interactive browser check.
- Report any deferred block support or client-only exception explicitly; do not hide it behind a permissive fallback.

## Future extensions enabled by this design

These are not part of the initial implementation, but the architecture should not block them:

- A static `/r/[name].json.ts` registry endpoint can import the same direct catalog and prepared-source pipeline during the Astro build.
- Page-level style variants can reuse cached style maps once style isolation and portal behavior have a real design.
- RTL previews can add a tested Solid direction provider without moving Astro chrome into Solid.
- Multi-file source navigation can be Astro-rendered when a real block needs it; until then, the exact `file` prop is sufficient.
- Large catalogs can shard the preview glob by family after bundle measurement.
- Very source-heavy pages can progressively fetch prebuilt source fragments without changing registry resolution.

## Relevant platform documentation

- Astro dynamic tags and hydration restriction: <https://docs.astro.build/en/reference/astro-syntax/#dynamic-tags>
- Astro `client:visible`: <https://docs.astro.build/en/reference/directives-reference/#clientvisible>
- Astro/Vite glob imports: <https://docs.astro.build/en/guides/imports/#importmetaglob>
- Vite glob import behavior: <https://vite.dev/guide/features.html#glob-import>
- Solid `lazy`: <https://docs.solidjs.com/reference/component-apis/lazy>
- Astro processed script behavior: <https://docs.astro.build/en/guides/client-side-scripts/#script-processing>

## Final acceptance checklist

- [ ] Direct `registry/index.ts` import is the metadata source of truth.
- [ ] No registry generation script or generated component map exists.
- [ ] Production component glob is lazy and constrained to preview roots.
- [ ] Raw source glob is lazy and constrained to registry source extensions.
- [ ] Client bridge receives only a canonical module ID.
- [ ] Normal inline previews SSR and use `client:visible`.
- [ ] Client-only behavior, if any, is an explicit documented exception.
- [ ] Astro owns preview chrome and code disclosure.
- [ ] Source is transformed for consumer aliases and active style utilities.
- [ ] One highlighted source tree and one raw copy value exist per preview.
- [ ] Existing Astro copy infrastructure is reused.
- [ ] Invalid registry authoring fails the build.
- [ ] Representative static, interactive, portal, source-only, and hidden-source cases pass.
- [ ] Block behavior is either validated end-to-end or explicitly deferred.
- [ ] Static build output and lazy chunks have been inspected.
- [ ] The browser console is clean.
- [ ] `pnpm validate` passes or only documented pre-existing failures remain.
