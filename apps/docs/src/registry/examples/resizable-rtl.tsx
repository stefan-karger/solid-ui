// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "~/registry/ui/resizable"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       one: "One",
//       two: "Two",
//       three: "Three",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       one: "واحد",
//       two: "اثنان",
//       three: "ثلاثة",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       one: "אחד",
//       two: "שניים",
//       three: "שלושה",
//     },
//   },
// }

// export default function ResizableRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <ResizablePanelGroup
//       orientation="horizontal"
//       class="max-w-sm rounded-lg border"
//       dir={dir}
//     >
//       <ResizablePanel>
//         <div class="flex h-[200px] items-center justify-center p-6">
//           <span class="font-semibold">{t.one}</span>
//         </div>
//       </ResizablePanel>
//       <ResizableHandle withHandle />
//       <ResizablePanel>
//         <ResizablePanelGroup orientation="vertical" dir={dir}>
//           <ResizablePanel>
//             <div class="flex h-full items-center justify-center p-6">
//               <span class="font-semibold">{t.two}</span>
//             </div>
//           </ResizablePanel>
//           <ResizableHandle withHandle />
//           <ResizablePanel>
//             <div class="flex h-full items-center justify-center p-6">
//               <span class="font-semibold">{t.three}</span>
//             </div>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   )
// }
