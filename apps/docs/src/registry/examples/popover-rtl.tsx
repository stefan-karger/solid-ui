// import { For, Show } from "solid-js"

// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Button } from "~/registry/ui/button"
// import {
//   Popover,
//   PopoverContent,
//   PopoverDescription,
//   PopoverHeader,
//   PopoverTitle,
//   PopoverTrigger,
// } from "~/registry/ui/popover"

// // TODO: update arabic and hebrew translations
// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       title: "Dimensions",
//       description: "Set the dimensions for the layer.",
//       "top-start": "Top Start",
//       top: "Top",
//       "top-end": "Top End",
//       "right-start": "Right Start",
//       right: "Right",
//       "right-end": "Right End",
//       "bottom-start": "Bottom Start",
//       bottom: "Bottom",
//       "bottom-end": "Bottom End",
//       "left-start": "Left Start",
//       left: "Left",
//       "left-end": "Left End",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       title: "الأبعاد",
//       description: "تعيين الأبعاد للطبقة.",
//       "top-start": "",
//       top: "أعلى",
//       "top-end": "",
//       "right-start": "",
//       right: "يمين",
//       "right-end": "",
//       "bottom-start": "",
//       bottom: "أسفل",
//       "bottom-end": "",
//       "left-start": "",
//       left: "يسار",
//       "left-end": "",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       title: "מימדים",
//       description: "הגדר את המימדים לשכבה.",
//       "top-start": "",
//       top: "למעלה",
//       "top-end": "",
//       "right-start": "",
//       right: "ימין",
//       "right-end": "",
//       "bottom-start": "",
//       bottom: "למטה",
//       "bottom-end": "",
//       "left-start": "",
//       left: "שמאל",
//       "left-end": "",
//     },
//   },
// }

// const popoverPlacement = [
//   "top-start",
//   "top",
//   "top-end",
//   "right-start",
//   "right",
//   "right-end",
//   "bottom-start",
//   "bottom",
//   "bottom-end",
//   "left-start",
//   "left",
//   "left-end",
// ] as const

// export default function PopoverRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <div class="grid gap-4">
//       <div class="flex flex-wrap justify-center gap-2">
//         <For each={popoverPlacement}>
//           {(placement, index) => (
//             <>
//               <Popover placement={placement}>
//                 <PopoverTrigger as={Button<"button">} variant="outline">{t[placement]}</PopoverTrigger>
//                 <PopoverContent dir={dir}>
//                   <PopoverHeader>
//                     <PopoverTitle>{t.title}</PopoverTitle>
//                     <PopoverDescription>{t.description}</PopoverDescription>
//                   </PopoverHeader>
//                 </PopoverContent>
//               </Popover>
//               <Show when={(index()+1) % 3 == 0}>
//                 <div class="w-full" />
//               </Show>
//             </>
//           )}
//         </For>
//       </div>
//     </div>
//   )
// }
