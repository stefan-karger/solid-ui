import { createMemo, createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { DirectionProvider } from "~/registry/ui/direction"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs"

import { Separator } from "../ui/separator"

type Language = "en" | "ar"

const content = {
  en: {
    dir: "ltr",
    locale: "en",
    values: {
      title: "Login to your account",
      description: "Enter your email below to login to your account",
      signUp: "Sign Up",
      email: "Email",
      emailPlaceholder: "m@example.com",
      password: "Password",
      forgotPassword: "Forgot your password?",
      login: "Login",
      loginWithGoogle: "Login with Google"
    }
  },
  ar: {
    dir: "rtl",
    locale: "ar",
    values: {
      title: "تسجيل الدخول إلى حسابك",
      description: "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك",
      signUp: "إنشاء حساب",
      email: "البريد الإلكتروني",
      emailPlaceholder: "m@example.com",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      login: "تسجيل الدخول",
      loginWithGoogle: "تسجيل الدخول باستخدام Google"
    }
  }
} as const

function TranslationPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={(partProps) => (
          <Button {...partProps} variant="ghost" size="icon-sm" />
        )}
        class="ml-auto size-7"
      >
        <IconPlaceholder lucide="CircleExclamationPointIcon" />
        <span class="sr-only">Toggle</span>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" class="w-56 text-xs">
        <div>
          I used AI to translate the text for demonstration purposes. It&apos;s
          not perfect and may contain errors.
        </div>
        <Separator class="-mx-2.5 w-auto!" />
        <div data-lang="ar">
          لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا
          تكون الترجمة دقيقة وقد تحتوي على أخطاء.
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DirectionCard(props: { language: Language }) {
  const t = createMemo(() => content[props.language])
  const values = createMemo(() => t().values)

  return (
    <DirectionProvider direction={t().dir} locale={t().locale}>
      <Card class="w-full" dir={t().dir}>
        <CardHeader>
          <CardTitle>{values().title}</CardTitle>
          <CardDescription>{values().description}</CardDescription>
          <CardAction class="flex items-center gap-1">
            <Button variant="link">{values().signUp}</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div class="flex flex-col gap-6">
              <div class="grid gap-2">
                <Label for={`email-${props.language}`}>{values().email}</Label>
                <Input
                  id={`email-${props.language}`}
                  placeholder={values().emailPlaceholder}
                  required
                  type="email"
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for={`password-${props.language}`}>
                    {values().password}
                  </Label>
                  <a
                    class="ms-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="#"
                  >
                    {values().forgotPassword}
                  </a>
                </div>
                <Input
                  id={`password-${props.language}`}
                  required
                  type="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <Button class="w-full" type="submit">
            {values().login}
          </Button>
          <Button class="w-full" variant="outline">
            {values().loginWithGoogle}
          </Button>
        </CardFooter>
      </Card>
    </DirectionProvider>
  )
}

export default function DirectionDemo() {
  const [language, setLanguage] = createSignal<Language>("ar")

  return (
    <Tabs
      class="flex w-full max-w-sm flex-col items-center gap-4"
      onValueChange={(value) => setLanguage(value as Language)}
      value={language()}
    >
      <TabsList class="w-full">
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="ar">Arabic (العربية)</TabsTrigger>
        <TranslationPopover />
      </TabsList>
      <TabsContent value="en" class="w-full">
        <DirectionCard language="en" />
      </TabsContent>
      <TabsContent value="ar" class="w-full">
        <DirectionCard language="ar" />
      </TabsContent>
    </Tabs>
  )
}
