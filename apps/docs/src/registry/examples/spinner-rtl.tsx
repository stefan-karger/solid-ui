// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import {
//   Item,
//   ItemContent,
//   ItemMedia,
//   ItemTitle,
// } from "~/registry/ui/item"
// import { Spinner } from "~/registry/ui/spinner"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       title: "Processing payment...",
//       amount: "$100.00",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       title: "جاري معالجة الدفع...",
//       amount: "١٠٠.٠٠ دولار",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       title: "מעבד תשלום...",
//       amount: "$100.00",
//     },
//   },
// }

// export function SpinnerRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <div
//       class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]"
//       dir={dir}
//     >
//       <Item variant="muted" dir={dir}>
//         <ItemMedia>
//           <Spinner />
//         </ItemMedia>
//         <ItemContent>
//           <ItemTitle class="line-clamp-1">{t.title}</ItemTitle>
//         </ItemContent>
//         <ItemContent class="flex-none justify-end">
//           <span class="text-sm tabular-nums">{t.amount}</span>
//         </ItemContent>
//       </Item>
//     </div>
//   )
// }
