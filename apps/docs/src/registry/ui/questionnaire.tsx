// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps, JSX } from "@solidjs/web"
import {
  Checkbox as SdkCheckbox,
  CheckboxGroup as SdkCheckboxGroup
} from "@ui-sdk/solid/checkbox"
import { Input as SdkInput } from "@ui-sdk/solid/input"
import {
  Radio as SdkRadio,
  RadioGroup as SdkRadioGroup
} from "@ui-sdk/solid/radio"
import {
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  merge,
  omit,
  Show,
  untrack,
  useContext
} from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

export type QuestionnaireAnswers = Record<string, string | string[]>
export type QuestionnaireShortcutMode = "letters" | "numbers"
function shortcutKeys(mode: QuestionnaireShortcutMode | undefined) {
  if (mode === "letters")
    return Array.from({ length: 26 }, (_, index) =>
      String.fromCharCode(65 + index)
    )
  if (mode === "numbers")
    return Array.from({ length: 9 }, (_, index) => String(index + 1))
  return []
}
type QuestionnaireState = {
  shortcuts: () => QuestionnaireShortcutMode | undefined
  steps: () => string[]
  step: () => number
  answers: () => QuestionnaireAnswers
  error: () => string
  answer: (key: string, value: string | string[]) => void
  move: (direction: "previous" | "next" | "skip" | "submit") => void
}
const QuestionnaireContext = createContext<QuestionnaireState>()
const ItemContext = createContext<{ value: string; id: string }>()
const ChoiceContext = createContext<{
  multiple: () => boolean
  register: (value: string) => number
}>({ multiple: () => false, register: () => -1 })
export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext)
  if (!context) throw new Error("Questionnaire parts require a Questionnaire")
  return context
}
function useItem() {
  const context = useContext(ItemContext)
  if (!context)
    throw new Error("Questionnaire inputs require a QuestionnaireItem")
  return context
}
type QuestionnaireProps = Omit<
  ComponentProps<"form">,
  "onSubmit" | "onChange"
> & {
  steps: string[]
  required?: string[]
  value?: QuestionnaireAnswers
  defaultValue?: QuestionnaireAnswers
  onValueChange?: (value: QuestionnaireAnswers) => void
  step?: number
  defaultStep?: number
  onStepChange?: (step: number) => void
  onComplete?: (answers: QuestionnaireAnswers) => void
  shortcuts?: QuestionnaireShortcutMode | undefined
}
export function Questionnaire(props: QuestionnaireProps) {
  const rest = omit(
    props,
    "class",
    "steps",
    "required",
    "value",
    "defaultValue",
    "onValueChange",
    "step",
    "defaultStep",
    "onStepChange",
    "onComplete",
    "onReset",
    "onKeyDown",
    "shortcuts"
  )
  const [answers, setAnswers] = createSignal(props.defaultValue ?? {})
  const [step, setStep] = createSignal(props.defaultStep ?? 0)
  const [error, setError] = createSignal("")
  let form!: HTMLFormElement
  const state: QuestionnaireState = {
    shortcuts: () => props.shortcuts,
    steps: () => props.steps,
    step: () =>
      Math.max(0, Math.min(props.step ?? step(), props.steps.length - 1)),
    answers: () => props.value ?? answers(),
    error,
    answer(key, value) {
      const next = { ...state.answers(), [key]: value }
      if (props.value === undefined) setAnswers(next)
      props.onValueChange?.(next)
      setError("")
    },
    move(direction) {
      const current = props.steps[state.step()]!
      const empty = (key: string) => !state.answers()[key]?.length
      if (
        direction !== "previous" &&
        props.required?.includes(current) &&
        empty(current)
      ) {
        setError("Please answer this question before continuing.")
        return
      }
      let next = direction === "previous" ? state.step() - 1 : state.step() + 1
      if (direction === "submit" || next >= props.steps.length) {
        const missing = props.required?.find(empty)
        if (!missing) {
          setError("")
          props.onComplete?.(state.answers())
          return
        }
        next = props.steps.indexOf(missing)
        setError("Please answer this question before continuing.")
      } else setError("")
      next = Math.max(0, next)
      if (props.step === undefined) setStep(next)
      props.onStepChange?.(next)
      queueMicrotask(() =>
        form.querySelector<HTMLElement>("fieldset:not([hidden])")?.focus()
      )
    }
  }
  return (
    <QuestionnaireContext value={state}>
      <form
        {...rest}
        ref={(node) => {
          form = node
        }}
        novalidate
        data-slot="questionnaire"
        class={cn("cn-questionnaire flex w-full min-w-0 flex-col", props.class)}
        onReset={(event) => {
          if (typeof props.onReset === "function") props.onReset(event)
          else if (props.onReset) props.onReset[0](props.onReset[1], event)
          if (event.defaultPrevented) return
          if (props.value === undefined) setAnswers(props.defaultValue ?? {})
          if (props.step === undefined) setStep(props.defaultStep ?? 0)
          props.onValueChange?.(props.defaultValue ?? {})
          props.onStepChange?.(props.defaultStep ?? 0)
          setError("")
        }}
        onKeyDown={(event) => {
          if (typeof props.onKeyDown === "function") props.onKeyDown(event)
          else if (props.onKeyDown)
            props.onKeyDown[0](props.onKeyDown[1], event)
          if (
            event.defaultPrevented ||
            !props.shortcuts ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            (event.target as HTMLElement).matches(
              "textarea, select, [contenteditable]:not([contenteditable=false]), input:not([type=radio]):not([type=checkbox])"
            )
          )
            return
          const key = event.key.length === 1 ? event.key.toUpperCase() : ""
          if (!shortcutKeys(props.shortcuts).includes(key)) return
          const control = form
            .querySelector(
              `fieldset:not([hidden]) [data-slot="questionnaire-choice"][data-shortcut="${key}"]`
            )
            ?.querySelector<HTMLElement>('[role="radio"], [role="checkbox"]')
          if (!control) return
          event.preventDefault()
          if (event.repeat) return
          control.focus()
          control.click()
        }}
        onSubmit={(event) => {
          event.preventDefault()
          state.move("next")
        }}
      />
    </QuestionnaireContext>
  )
}
export function QuestionnaireItem(
  props: ComponentProps<"fieldset"> & { value: string }
) {
  const state = useQuestionnaire(),
    id = createUniqueId(),
    rest = omit(props, "class", "value")
  const item = merge(props, { id })
  return (
    <ItemContext value={item}>
      <fieldset
        {...rest}
        hidden={state.steps()[state.step()] !== props.value}
        tabindex={-1}
        data-slot="questionnaire-item"
        class={cn(
          "cn-questionnaire-item min-w-0 border-0 p-0 outline-none",
          props.class
        )}
      />
    </ItemContext>
  )
}
export function QuestionnaireTitle(props: ComponentProps<"legend">) {
  const item = useItem(),
    rest = omit(props, "class")
  return (
    <legend
      {...rest}
      id={`${item.id}-title`}
      data-slot="questionnaire-title"
      class={cn(
        "cn-questionnaire-title cn-font-heading text-pretty",
        props.class
      )}
    />
  )
}
export function QuestionnaireDescription(props: ComponentProps<"p">) {
  const item = useItem(),
    rest = omit(props, "class")
  return (
    <p
      {...rest}
      id={`${item.id}-description`}
      data-slot="questionnaire-description"
      class={cn(
        "cn-questionnaire-description text-pretty text-muted-foreground",
        props.class
      )}
    />
  )
}
export function QuestionnaireChoices(props: {
  children?: JSX.Element
  class?: string
  multiple?: boolean
}) {
  const state = useQuestionnaire(),
    item = useItem()
  const classes = () =>
    cn(
      "cn-questionnaire-choices group/questionnaire-choices grid min-w-0",
      props.class
    )
  const multiple = createMemo(() => props.multiple ?? false)
  // Shortcuts follow render order, which is the same on the server and client.
  const order: string[] = []
  const register = (value: string) => {
    if (!order.includes(value)) order.push(value)
    return order.indexOf(value)
  }
  return (
    <ChoiceContext value={{ multiple, register }}>
      <Show
        when={props.multiple}
        fallback={
          <SdkRadioGroup
            name={item.value}
            aria-labelledby={`${item.id}-title`}
            aria-describedby={`${item.id}-description`}
            value={
              typeof state.answers()[item.value] === "string"
                ? (state.answers()[item.value] as string)
                : ""
            }
            onValueChange={(v) => state.answer(item.value, v ?? "")}
            class={classes()}
          >
            {props.children}
          </SdkRadioGroup>
        }
      >
        <SdkCheckboxGroup
          name={item.value}
          aria-labelledby={`${item.id}-title`}
          aria-describedby={`${item.id}-description`}
          value={
            Array.isArray(state.answers()[item.value])
              ? (state.answers()[item.value] as string[])
              : []
          }
          onValueChange={(v) => state.answer(item.value, v)}
          class={classes()}
        >
          {props.children}
        </SdkCheckboxGroup>
      </Show>
    </ChoiceContext>
  )
}
export function QuestionnaireChoice(props: {
  value: string
  disabled?: boolean
  children?: JSX.Element
  class?: string
}) {
  const state = useQuestionnaire(),
    item = useItem(),
    choices = useContext(ChoiceContext),
    multiple = choices.multiple,
    // Register once in render order; a choice keeps its shortcut position.
    position = untrack(() => choices.register(props.value))
  const shortcut = () =>
    shortcutKeys(state.shortcuts())[position] as string | undefined
  const checked = () =>
    multiple()
      ? state.answers()[item.value]?.includes(props.value)
      : state.answers()[item.value] === props.value
  return (
    <label
      data-slot="questionnaire-choice"
      data-type={multiple() ? "checkbox" : "radio"}
      data-checked={checked() || undefined}
      data-disabled={props.disabled || undefined}
      data-shortcut={shortcut()}
      class={cn(
        "cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start outline-none select-none data-disabled:opacity-50",
        props.class
      )}
    >
      <Show
        when={multiple()}
        fallback={
          <SdkRadio
            value={props.value}
            disabled={props.disabled ?? false}
            aria-keyshortcuts={shortcut()}
            class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full opacity-0"
          />
        }
      >
        <SdkCheckbox
          value={props.value}
          disabled={props.disabled ?? false}
          aria-keyshortcuts={shortcut()}
          class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full opacity-0"
        />
      </Show>
      <span
        aria-hidden="true"
        data-slot="questionnaire-choice-indicator"
        class="cn-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
      >
        <span
          data-slot="questionnaire-choice-indicator-dot"
          class="cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          data-slot="questionnaire-choice-indicator-check"
          class="cn-questionnaire-choice-indicator-check hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span class="cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug">
        {props.children}
      </span>
      <Show when={shortcut()}>
        <span
          aria-hidden="true"
          data-slot="questionnaire-choice-shortcut"
          class="cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex"
        >
          {shortcut()}
        </span>
      </Show>
    </label>
  )
}
export function QuestionnaireChoiceDescription(props: ComponentProps<"span">) {
  return (
    <span
      {...props}
      data-slot="questionnaire-choice-description"
      class={cn("cn-questionnaire-choice-description", props.class)}
    />
  )
}
export function QuestionnaireInput(
  props: Omit<
    ComponentProps<typeof SdkInput>,
    "class" | "value" | "onValueChange"
  > & {
    class?: string
  }
) {
  const state = useQuestionnaire(),
    item = useItem(),
    rest = omit(props, "class")
  return (
    <div
      data-slot="questionnaire-input-wrapper"
      class="cn-questionnaire-input-wrapper group/questionnaire-input relative min-w-0"
    >
      <SdkInput
        {...rest}
        name={item.value}
        aria-labelledby={`${item.id}-title`}
        aria-describedby={`${item.id}-description`}
        value={String(state.answers()[item.value] ?? "")}
        onValueChange={(value) => state.answer(item.value, value)}
        class={cn(
          "cn-questionnaire-input min-h-11 w-full min-w-0 border p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          props.class
        )}
      />
    </div>
  )
}
export function QuestionnaireProgress(props: ComponentProps<"div">) {
  const state = useQuestionnaire(),
    rest = omit(props, "class", "children")
  return (
    <div
      {...rest}
      aria-live="polite"
      data-slot="questionnaire-progress"
      class={cn(
        "cn-questionnaire-progress text-muted-foreground tabular-nums",
        props.class
      )}
    >
      {props.children ??
        `Question ${state.step() + 1} of ${state.steps().length}`}
    </div>
  )
}
export function QuestionnaireError(props: ComponentProps<"p">) {
  const state = useQuestionnaire(),
    rest = omit(props, "class", "children")
  return (
    <p
      {...rest}
      role="alert"
      data-slot="questionnaire-error"
      class={cn("cn-questionnaire-error text-destructive", props.class)}
    >
      {props.children ?? state.error()}
    </p>
  )
}
export function QuestionnaireActions(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="questionnaire-actions"
      class={cn(
        "cn-questionnaire-actions flex min-h-11 w-full items-center gap-2",
        props.class
      )}
    />
  )
}
type ActionProps = Omit<ButtonProps, "onClick">
export function QuestionnairePrevious(props: ActionProps) {
  const state = useQuestionnaire()
  return (
    <Button
      variant="outline"
      {...props}
      type="button"
      disabled={props.disabled || state.step() === 0}
      onClick={() => state.move("previous")}
    >
      {props.children ?? "Previous"}
    </Button>
  )
}
export function QuestionnaireNext(props: ActionProps) {
  const state = useQuestionnaire()
  return (
    <Button {...props} type="button" onClick={() => state.move("next")}>
      {props.children ?? "Next"}
    </Button>
  )
}
export function QuestionnaireSkip(props: ActionProps) {
  const state = useQuestionnaire()
  return (
    <Button
      variant="ghost"
      {...props}
      type="button"
      onClick={() => state.move("skip")}
    >
      {props.children ?? "Skip"}
    </Button>
  )
}
export function QuestionnaireSubmit(props: ActionProps) {
  const state = useQuestionnaire()
  return (
    <Button {...props} type="button" onClick={() => state.move("submit")}>
      {props.children ?? "Submit"}
    </Button>
  )
}
