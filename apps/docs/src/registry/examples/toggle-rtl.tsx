// import { Toggle } from "~/registry/ui/toggle"
// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/components/language-selector"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       label: "Bookmark",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       label: "إشارة مرجعية",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       label: "סימנייה",
//     },
//   },
// }
// export default function ToggleRtl() {
//   const { dir, t } = useTranslation(translations, "ar")
//   return (
//     <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" dir={dir}>
//       <BookmarkIcon class="group-aria-pressed/toggle:fill-foreground" />
//       {t.label}
//     </Toggle>
//   )
// }