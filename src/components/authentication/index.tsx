import { IconCommand } from "~/components/icons";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/registry/ui/button";

import { UserAuthForm } from "./user-auth-form";

export function Authentication() {
  return (
    <>
      <div class="md:hidden">
        <img
          alt="Authentication"
          class="block dark:hidden"
          height={843}
          src="/examples/authentication-light.png"
          width={1280}
        />
        <img
          alt="Authentication"
          class="hidden dark:block"
          height={843}
          src="/examples/authentication-dark.png"
          width={1280}
        />
      </div>
      <div class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          class={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute top-4 right-4 md:top-8 md:right-8",
          )}
          href="/examples/authentication"
        >
          Login
        </a>
        <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div class="absolute inset-0 bg-zinc-900" />
          <div class="relative z-20 flex items-center font-medium text-lg">
            <IconCommand class="mr-2 size-6" />
            Acme Inc
          </div>
          <div class="relative z-20 mt-auto">
            <blockquote class="space-y-2">
              <p class="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer class="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div class="lg:p-8">
          <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div class="flex flex-col space-y-2 text-center">
              <h1 class="font-semibold text-2xl tracking-tight">
                Create an account
              </h1>
              <p class="text-muted-foreground text-sm">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p class="px-8 text-center text-muted-foreground text-sm">
              By clicking continue, you agree to our{" "}
              <a
                class="underline underline-offset-4 hover:text-primary"
                href="/terms"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                class="underline underline-offset-4 hover:text-primary"
                href="/privacy"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
