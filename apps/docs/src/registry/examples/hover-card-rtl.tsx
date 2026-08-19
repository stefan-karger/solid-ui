// import { For, Show } from "solid-js"

// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Button } from "~/registry/ui/button"
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "~/registry/ui/hover-card"

// // TODO: add missing translations
// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       trigger: "Wireless Headphones",
//       name: "Wireless Headphones",
//       price: "$99.99",
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
//   // TODO: add missing arabic translations
//   ar: {
//     dir: "rtl",
//     values: {
//       trigger: "سماعات لاسلكية",
//       name: "سماعات لاسلكية",
//       price: "٩٩.٩٩ $",
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
//   // TODO: add missin hebrew translations
//   he: {
//     dir: "rtl",
//     values: {
//       trigger: "אוזניות אלחוטיות",
//       name: "אוזניות אלחוטיות",
//       price: "99.99 $",
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

// const HOVER_CARD_PLACEMENTS = [
//   "left-start",
//   "left",
//   "left-end",
//   "top-start",
//   "top",
//   "top-end",
//   "right-start",
//   "right",
//   "right-end",
//   "bottom-start",
//   "bottom",
//   "bottom-end",
// ] as const

// export default function HoverCardRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <div class="flex flex-wrap justify-center gap-2">
//       <For each={HOVER_CARD_PLACEMENTS}>
//         {(placement, index) => {
//           const current = () => index() + 1
//           return (
//             <>
//               <HoverCard id={placement} placement={placement} openDelay={10} closeDelay={100}>
//                 <HoverCardTrigger as={Button<"button">} variant="outline">{t[placement]}</HoverCardTrigger>
//                 <HoverCardContent class="flex w-64 flex-col gap-1" dir={dir}>
//                   <div class="font-semibold">{t.name}</div>
//                   <div class="text-sm text-muted-foreground">{t.price}</div>
//                 </HoverCardContent>
//               </HoverCard>
//               <Show when={current() % 3 === 0}>
//                 <div class="shrink-0 w-full" />
//               </Show>
//             </>
//           )
//         }}
//       </For>
//     </div>
//   )
// }
