import { type Component, type ComponentProps, createSignal, For, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

type InputOTPProps = Omit<ComponentProps<"div">, "onChange"> & {
  maxLength: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const InputOTP: Component<InputOTPProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "maxLength",
    "value",
    "onChange",
    "disabled",
    "children"
  ])

  const initial = (local.value ?? "").split("")
  const [values, setValues] = createSignal<string[]>(
    Array.from({ length: local.maxLength }, (_, i) => initial[i] ?? "")
  )

  const inputRefs: HTMLInputElement[] = []

  const focusInput = (index: number) => {
    const ref = inputRefs[index]
    if (ref) {
      ref.focus()
      ref.select()
    }
  }

  const updateValue = (index: number, char: string) => {
    const next = [...values()]
    next[index] = char
    setValues(next)
    local.onChange?.(next.join(""))
  }

  const handleInput = (index: number, e: Event) => {
    const target = e.target as HTMLInputElement
    const char = target.value.slice(-1)

    if (char && !/^\d$/.test(char)) {
      target.value = values()[index]
      return
    }

    updateValue(index, char)

    if (char && index < local.maxLength - 1) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    switch (e.key) {
      case "Backspace": {
        e.preventDefault()
        if (values()[index]) {
          updateValue(index, "")
        } else if (index > 0) {
          updateValue(index - 1, "")
          focusInput(index - 1)
        }
        break
      }
      case "ArrowLeft": {
        e.preventDefault()
        if (index > 0) {
          focusInput(index - 1)
        }
        break
      }
      case "ArrowRight": {
        e.preventDefault()
        if (index < local.maxLength - 1) {
          focusInput(index + 1)
        }
        break
      }
      case "Delete": {
        e.preventDefault()
        updateValue(index, "")
        break
      }
    }
  }

  const handlePaste = (index: number, e: ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData?.getData("text/plain") ?? ""
    const digits = pasted.replace(/\D/g, "")

    if (!digits) return

    const chars = digits.split("")
    let currentIndex = index

    for (const char of chars) {
      if (currentIndex >= local.maxLength) break
      updateValue(currentIndex, char)
      currentIndex++
    }

    focusInput(Math.min(currentIndex, local.maxLength - 1))
  }

  const handleFocus = (e: FocusEvent) => {
    const target = e.target as HTMLInputElement
    target.select()
  }

  return (
    <div class={cn("flex items-center gap-2", local.class)} data-slot="input-otp" {...others}>
      <For each={Array.from({ length: local.maxLength }, (_, i) => i)}>
        {(index) => (
          <input
            aria-label={`Digit ${index + 1} of ${local.maxLength}`}
            autocomplete="one-time-code"
            class={cn(
              "h-9 w-9 rounded-md border border-input bg-transparent text-center text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
            )}
            data-slot="input-otp-slot"
            disabled={local.disabled}
            inputmode="numeric"
            maxLength={1}
            onFocus={handleFocus}
            onInput={[handleInput, index]}
            onKeyDown={[handleKeyDown, index]}
            onPaste={[handlePaste, index]}
            pattern="[0-9]"
            ref={(el) => {
              inputRefs[index] = el
            }}
            type="text"
            value={values()[index]}
          />
        )}
      </For>
    </div>
  )
}

type InputOTPGroupProps = ComponentProps<"div">

const InputOTPGroup: Component<InputOTPGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex items-center gap-2", local.class)}
      data-slot="input-otp-group"
      {...others}
    />
  )
}

type InputOTPSeparatorProps = ComponentProps<"div">

const InputOTPSeparator: Component<InputOTPSeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      aria-hidden="true"
      class={cn("flex items-center text-muted-foreground", local.class)}
      data-slot="input-otp-separator"
      role="separator"
      {...others}
    >
      <svg
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="1" />
      </svg>
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator }
