// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "~/registry/ui/toggle-group"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       list: "List",
//       grid: "Grid",
//       cards: "Cards",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       list: "قائمة",
//       grid: "شبكة",
//       cards: "بطاقات",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       list: "רשימה",
//       grid: "רשת",
//       cards: "כרטיסים",
//     },
//   },
// }

// export default function ToggleGroupRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <ToggleGroup variant="outline" defaultValue={["list"]} dir={dir} multiple>
//       <ToggleGroupItem value="list" aria-label={t.list}>
//         {t.list}
//       </ToggleGroupItem>
//       <ToggleGroupItem value="grid" aria-label={t.grid}>
//         {t.grid}
//       </ToggleGroupItem>
//       <ToggleGroupItem value="cards" aria-label={t.cards}>
//         {t.cards}
//       </ToggleGroupItem>
//     </ToggleGroup>
//   )
// }
