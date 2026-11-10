// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import {
//   Progress,
//   ProgressLabel,
//   ProgressValue,
// } from "~/registry/ui/progress"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       label: "Upload progress",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       label: "تقدم الرفع",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       label: "התקדמות העלאה",
//     },
//   },
// }

// function toArabicNumerals(num: number): string {
//   const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
//   return num
//     .toString()
//     .split("")
//     .map((digit) => arabicNumerals[parseInt(digit, 10)])
//     .join("")
// }

// export default function ProgressRtl() {
//   const { dir, t, language } = useTranslation(translations, "ar")

//   const formatNumber = (num: number): string => {
//     if (language === "ar") {
//       return toArabicNumerals(num)
//     }
//     return num.toString()
//   }

//   return (
//     <Progress value={56} class="w-full max-w-sm" dir={dir} getValueLabel={(v) => `${formatNumber(v.value)}%`}>
//       <ProgressLabel>{t.label}</ProgressLabel>
//       <ProgressValue />
//     </Progress>
//   )
// }
