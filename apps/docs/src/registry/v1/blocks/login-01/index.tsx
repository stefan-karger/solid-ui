import { LoginForm } from "~/registry/v1/blocks/login-01/components/login-form"

export default function Page() {
  return (
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
