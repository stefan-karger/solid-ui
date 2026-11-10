// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Kbd, KbdGroup } from "~/registry/ui/kbd"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {},
//   },
//   ar: {
//     dir: "rtl",
//     values: {},
//   },
//   he: {
//     dir: "rtl",
//     values: {},
//   },
// }

// export default function KbdRtl() {
//   const { dir } = useTranslation(translations, "ar")

//   return (
//     <div class="flex flex-col items-center gap-4" dir={dir}>
//       <KbdGroup>
//         <Kbd>⌘</Kbd>
//         <Kbd>⇧</Kbd>
//         <Kbd>⌥</Kbd>
//         <Kbd>⌃</Kbd>
//       </KbdGroup>
//       <KbdGroup>
//         <Kbd>Ctrl</Kbd>
//         <span>+</span>
//         <Kbd>B</Kbd>
//       </KbdGroup>
//     </div>
//   )
// }
