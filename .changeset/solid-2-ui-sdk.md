---
"docs": major
---

Solid UI v2: the docs and registry move to Solid 2 and UI SDK.

- Components compose UI SDK primitives instead of Kobalte and Corvu, and examples use Solid 2 APIs.
- The docs are rebuilt with Astro, MDX and Tailwind CSS 4, with eight visual styles, light and dark mode, and a preset editor.
- The registry is published per style under `/r/styles/<style>/`. For a transition period, `/registry/` keeps serving the unchanged v1 components to `solidui-cli` 0.7.
- Icons are inlined as SVG from Lucide, so components and examples no longer depend on `lucide-solid`.
