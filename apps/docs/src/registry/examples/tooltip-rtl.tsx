// import { For, Show } from "solid-js"
// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Button } from "~/registry/ui/button"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "~/registry/ui/tooltip"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       content: "Add to library",
//       "top-start": "top-start",
//       top: "Top",
//       "top-end": "top-end",
//       "right-start": "right-start",
//       right: "Right",
//       "right-end": "right-end",
//       "bottom-start": "bottom-start",
//       bottom: "Bottom",
//       "bottom-end": "bottom-end",
//       "left-start": "left-start",
//       left: "Left",
//       "left-end": "left-end",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       content: "إضافة إلى المكتبة",
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
//       content: "הוסף לספרייה",
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

// const placements = [
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

// export default function TooltipRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <div class="flex flex-wrap justify-center gap-2">
//       <For each={placements}>
//         {(placement, index) => (
//           <>
//             <Tooltip id={placement} placement={placement}>
//               <TooltipTrigger as={Button<"button">} variant="outline">
//                 {t[placement]}
//               </TooltipTrigger>
//               <TooltipContent dir={dir}>
//                 {t.content}
//               </TooltipContent>
//             </Tooltip>
//             <Show when={(index() + 1) % 3 === 0}>
//               <div class="w-full" />
//             </Show>
//           </>
//         )}
//       </For>
//     </div>
//   )
// }
