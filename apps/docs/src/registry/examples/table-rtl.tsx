// import { For } from "solid-js"

// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~/registry/ui/table"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       caption: "A list of your recent invoices.",
//       invoice: "Invoice",
//       status: "Status",
//       method: "Method",
//       amount: "Amount",
//       paid: "Paid",
//       pending: "Pending",
//       unpaid: "Unpaid",
//       creditCard: "Credit Card",
//       paypal: "PayPal",
//       bankTransfer: "Bank Transfer",
//       total: "Total",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       caption: "قائمة بفواتيرك الأخيرة.",
//       invoice: "الفاتورة",
//       status: "الحالة",
//       method: "الطريقة",
//       amount: "المبلغ",
//       paid: "مدفوع",
//       pending: "قيد الانتظار",
//       unpaid: "غير مدفوع",
//       creditCard: "بطاقة ائتمانية",
//       paypal: "PayPal",
//       bankTransfer: "تحويل بنكي",
//       total: "المجموع",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       caption: "רשימת החשבוניות האחרונות שלך.",
//       invoice: "חשבונית",
//       status: "סטטוס",
//       method: "שיטה",
//       amount: "סכום",
//       paid: "שולם",
//       pending: "ממתין",
//       unpaid: "לא שולם",
//       creditCard: "כרטיס אשראי",
//       paypal: "PayPal",
//       bankTransfer: "העברה בנקאית",
//       total: 'סה"כ',
//     },
//   },
// }

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "paid" as const,
//     totalAmount: "$250.00",
//     paymentMethod: "creditCard" as const,
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "pending" as const,
//     totalAmount: "$150.00",
//     paymentMethod: "paypal" as const,
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "unpaid" as const,
//     totalAmount: "$350.00",
//     paymentMethod: "bankTransfer" as const,
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "paid" as const,
//     totalAmount: "$450.00",
//     paymentMethod: "creditCard" as const,
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "paid" as const,
//     totalAmount: "$550.00",
//     paymentMethod: "paypal" as const,
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "pending" as const,
//     totalAmount: "$200.00",
//     paymentMethod: "bankTransfer" as const,
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "unpaid" as const,
//     totalAmount: "$300.00",
//     paymentMethod: "creditCard" as const,
//   },
// ]

// export default function TableRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <Table dir={dir}>
//       <TableCaption>{t.caption}</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead class="w-[100px]">{t.invoice}</TableHead>
//           <TableHead>{t.status}</TableHead>
//           <TableHead>{t.method}</TableHead>
//           <TableHead class="text-right">{t.amount}</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         <For each={invoices}>
//           {(invoice) => (
//             <TableRow id={invoice.invoice}>
//               <TableCell class="font-medium">{invoice.invoice}</TableCell>
//               <TableCell>{t[invoice.paymentStatus]}</TableCell>
//               <TableCell>{t[invoice.paymentMethod]}</TableCell>
//               <TableCell class="text-right">{invoice.totalAmount}</TableCell>
//             </TableRow>
//           )}
//         </For>
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={3}>{t.total}</TableCell>
//           <TableCell class="text-right">$2,500.00</TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   )
// }
