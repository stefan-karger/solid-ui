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
import { CheckIcon } from "lucide-solid"
import {
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  merge,
  omit,
  Show,
  useContext
} from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

export type QuestionnaireAnswers = Record<string, string | string[]>
type QuestionnaireState = {
  steps: () => string[]
  step: () => number
  answers: () => QuestionnaireAnswers
  error: () => string
  answer: (key: string, value: string | string[]) => void
  move: (direction: "previous" | "next" | "skip" | "submit") => void
}
const QuestionnaireContext = createContext<QuestionnaireState>()
const ItemContext = createContext<{ value: string; id: string }>()
const ChoiceContext = createContext<() => boolean>(() => false)
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
    "onReset"
  )
  const [answers, setAnswers] = createSignal(props.defaultValue ?? {})
  const [step, setStep] = createSignal(props.defaultStep ?? 0)
  const [error, setError] = createSignal("")
  let form!: HTMLFormElement
  const state: QuestionnaireState = {
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
  return (
    <ChoiceContext value={multiple}>
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
    multiple = useContext(ChoiceContext)
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
            class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full opacity-0"
          />
        }
      >
        <SdkCheckbox
          value={props.value}
          disabled={props.disabled ?? false}
          class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full opacity-0"
        />
      </Show>
      <span
        aria-hidden="true"
        class="cn-questionnaire-choice-indicator pointer-events-none flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
      >
        <Show when={checked()}>
          <CheckIcon class="cn-questionnaire-choice-indicator-check size-3" />
        </Show>
      </span>
      <span class="cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug">
        {props.children}
      </span>
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
