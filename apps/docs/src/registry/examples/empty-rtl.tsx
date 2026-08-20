// import { ArrowUpRightIcon, FolderCodeIcon } from "lucide-solid"

// import { type Translations, useTranslation } from "~/registry/language-selector"
// import { Button } from "~/registry/ui/button"
// import {
//   Empty,
//   EmptyContent,
//   EmptyDescription,
//   EmptyHeader,
//   EmptyMedia,
//   EmptyTitle
// } from "~/registry/ui/empty"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       title: "No Projects Yet",
//       description:
//         "You haven't created any projects yet. Get started by creating your first project.",
//       createProject: "Create Project",
//       importProject: "Import Project",
//       learnMore: "Learn More"
//     }
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       title: "لا توجد مشاريع بعد",
//       description: "لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.",
//       createProject: "إنشاء مشروع",
//       importProject: "استيراد مشروع",
//       learnMore: "تعرف على المزيد"
//     }
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       title: "אין פרויקטים עדיין",
//       description: "עדיין לא יצרת פרויקטים. התחל על ידי יצירת הפרויקט הראשון שלך.",
//       createProject: "צור פרויקט",
//       importProject: "ייבא פרויקט",
//       learnMore: "למד עוד"
//     }
//   }
// }

// export default function EmptyRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <Empty dir={dir}>
//       <EmptyHeader>
//         <EmptyMedia variant="icon">
//           <FolderCodeIcon />
//         </EmptyMedia>
//         <EmptyTitle>{t.title}</EmptyTitle>
//         <EmptyDescription>{t.description}</EmptyDescription>
//       </EmptyHeader>
//       <EmptyContent class="flex-row justify-center gap-2">
//         <Button>{t.createProject}</Button>
//         <Button variant="outline">{t.importProject}</Button>
//       </EmptyContent>
//       <Button as={"a"} class="text-muted-foreground" href="#" size="sm" variant="link">
//         {t.learnMore} <ArrowUpRightIcon class="rtl:rotate-270" data-icon="inline-end" />
//       </Button>
//     </Empty>
//   )
// }
