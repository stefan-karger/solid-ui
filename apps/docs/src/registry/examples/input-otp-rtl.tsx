// import {
//   useTranslation,
//   type Translations,
// } from "~/registry/language-selector"
// import { Field, FieldLabel } from "~/registry/ui/field"
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "~/registry/ui/input-otp"

// const translations: Translations = {
//   en: {
//     dir: "ltr",
//     values: {
//       verificationCode: "Verification code",
//     },
//   },
//   ar: {
//     dir: "rtl",
//     values: {
//       verificationCode: "رمز التحقق",
//     },
//   },
//   he: {
//     dir: "rtl",
//     values: {
//       verificationCode: "קוד אימות",
//     },
//   },
// }

// export default function InputOTPRtl() {
//   const { dir, t } = useTranslation(translations, "ar")

//   return (
//     <Field class="mx-auto max-w-xs">
//       <FieldLabel for="input-otp-rtl">{t.verificationCode}</FieldLabel>
//       <InputOTP
//         maxLength={6}
//         dir={dir}
//         id="input-otp-rtl"
//       >
//         <InputOTPGroup>
//           <InputOTPSlot index={0} />
//           <InputOTPSlot index={1} />
//           <InputOTPSlot index={2} />
//           <InputOTPSlot index={3} />
//           <InputOTPSlot index={4} />
//           <InputOTPSlot index={5} />
//         </InputOTPGroup>
//       </InputOTP>
//     </Field>
//   )
// }
