// import { For } from "solid-js"
// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { ScrollArea } from "~/registry/ui/scroll-area"
// import { Separator } from "~/registry/ui/separator"

// const tags = Array.from({ length: 50 }).map(
//   (_, i, a) => `v1.2.0-beta.${a.length - i}`
// )

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       tags: "Tags",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       tags: "العلامات",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       tags: "תגיות",
//     },
//   },
// }

// export default function ScrollAreaRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <ScrollArea class="h-72 w-48 rounded-md border" dir={dir}>
//       <div class="p-4">
//         <h4 class="mb-4 text-sm leading-none font-medium">{t.tags}</h4>
//         <For each={tags}>
//           {(tag) => (
//             <>
//               <div class="text-sm">{tag}</div>
//               <Separator class="my-2" />
//             </>
//           )}
//         </For>
//       </div>
//     </ScrollArea>
//   )
// }
