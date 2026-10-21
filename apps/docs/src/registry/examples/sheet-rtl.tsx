// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Button } from "~/registry/ui/button"
// import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
// import { Input } from "~/registry/ui/input"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "~/registry/ui/sheet"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       open: "Open",
//       editProfile: "Edit profile",
//       description:
//         "Make changes to your profile here. Click save when you're done.",
//       name: "Name",
//       username: "Username",
//       save: "Save changes",
//       close: "Close",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       open: "فتح",
//       editProfile: "تعديل الملف الشخصي",
//       description:
//         "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.",
//       name: "الاسم",
//       username: "اسم المستخدم",
//       save: "حفظ التغييرات",
//       close: "إغلاق",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       open: "פתח",
//       editProfile: "עריכת פרופיל",
//       description: "בצע שינויים בפרופיל שלך כאן. לחץ שמור כשתסיים.",
//       name: "שם",
//       username: "שם משתמש",
//       save: "שמור שינויים",
//       close: "סגור",
//     },
//   },
// }

// export default function SheetRtl() {
//   const { dir, t, language } = useTranslation(translations, "ar")

//   return (
//     <Sheet>
//       <SheetTrigger as={Button<"button">} variant="outline">{t.open}</SheetTrigger>
//       <SheetContent
//         dir={dir}
//         side={dir === "rtl" ? "left" : "right"}
//         data-lang={dir === "rtl" ? language : undefined}
//       >
//         <SheetHeader>
//           <SheetTitle>{t.editProfile}</SheetTitle>
//           <SheetDescription>{t.description}</SheetDescription>
//         </SheetHeader>
//         <FieldGroup class="px-4">
//           <Field>
//             <FieldLabel for="sheet-rtl-name">{t.name}</FieldLabel>
//             <Input id="sheet-rtl-name" placeholder="Pedro Duarte" />
//           </Field>
//           <Field>
//             <FieldLabel for="sheet-rtl-username">{t.username}</FieldLabel>
//             <Input id="sheet-rtl-username" placeholder="peduarte" />
//           </Field>
//         </FieldGroup>
//         <SheetFooter>
//           <Button type="submit">{t.save}</Button>
//           <SheetClose as={Button<"button">} variant="outline">{t.close}</SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }
