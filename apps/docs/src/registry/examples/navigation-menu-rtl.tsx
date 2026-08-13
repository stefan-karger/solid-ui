// import {
//   CircleAlertIcon,
//   CircleCheckIcon,
//   CircleDashedIcon,
// } from "lucide-solid"

// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "~/registry/ui/navigation-menu"
// import { For, splitProps, type ComponentProps } from "solid-js"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       gettingStarted: "Getting started",
//       introduction: "Introduction",
//       introductionDesc: "Re-usable components built with Tailwind CSS.",
//       installation: "Installation",
//       installationDesc: "How to install dependencies and structure your app.",
//       typography: "Typography",
//       typographyDesc: "Styles for headings, paragraphs, lists...etc",
//       components: "Components",
//       alertDialog: "Alert Dialog",
//       alertDialogDesc:
//         "A modal dialog that interrupts the user with important content and expects a response.",
//       hoverCard: "Hover Card",
//       hoverCardDesc:
//         "For sighted users to preview content available behind a link.",
//       progress: "Progress",
//       progressDesc:
//         "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//       scrollArea: "Scroll-area",
//       scrollAreaDesc: "Visually or semantically separates content.",
//       tabs: "Tabs",
//       tabsDesc:
//         "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//       tooltip: "Tooltip",
//       tooltipDesc:
//         "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//       withIcon: "With Icon",
//       backlog: "Backlog",
//       toDo: "To Do",
//       done: "Done",
//       docs: "Docs",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       gettingStarted: "البدء",
//       introduction: "مقدمة",
//       introductionDesc:
//         "مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.",
//       installation: "التثبيت",
//       installationDesc: "كيفية تثبيت التبعيات وتنظيم تطبيقك.",
//       typography: "الطباعة",
//       typographyDesc: "أنماط للعناوين والفقرات والقوائم...إلخ",
//       components: "المكونات",
//       alertDialog: "حوار التنبيه",
//       alertDialogDesc: "حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.",
//       hoverCard: "بطاقة التحويم",
//       hoverCardDesc: "للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.",
//       progress: "التقدم",
//       progressDesc:
//         "يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.",
//       scrollArea: "منطقة التمرير",
//       scrollAreaDesc: "يفصل المحتوى بصريًا أو دلاليًا.",
//       tabs: "التبويبات",
//       tabsDesc:
//         "مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.",
//       tooltip: "تلميح",
//       tooltipDesc:
//         "نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.",
//       withIcon: "مع أيقونة",
//       backlog: "قائمة الانتظار",
//       toDo: "المهام",
//       done: "منجز",
//       docs: "الوثائق",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       gettingStarted: "התחלה",
//       introduction: "הקדמה",
//       introductionDesc: "רכיבים לשימוש חוזר שנבנו עם Tailwind CSS.",
//       installation: "התקנה",
//       installationDesc: "כיצד להתקין תלויות ולבנות את האפליקציה שלך.",
//       typography: "טיפוגרפיה",
//       typographyDesc: "סגנונות לכותרות, פסקאות, רשימות...וכו'",
//       components: "רכיבים",
//       alertDialog: "דיאלוג התראה",
//       alertDialogDesc: "דיאלוג מודאלי שמפריע למשתמש עם תוכן חשוב ומצפה לתגובה.",
//       hoverCard: "כרטיס ריחוף",
//       hoverCardDesc:
//         "למשתמשים רואים כדי להציג תצוגה מקדימה של תוכן זמין מאחורי קישור.",
//       progress: "התקדמות",
//       progressDesc:
//         "מציג אינדיקטור המציג את התקדמות ההשלמה של משימה, בדרך כלל מוצג כסרגל התקדמות.",
//       scrollArea: "אזור גלילה",
//       scrollAreaDesc: "מפריד תוכן חזותית או סמנטית.",
//       tabs: "כרטיסיות",
//       tabsDesc:
//         "קבוצה של חלקי תוכן מרובדים—המכונים לוחות כרטיסיות—המוצגים אחד בכל פעם.",
//       tooltip: "טולטיפ",
//       tooltipDesc:
//         "חלון קופץ המציג מידע הקשור לאלמנט כאשר האלמנט מקבל מיקוד מקלדת או כאשר העכבר מרחף מעליו.",
//       withIcon: "עם אייקון",
//       backlog: "רשימת המתנה",
//       toDo: "לעשות",
//       done: "הושלם",
//       docs: "תיעוד",
//     },
//   },
// }

// const components = [
//   {
//     titleKey: "alertDialog" as const,
//     descriptionKey: "alertDialogDesc" as const,
//     href: "/docs/primitives/alert-dialog",
//   },
//   {
//     titleKey: "hoverCard" as const,
//     descriptionKey: "hoverCardDesc" as const,
//     href: "/docs/primitives/hover-card",
//   },
//   {
//     titleKey: "progress" as const,
//     descriptionKey: "progressDesc" as const,
//     href: "/docs/primitives/progress",
//   },
//   {
//     titleKey: "scrollArea" as const,
//     descriptionKey: "scrollAreaDesc" as const,
//     href: "/docs/primitives/scroll-area",
//   },
//   {
//     titleKey: "tabs" as const,
//     descriptionKey: "tabsDesc" as const,
//     href: "/docs/primitives/tabs",
//   },
//   {
//     titleKey: "tooltip" as const,
//     descriptionKey: "tooltipDesc" as const,
//     href: "/docs/primitives/tooltip",
//   },
// ] as const

// export default function NavigationMenuRtl() {
//   const { dir, t, language } = useTranslation(translations, "ar")

//   return (
//     <NavigationMenu dir={dir} placement={dir === "rtl" ? "bottom-end" : "bottom-start"}>
//       <NavigationMenuItem>
//         <NavigationMenuTrigger>{t.gettingStarted}</NavigationMenuTrigger>
//         <NavigationMenuContent
//           dir={dir}
//           data-lang={dir === "rtl" ? language : undefined}
//         >
//           <ul class="w-96">
//             <ListItem href="/docs" title={t.introduction}>
//               {t.introductionDesc}
//             </ListItem>
//             <ListItem href="/docs/installation" title={t.installation}>
//               {t.installationDesc}
//             </ListItem>
//             <ListItem href="/docs/primitives/typography" title={t.typography}>
//               {t.typographyDesc}
//             </ListItem>
//           </ul>
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//       <NavigationMenuItem class="hidden md:flex">
//         <NavigationMenuTrigger>{t.components}</NavigationMenuTrigger>
//         <NavigationMenuContent
//           dir={dir}
//           data-lang={dir === "rtl" ? language : undefined}
//         >
//           <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//             <For each={components}>
//               {(component) => (
//                 <ListItem
//                   id={component.titleKey}
//                   title={t[component.titleKey]}
//                   href={component.href}
//                 >
//                   {t[component.descriptionKey]}
//                 </ListItem>
//               )}
//             </For>
//           </ul>
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <NavigationMenuTrigger>{t.withIcon}</NavigationMenuTrigger>
//         <NavigationMenuContent
//           dir={dir}
//           data-lang={dir === "rtl" ? language : undefined}
//         >
//           <ul class="grid w-[200px]">
//             <li>
//               <NavigationMenuLink as={"a"} href="#" class="flex-row items-center gap-2"><CircleAlertIcon />{t.backlog}</NavigationMenuLink>
//               <NavigationMenuLink as={"a"} href="#" class="flex-row items-center gap-2"><CircleDashedIcon />{t.toDo}</NavigationMenuLink>
//               <NavigationMenuLink as={"a"} href="#" class="flex-row items-center gap-2"><CircleCheckIcon />{t.done}</NavigationMenuLink>
//             </li>
//           </ul>
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <NavigationMenuLink class={navigationMenuTriggerStyle()} data-lang={dir === "rtl" ? language : undefined} as={"a"} href="/docs">{t.docs}</NavigationMenuLink>
//       </NavigationMenuItem>
//     </NavigationMenu>
//   )
// }

// function ListItem(rawProps: ComponentProps<"li"> & { href: string }) {
//   const [local, others] = splitProps(rawProps, ["href", "title", "children"])
//   return (
//     <li {...others}>
//       <NavigationMenuLink as={"a"} href={local.href}><div class="flex flex-col gap-1 text-sm">
//           <div class="leading-none font-medium">{local.title}</div>
//           <div class="line-clamp-2 text-muted-foreground">{local.children}</div>
//         </div>
//       </NavigationMenuLink>
//     </li>
//   )
// }
