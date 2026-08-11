// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Separator } from "~/registry/ui/separator"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       title: "solid-ui",
//       subtitle: "The Foundation for your Design System",
//       description:
//         "A set of beautifully designed components that you can customize, extend, and build on.",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       title: "solid-ui",
//       subtitle: "الأساس لنظام التصميم الخاص بك",
//       description:
//         "مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       title: "solid-ui",
//       subtitle: "הבסיס למערכת העיצוב שלך",
//       description:
//         "סט של רכיבים מעוצבים בצורה יפה שאתה יכול להתאים אישית, להרחיב ולבנות עליהם.",
//     },
//   },
// }

// export default function SeparatorRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <div class="flex max-w-sm flex-col gap-4 text-sm" dir={dir}>
//       <div class="flex flex-col gap-1.5">
//         <div class="leading-none font-medium">{t.title}</div>
//         <div class="text-muted-foreground">{t.subtitle}</div>
//       </div>
//       <Separator />
//       <div>{t.description}</div>
//     </div>
//   )
// }
