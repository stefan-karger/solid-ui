import {
  type ComponentProps,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  type JSX,
  on,
  onCleanup,
  onMount,
  untrack,
  useContext
} from "solid-js"

import type { ButtonProps } from "~/registry/ui/button"

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped"
type QuestionnaireShortcutMode = "letters" | "numbers"

type QuestionnaireChoiceDefinition = {
  disabled?: boolean
  value: string
}

type QuestionnaireItemDefinition = {
  choices?: readonly QuestionnaireChoiceDefinition[]
  disabled?: boolean
  name: string
  required?: boolean
}

type QuestionnaireRootState = {
  current: number
  first: boolean
  last: boolean
  total: number
}

type QuestionnaireRootProps = Omit<
  ComponentProps<"form">,
  "onKeyDown" | "onReset" | "onSubmit" | "ref"
> & {
  defaultItem?: string
  item?: string
  items?: readonly QuestionnaireItemDefinition[]
  onItemChange?: (item: string) => void
  onKeyDown?: JSX.EventHandler<HTMLFormElement, KeyboardEvent>
  onReset?: JSX.EventHandler<HTMLFormElement, Event>
  onSubmit?: JSX.EventHandler<HTMLFormElement, SubmitEvent>
  ref?: (element: HTMLFormElement) => void
  shortcuts?: QuestionnaireShortcutMode
}

type QuestionnaireProgressState = QuestionnaireRootState

type QuestionnaireProgressProps = Omit<ComponentProps<"div">, "children"> & {
  children?: JSX.Element | ((state: QuestionnaireProgressState) => JSX.Element)
}

type QuestionnaireItemState = {
  active: boolean
  disabled: boolean
  invalid: boolean
  multiple: boolean
  required: boolean
  status: QuestionnaireItemStatus
}

type QuestionnaireItemProps = Omit<ComponentProps<"fieldset">, "name" | "ref"> & {
  invalid?: boolean
  multiple?: boolean
  name: string
  onStatusChange?: (status: QuestionnaireItemStatus) => void
  ref?: (element: HTMLFieldSetElement) => void
  required?: boolean
}

type QuestionnaireTitleProps = ComponentProps<"legend">
type QuestionnaireDescriptionProps = ComponentProps<"p">

type QuestionnaireChoicesState = {
  shortcuts: QuestionnaireShortcutMode | null
}

type QuestionnaireChoicesProps = ComponentProps<"div">
type QuestionnaireErrorProps = ComponentProps<"p">

type QuestionnaireChoiceState = {
  readonly checked: boolean
  readonly disabled: boolean
  readonly invalid: boolean
  readonly shortcut: string | null
  readonly type: "checkbox" | "radio"
}

type QuestionnaireChoiceContextValue = {
  inputProps: Omit<ComponentProps<"input">, "ref"> & {
    ref: (element: HTMLInputElement) => void
  }
  state: QuestionnaireChoiceState
}

type QuestionnaireChoiceProps = Omit<ComponentProps<"label">, "onChange"> & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
  value: string
}

type QuestionnaireChoiceInputProps = Omit<
  ComponentProps<"input">,
  | "checked"
  | "defaultChecked"
  | "disabled"
  | "name"
  | "onChange"
  | "ref"
  | "required"
  | "type"
  | "value"
> & {
  ref?: (element: HTMLInputElement) => void
}

type QuestionnaireChoiceLabelProps = ComponentProps<"span">

type QuestionnaireChoiceShortcutState = Pick<QuestionnaireChoiceState, "shortcut">

type QuestionnaireChoiceShortcutProps = ComponentProps<"span">

type QuestionnaireInputState = {
  disabled: boolean
  filled: boolean
  invalid: boolean
}

type QuestionnaireInputType =
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"

type QuestionnaireInputProps = Omit<
  ComponentProps<"input">,
  "form" | "name" | "onChange" | "onInput" | "ref" | "type"
> & {
  defaultValue?: string | number
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
  ref?: (element: HTMLInputElement) => void
  type?: QuestionnaireInputType
}

type QuestionnaireNavigationState = {
  disabled: boolean
  shortcut: "Enter" | null
  status: QuestionnaireItemStatus | null
  visible: boolean
}

type QuestionnaireNavigationProps = ComponentProps<"button"> & Pick<ButtonProps, "size" | "variant">

type QuestionnairePreviousProps = QuestionnaireNavigationProps
type QuestionnaireSkipProps = QuestionnaireNavigationProps
type QuestionnaireNextProps = QuestionnaireNavigationProps
type QuestionnaireSubmitProps = QuestionnaireNavigationProps

type QuestionnaireActionsProps = ComponentProps<"div">
type QuestionnaireChoiceDescriptionProps = ComponentProps<"span">

type AnswerControlRegistration = {
  readonly disabled: boolean
  element: HTMLInputElement
  id: string
} & (
  | {
      readonly ownDisabled: boolean
      type: "choice"
      readonly value: string
    }
  | {
      type: "input"
    }
)

type ChoiceRegistration = {
  disabled: boolean
  value: string
}

type ItemRegistration = {
  readonly choices: readonly ChoiceRegistration[]
  readonly disabled: boolean
  element: HTMLFieldSetElement
  focus: () => void
  focusInvalid: () => void
  getAnswerByElement: (element: Element) => AnswerControlRegistration | null
  getAnswerByShortcut: (shortcut: string) => AnswerControlRegistration | null
  moveAnswerFocus: (element: Element, direction: "next" | "previous") => boolean
  readonly name: string
  readonly required: boolean
  reset: () => void
  skip: () => void
  readonly status: QuestionnaireItemStatus
  validate: () => boolean
}

type PendingFocus = {
  name: string
  target: "invalid" | "item"
}

type QuestionnaireContextValue = QuestionnaireRootState & {
  readonly activeItem: ItemRegistration | null
  readonly activeItemName: string | null
  readonly activeItemRequired: boolean | null
  readonly activeItemStatus: QuestionnaireItemStatus | null
  readonly domVersion: number
  goNext: () => void
  goPrevious: () => void
  readonly itemDefinitionByName: ReadonlyMap<string, QuestionnaireItemDefinition> | null
  readonly nativeValidation: boolean
  registerItem: (registration: ItemRegistration) => () => void
  readonly shortcuts: QuestionnaireShortcutMode | null
  skipCurrent: () => void
}

type QuestionnaireItemContextValue = {
  readonly active: boolean
  readonly disabled: boolean
  readonly hasInputAnswer: boolean
  readonly invalid: boolean
  readonly multiple: boolean
  readonly name: string
  registerAnswerControl: (registration: AnswerControlRegistration) => () => void
  registerAnswerSelection: (answerId: string, defaultSelected: boolean) => () => void
  registerDescription: (descriptionId: string) => () => void
  registerError: (errorId: string) => () => void
  readonly required: boolean
  readonly resetVersion: number
  readonly selectedAnswerIds: string[]
  setAnswerDefault: (answerId: string, defaultSelected: boolean) => void
  setAnswerSelectionFromInteraction: (answerId: string, selected: boolean) => void
  readonly shortcutByAnswerId: ReadonlyMap<string, string>
  readonly shortcutByChoiceValue: ReadonlyMap<string, string> | null
  readonly shortcuts: QuestionnaireShortcutMode | null
  readonly status: QuestionnaireItemStatus
  syncControlledAnswerSelection: (answerId: string, selected: boolean) => void
}

// export type {
//   AnswerControlRegistration,
//   ChoiceRegistration,
//   ItemRegistration,
//   PendingFocus,
//   QuestionnaireActionsProps,
//   QuestionnaireChoiceContextValue,
//   QuestionnaireChoiceDefinition,
//   QuestionnaireChoiceDescriptionProps,
//   QuestionnaireChoiceInputProps,
//   QuestionnaireChoiceLabelProps,
//   QuestionnaireChoiceProps,
//   QuestionnaireChoiceShortcutProps,
//   QuestionnaireChoiceShortcutState,
//   QuestionnaireChoiceState,
//   QuestionnaireChoicesProps,
//   QuestionnaireChoicesState,
//   QuestionnaireContextValue,
//   QuestionnaireDescriptionProps,
//   QuestionnaireErrorProps,
//   QuestionnaireInputProps,
//   QuestionnaireInputState,
//   QuestionnaireInputType,
//   QuestionnaireItemContextValue,
//   QuestionnaireItemDefinition,
//   QuestionnaireItemProps,
//   QuestionnaireItemState,
//   QuestionnaireItemStatus,
//   QuestionnaireNavigationProps,
//   QuestionnaireNavigationState,
//   QuestionnaireNextProps,
//   QuestionnairePreviousProps,
//   QuestionnaireProgressProps,
//   QuestionnaireProgressState,
//   QuestionnaireRootProps,
//   QuestionnaireRootState,
//   QuestionnaireShortcutMode,
//   QuestionnaireSkipProps,
//   QuestionnaireSubmitProps,
//   QuestionnaireTitleProps,
// };

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

function hasInputValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.some((item) => String(item).trim().length > 0)
  }

  return value !== undefined && value !== null && String(value).trim().length > 0
}

function getShortcutKeys(shortcuts: QuestionnaireShortcutMode | null) {
  if (shortcuts === "letters") {
    return Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
  }

  if (shortcuts === "numbers") {
    return Array.from({ length: 9 }, (_, index) => String(index + 1))
  }

  return []
}

function getShortcutFromKey(key: string, shortcuts: QuestionnaireShortcutMode) {
  const normalizedKey = shortcuts === "letters" ? key.toUpperCase() : key

  return getShortcutKeys(shortcuts).includes(normalizedKey) ? normalizedKey : null
}

function getAnswerKeyShortcuts(shortcut: string | null, filled: boolean) {
  return [shortcut, filled ? "Enter" : null].filter(Boolean).join(" ") || undefined
}

function isAnswerFilled(answer: AnswerControlRegistration) {
  if (answer.type === "choice") {
    return answer.element.checked
  }

  return answer.element.hasAttribute("name") && hasInputValue(answer.element.value)
}

function isEmptyNavigableInput(answer: AnswerControlRegistration | null) {
  return (
    answer?.type === "input" &&
    ["email", "password", "search", "tel", "text", "url"].includes(answer.element.type) &&
    !hasInputValue(answer.element.value)
  )
}

function isTextEntryTarget(element: Element) {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    return true
  }

  if (element instanceof HTMLInputElement) {
    return !["button", "checkbox", "radio", "reset", "submit"].includes(element.type)
  }

  return element instanceof HTMLElement && element.isContentEditable
}

function isRadioTarget(element: Element) {
  return element instanceof HTMLInputElement && element.type === "radio"
}

function compareItemOrder(firstItem: ItemRegistration, secondItem: ItemRegistration) {
  if (firstItem.element === secondItem.element) {
    return 0
  }

  const position = firstItem.element.compareDocumentPosition(secondItem.element)

  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1
  }

  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1
  }

  return 0
}

function compareAnswerOrder(
  firstAnswer: AnswerControlRegistration,
  secondAnswer: AnswerControlRegistration
) {
  if (firstAnswer.element === secondAnswer.element) {
    return 0
  }

  const position = firstAnswer.element.compareDocumentPosition(secondAnswer.element)

  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1
  }

  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1
  }

  return 0
}

// export {
//   compareAnswerOrder,
//   compareItemOrder,
//   getAnswerKeyShortcuts,
//   getShortcutFromKey,
//   getShortcutKeys,
//   hasInputValue,
//   isAnswerFilled,
//   isEmptyNavigableInput,
//   isRadioTarget,
//   isTextEntryTarget,
// };

// -------------------------------------------------------------------------------------
// Collection
// -------------------------------------------------------------------------------------

type QuestionnaireCollection = {
  enabledItems: readonly QuestionnaireItemDefinition[]
  itemByName: ReadonlyMap<string, QuestionnaireItemDefinition>
  items: readonly QuestionnaireItemDefinition[]
}

function createQuestionnaireCollection(
  items: readonly QuestionnaireItemDefinition[] | undefined
): QuestionnaireCollection | null {
  if (items === undefined) {
    return null
  }

  return {
    enabledItems: items.filter((item) => !item.disabled),
    itemByName: new Map(items.map((item) => [item.name, item])),
    items
  }
}

function getInitialItemName(
  collection: QuestionnaireCollection | null,
  defaultItem: string | undefined
) {
  if (!collection) {
    return defaultItem ?? null
  }

  const defaultDefinition = defaultItem ? collection.itemByName.get(defaultItem) : undefined

  if (defaultDefinition && !defaultDefinition.disabled) {
    return defaultDefinition.name
  }

  return collection.enabledItems[0]?.name ?? null
}

function getShortcutByChoiceValue(
  item: QuestionnaireItemDefinition | undefined,
  shortcuts: QuestionnaireShortcutMode | null
) {
  const shortcutByChoiceValue = new Map<string, string>()

  if (!item || !shortcuts) {
    return shortcutByChoiceValue
  }

  const keys = getShortcutKeys(shortcuts)
  let shortcutIndex = 0

  for (const choice of item.choices ?? []) {
    if (choice.disabled) {
      continue
    }

    const shortcut = keys[shortcutIndex]

    if (!shortcut) {
      break
    }

    shortcutByChoiceValue.set(choice.value, shortcut)
    shortcutIndex += 1
  }

  return shortcutByChoiceValue
}

function getCollectionDefinitionWarnings(
  collection: QuestionnaireCollection,
  defaultItem: string | undefined
) {
  const warnings: string[] = []
  const itemNames = new Set<string>()

  for (const item of collection.items) {
    if (itemNames.has(item.name)) {
      warnings.push(`Item name "${item.name}" is defined more than once.`)
    }

    itemNames.add(item.name)

    const choiceValues = new Set<string>()

    for (const choice of item.choices ?? []) {
      if (choiceValues.has(choice.value)) {
        warnings.push(
          `Choice value "${choice.value}" is defined more than once in item "${item.name}".`
        )
      }

      choiceValues.add(choice.value)
    }
  }

  if (defaultItem) {
    const defaultDefinition = collection.itemByName.get(defaultItem)

    if (!defaultDefinition || defaultDefinition.disabled) {
      warnings.push(
        `defaultItem "${defaultItem}" does not identify an enabled item. The first enabled item will be used instead.`
      )
    }
  }

  return warnings
}

function getCollectionRegistrationWarnings(
  collection: QuestionnaireCollection,
  registrations: readonly ItemRegistration[],
  shortcuts: QuestionnaireShortcutMode | null
) {
  const warnings: string[] = []
  const registrationByName = new Map(
    registrations.map((registration) => [registration.name, registration])
  )

  for (const definition of collection.items) {
    const registration = registrationByName.get(definition.name)

    if (!registration) {
      if (!definition.disabled) {
        warnings.push(`Item "${definition.name}" is defined but has no rendered QuestionnaireItem.`)
      }

      continue
    }

    if (registration.disabled !== Boolean(definition.disabled)) {
      warnings.push(
        `Item "${definition.name}" has different disabled values in Root.items and QuestionnaireItem.`
      )
    }

    if (registration.required !== Boolean(definition.required)) {
      warnings.push(
        `Item "${definition.name}" has different required values in Root.items and QuestionnaireItem.`
      )
    }

    const definedChoices = definition.choices ?? []
    const definedChoiceByValue = new Map(definedChoices.map((choice) => [choice.value, choice]))
    const registeredChoiceByValue = new Map(
      registration.choices.map((choice) => [choice.value, choice])
    )

    for (const choice of definedChoices) {
      const registeredChoice = registeredChoiceByValue.get(choice.value)

      if (!registeredChoice) {
        warnings.push(
          `Choice "${choice.value}" is defined for item "${definition.name}" but has no rendered QuestionnaireChoice.`
        )
        continue
      }

      if (registeredChoice.disabled !== Boolean(choice.disabled)) {
        warnings.push(
          `Choice "${choice.value}" in item "${definition.name}" has different disabled values in Root.items and QuestionnaireChoice.`
        )
      }
    }

    if (shortcuts) {
      for (const choice of registration.choices) {
        if (!definedChoiceByValue.has(choice.value)) {
          warnings.push(
            `Rendered choice "${choice.value}" in item "${definition.name}" is missing from Root.items and will not receive a shortcut.`
          )
        }
      }

      const definedOrder = definedChoices
        .filter((choice) => !choice.disabled)
        .map((choice) => choice.value)
      const registeredOrder = registration.choices
        .filter((choice) => !choice.disabled)
        .map((choice) => choice.value)

      const sameChoices =
        definedOrder.length > 0 &&
        definedOrder.length === registeredOrder.length &&
        definedOrder.every((choiceValue) => registeredOrder.includes(choiceValue))

      if (
        sameChoices &&
        definedOrder.some((choiceValue, index) => choiceValue !== registeredOrder[index])
      ) {
        warnings.push(
          `Choice order for item "${definition.name}" differs between Root.items and the rendered QuestionnaireChoice elements.`
        )
      }
    }
  }

  for (const registration of registrations) {
    if (!registration.disabled && !collection.itemByName.has(registration.name)) {
      warnings.push(
        `Rendered item "${registration.name}" is missing from Root.items and is excluded from the questionnaire collection.`
      )
    }
  }

  return warnings
}

// export {
//   createQuestionnaireCollection,
//   getCollectionDefinitionWarnings,
//   getCollectionRegistrationWarnings,
//   getInitialItemName,
//   getShortcutByChoiceValue,
//   type QuestionnaireCollection,
// };

// -------------------------------------------------------------------------------------
// Context
// -------------------------------------------------------------------------------------

const QuestionnaireChoiceContext = createContext<QuestionnaireChoiceContextValue | null>(null)
const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(null)
const QuestionnaireItemContext = createContext<QuestionnaireItemContextValue | null>(null)

function useQuestionnaireContext(component: string) {
  const context = useContext(QuestionnaireContext)

  if (!context) {
    throw new Error(`${component} must be used within a QuestionnaireRoot component.`)
  }

  return context
}

function useQuestionnaireChoiceContext(component: string) {
  const context = useContext(QuestionnaireChoiceContext)

  if (!context) {
    throw new Error(`${component} must be used within a QuestionnaireChoice component.`)
  }

  return context
}

function useQuestionnaireItemContext(component: string) {
  const context = useContext(QuestionnaireItemContext)

  if (!context) {
    throw new Error(`${component} must be used within a QuestionnaireItem component.`)
  }

  return context
}

/**
 * Public accessor for the questionnaire root state (`current`, `total`,
 * `first`, `last`, `activeItemStatus`, ...) for custom composition.
 * Zaidan addition over the upstream API.
 */
function useQuestionnaire() {
  return useQuestionnaireContext("useQuestionnaire")
}

// export {
//   QuestionnaireChoiceContext,
//   QuestionnaireContext,
//   QuestionnaireItemContext,
//   useQuestionnaire,
//   useQuestionnaireChoiceContext,
//   useQuestionnaireContext,
//   useQuestionnaireItemContext,
// };

// -------------------------------------------------------------------------------------
// use-questionnaire-root
// -------------------------------------------------------------------------------------

type CreateQuestionnaireRootParameters = Pick<
  QuestionnaireRootProps,
  | "defaultItem"
  | "item"
  | "items"
  | "noValidate"
  | "onItemChange"
  | "onKeyDown"
  | "onReset"
  | "onSubmit"
  | "ref"
  | "shortcuts"
>

type LogicalItems = Array<{ name: string }>

function createQuestionnaireRoot(props: CreateQuestionnaireRootParameters) {
  let rootElement: HTMLFormElement | undefined
  // Deliberately non-reactive: pending focus is consumed by the effect below
  // without re-triggering it.
  let pendingFocus: PendingFocus | null = null

  const [registrations, setRegistrations] = createSignal<ItemRegistration[]>([])
  const [domVersion, setDomVersion] = createSignal(0)
  const collection = createMemo(() => createQuestionnaireCollection(props.items))
  const [uncontrolledItem, setUncontrolledItem] = createSignal<string | null>(
    untrack(() => getInitialItemName(collection(), props.defaultItem))
  )
  const controlled = () => props.item !== undefined
  const activeItemName = () => (controlled() ? (props.item ?? null) : uncontrolledItem())
  let previousActiveItemName = untrack(activeItemName)
  const nativeValidation = () => props.noValidate === false
  const shortcuts = () => props.shortcuts ?? null

  if (import.meta.env.DEV) {
    let activeWarnings = new Set<string>()

    createEffect(() => {
      const currentCollection = collection()
      const currentDefaultItem = props.defaultItem
      const currentRegistrations = registrations()
      const currentShortcuts = shortcuts()

      if (!currentCollection) {
        activeWarnings.clear()
        return
      }

      let cancelled = false

      onCleanup(() => {
        cancelled = true
      })

      queueMicrotask(() => {
        if (cancelled || !rootElement) {
          return
        }

        // Registrations expose live getters; read them untracked so the
        // microtask never subscribes this effect to registration state.
        const warnings = untrack(() => [
          ...getCollectionDefinitionWarnings(currentCollection, currentDefaultItem),
          ...getCollectionRegistrationWarnings(
            currentCollection,
            currentRegistrations,
            currentShortcuts
          )
        ])
        const nextActiveWarnings = new Set(warnings)

        nextActiveWarnings.forEach((warning) => {
          if (!activeWarnings.has(warning)) {
            console.warn(`[Questionnaire] ${warning}`)
          }
        })

        activeWarnings = nextActiveWarnings
      })
    })
  }

  onMount(() => {
    if (!rootElement || typeof MutationObserver === "undefined") {
      return
    }

    const observer = new MutationObserver(() => {
      setDomVersion((version) => version + 1)
    })

    observer.observe(rootElement, { childList: true, subtree: true })

    onCleanup(() => observer.disconnect())
  })

  const runtimeItems = createMemo(() => {
    domVersion()

    return [...registrations()]
      .filter((registration) => !registration.disabled)
      .sort(compareItemOrder)
  })
  const runtimeItemByName = createMemo(
    () => new Map(runtimeItems().map((runtimeItem) => [runtimeItem.name, runtimeItem]))
  )
  const logicalItems = createMemo<LogicalItems>(() => {
    const items = collection()?.enabledItems ?? runtimeItems()
    if (items.length === 0) throw new Error("must have one logical item set")
    return items as LogicalItems
  })
  const currentIndex = createMemo(() =>
    logicalItems().findIndex((logicalItem) => logicalItem.name === activeItemName())
  )
  const activeItem = createMemo(() => {
    const name = activeItemName()

    return currentIndex() < 0 || !name ? null : (runtimeItemByName().get(name) ?? null)
  })
  const activeDefinition = () => {
    const name = activeItemName()

    return name ? collection()?.itemByName.get(name) : undefined
  }
  const activeItemRequired = createMemo(() => {
    if (currentIndex() < 0) {
      return null
    }

    const definition = activeDefinition()

    return definition ? Boolean(definition.required) : (activeItem()?.required ?? false)
  })
  const activeItemStatus = createMemo(() =>
    currentIndex() < 0 ? null : (activeItem()?.status ?? (activeItemName() ? "unanswered" : null))
  )
  const orderedRegistrations = createMemo(() => {
    const currentCollection = collection()

    if (!currentCollection) {
      return runtimeItems()
    }

    return currentCollection.enabledItems.flatMap((definition) => {
      const registration = runtimeItemByName().get(definition.name)

      return registration ? [registration] : []
    })
  })
  const total = () => logicalItems().length
  const current = () => (currentIndex() < 0 ? 0 : currentIndex() + 1)
  const first = () => total() > 0 && currentIndex() === 0
  const last = () => total() > 0 && currentIndex() === total() - 1

  const setItem = (nextItem: string, focusTarget: PendingFocus["target"] = "item") => {
    if (nextItem === untrack(activeItemName)) {
      return
    }

    pendingFocus = { name: nextItem, target: focusTarget }

    if (!untrack(controlled)) {
      setUncontrolledItem(nextItem)
    }

    props.onItemChange?.(nextItem)
  }

  createEffect(() => {
    if (total() === 0) {
      return
    }

    if (currentIndex() < 0) {
      const item = logicalItems()[0]
      if (!controlled() && activeItemName() === null) {
        if (item) setUncontrolledItem(item.name)
        return
      }

      if (item) setItem(item.name)
      return
    }

    const currentPendingFocus = pendingFocus
    const activeItemChanged = previousActiveItemName !== activeItemName()

    previousActiveItemName = activeItemName()

    if (!currentPendingFocus || currentPendingFocus.name !== activeItemName()) {
      if (controlled() && activeItemChanged) {
        pendingFocus = null
        activeItem()?.focus()
      }

      return
    }

    if (currentPendingFocus.target === "invalid") {
      activeItem()?.focusInvalid()
    } else {
      activeItem()?.focus()
    }

    pendingFocus = null
  })

  const registerItem = (registration: ItemRegistration) => {
    setRegistrations((currentRegistrations) => [
      ...currentRegistrations.filter(
        (currentRegistration) =>
          currentRegistration.element !== registration.element &&
          currentRegistration.name !== registration.name
      ),
      registration
    ])

    return () => {
      setRegistrations((currentRegistrations) =>
        currentRegistrations.filter((currentRegistration) => currentRegistration !== registration)
      )
    }
  }

  const goPrevious = () => {
    if (untrack(currentIndex) <= 0) {
      return
    }

    const items = untrack(logicalItems)
    const index = untrack(currentIndex)
    const nextItem = items[index - 1]
    if (nextItem) setItem(nextItem.name)
  }

  const goNext = () => {
    const item = untrack(activeItem)

    if (!item || untrack(currentIndex) >= untrack(total) - 1) {
      return
    }

    if (!item.validate()) {
      item.focusInvalid()
      return
    }

    const items = untrack(logicalItems)
    const index = untrack(currentIndex)
    const nextItem = items[index + 1]
    if (nextItem) setItem(nextItem.name)
  }

  const confirmCurrent = () => {
    const item = untrack(activeItem)

    if (!item) {
      return
    }

    if (!item.validate()) {
      item.focusInvalid()
      return
    }

    if (untrack(last)) {
      rootElement?.requestSubmit()
      return
    }

    const items = untrack(logicalItems)
    const index = untrack(currentIndex)
    const nextItem = items[index + 1]
    if (nextItem) setItem(nextItem.name)
  }

  const skipCurrent = () => {
    const item = untrack(activeItem)

    if (!item || item.required) {
      return
    }

    item.skip()

    if (!untrack(last)) {
      const items = untrack(logicalItems)
      const index = untrack(currentIndex)
      const nextItem = items[index + 1]
      if (nextItem) setItem(nextItem.name)
      return
    }

    queueMicrotask(() => {
      rootElement?.requestSubmit()
    })
  }

  const handleReset: JSX.EventHandler<HTMLFormElement, Event> = (event) => {
    props.onReset?.(event)

    if (event.defaultPrevented) {
      return
    }

    for (const registration of untrack(registrations)) {
      registration.reset()
    }

    const currentCollection = untrack(collection)
    const resetItemName = currentCollection
      ? getInitialItemName(currentCollection, props.defaultItem)
      : (untrack(runtimeItems).find((registration) => registration.name === props.defaultItem)
          ?.name ?? untrack(runtimeItems)[0]?.name)

    if (resetItemName) {
      setItem(resetItemName)
    }
  }

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (event) => {
    const firstInvalidItem = untrack(orderedRegistrations).find(
      (registration) => !registration.validate()
    )

    if (firstInvalidItem) {
      event.preventDefault()
      setItem(firstInvalidItem.name, "invalid")

      if (firstInvalidItem.name === untrack(activeItemName)) {
        firstInvalidItem.focusInvalid()
        pendingFocus = null
      }

      return
    }

    props.onSubmit?.(event)
  }

  const handleKeyDown: JSX.EventHandler<HTMLFormElement, KeyboardEvent> = (event) => {
    props.onKeyDown?.(event)

    const item = untrack(activeItem)

    if (
      event.defaultPrevented ||
      event.isComposing ||
      event.keyCode === 229 ||
      !item ||
      !(event.target instanceof Element)
    ) {
      return
    }

    if (
      event.key === "Enter" &&
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      !event.shiftKey
    ) {
      event.preventDefault()

      if (!event.repeat) {
        confirmCurrent()
      }

      return
    }

    if (event.metaKey || event.ctrlKey || event.altKey) {
      return
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const moved = item.moveAnswerFocus(
        event.target,
        event.key === "ArrowDown" ? "next" : "previous"
      )

      if (moved) {
        event.preventDefault()
        return
      }
    }

    if (
      (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
      !isTextEntryTarget(event.target) &&
      !isRadioTarget(event.target)
    ) {
      event.preventDefault()

      if (event.repeat) {
        return
      }

      if (event.key === "ArrowLeft") {
        goPrevious()
      } else if (item.status !== "unanswered") {
        goNext()
      }

      return
    }

    if (event.key === "Enter") {
      const answer = item.getAnswerByElement(event.target)

      if (!answer) {
        return
      }

      event.preventDefault()

      if (!event.repeat && isAnswerFilled(answer)) {
        confirmCurrent()
      }

      return
    }

    const shortcutMode = untrack(shortcuts)

    if (!shortcutMode || isTextEntryTarget(event.target)) {
      return
    }

    const shortcut = getShortcutFromKey(event.key, shortcutMode)
    const answer = shortcut ? item.getAnswerByShortcut(shortcut) : null

    if (!answer) {
      return
    }

    event.preventDefault()

    if (event.repeat) {
      return
    }

    answer.element.focus()

    if (answer.type === "choice") {
      answer.element.click()
    }
  }

  const setRootRef = (element: HTMLFormElement) => {
    rootElement = element
    props.ref?.(element)
  }

  const context: QuestionnaireContextValue = {
    get current() {
      return current()
    },
    get first() {
      return first()
    },
    get last() {
      return last()
    },
    get total() {
      return total()
    },
    get activeItem() {
      return activeItem()
    },
    get activeItemName() {
      return activeItemName()
    },
    get activeItemRequired() {
      return activeItemRequired()
    },
    get activeItemStatus() {
      return activeItemStatus()
    },
    get domVersion() {
      return domVersion()
    },
    goNext,
    goPrevious,
    get itemDefinitionByName() {
      return collection()?.itemByName ?? null
    },
    get nativeValidation() {
      return nativeValidation()
    },
    registerItem,
    get shortcuts() {
      return shortcuts()
    },
    skipCurrent
  }

  return {
    context,
    rootProps: {
      onKeyDown: handleKeyDown,
      onReset: handleReset,
      onSubmit: handleSubmit,
      ref: setRootRef
    }
  }
}

// -------------------------------------------------------------------------------------
// use-questionnaire-item
// -------------------------------------------------------------------------------------

type CreateQuestionnaireItemParameters = Pick<
  QuestionnaireItemProps,
  | "aria-describedby"
  | "aria-keyshortcuts"
  | "disabled"
  | "invalid"
  | "multiple"
  | "name"
  | "onStatusChange"
  | "ref"
  | "required"
>

function createQuestionnaireItem(props: CreateQuestionnaireItemParameters) {
  const rootContext = useQuestionnaireContext("QuestionnaireItem")

  const [element, setElement] = createSignal<HTMLFieldSetElement | null>(null)
  const [answerControlRegistrations, setAnswerControlRegistrations] = createSignal<
    AnswerControlRegistration[]
  >([])
  const [validationAttempted, setValidationAttempted] = createSignal(false)
  const [selectedAnswerIds, setSelectedAnswerIds] = createSignal<string[]>([])
  const [skipped, setSkipped] = createSignal(false)
  const [resetVersion, setResetVersion] = createSignal(0)
  const [descriptionIds, setDescriptionIds] = createSignal<string[]>([])
  const [errorIds, setErrorIds] = createSignal<string[]>([])

  let defaultSelectedAnswerIds: string[] = []

  const disabled = () => props.disabled ?? false
  const multiple = () => props.multiple ?? false
  const required = () => props.required ?? false
  const externallyInvalid = () => props.invalid ?? false
  const active = createMemo(() => !disabled() && rootContext.activeItemName === props.name)
  const answerControls = createMemo(() => {
    rootContext.domVersion

    return [...answerControlRegistrations()].sort(compareAnswerOrder)
  })
  const answers = createMemo(() =>
    answerControls().filter((registration) => !registration.disabled)
  )
  const answered = createMemo(() =>
    answers().some((answer) => selectedAnswerIds().includes(answer.id))
  )
  const status = createMemo<QuestionnaireItemStatus>(() =>
    skipped() ? "skipped" : answered() ? "answered" : "unanswered"
  )
  const intentionallySkipped = () => status() === "skipped" && !required()
  const valid = createMemo(
    () => disabled() || intentionallySkipped() || (!externallyInvalid() && status() === "answered")
  )
  const invalid = createMemo(
    () =>
      !disabled() &&
      !intentionallySkipped() &&
      (externallyInvalid() || (validationAttempted() && !valid()))
  )
  const hasInputAnswer = createMemo(() => answers().some((answer) => answer.type === "input"))
  const itemDefinition = () => rootContext.itemDefinitionByName?.get(props.name)
  const shortcutByChoiceValue = createMemo(() =>
    rootContext.itemDefinitionByName
      ? getShortcutByChoiceValue(itemDefinition(), rootContext.shortcuts)
      : null
  )
  const shortcutByAnswerId = createMemo(() => {
    if (shortcutByChoiceValue()) {
      return new Map<string, string>()
    }

    const keys = getShortcutKeys(rootContext.shortcuts)
    const shortcutAnswers = answers().filter((answer) => answer.type === "choice")

    return new Map(
      shortcutAnswers.slice(0, keys.length).map((answer, index) => [answer.id, keys[index]])
    ) as Map<string, string>
  })

  let previousStatus = untrack(status)

  createEffect(() => {
    const currentStatus = status()

    if (previousStatus === currentStatus) {
      return
    }

    previousStatus = currentStatus
    props.onStatusChange?.(currentStatus)
  })

  const registerAnswerControl = (registration: AnswerControlRegistration) => {
    setAnswerControlRegistrations((currentRegistrations) => [
      ...currentRegistrations.filter(
        (currentRegistration) =>
          currentRegistration.element !== registration.element &&
          currentRegistration.id !== registration.id
      ),
      registration
    ])

    return () => {
      setAnswerControlRegistrations((currentRegistrations) =>
        currentRegistrations.filter((currentRegistration) => currentRegistration !== registration)
      )
    }
  }

  const updateAnswerSelected = (answerId: string, selected: boolean) => {
    setSelectedAnswerIds((currentAnswerIds) => {
      if (!selected) {
        return currentAnswerIds.filter((currentAnswerId) => currentAnswerId !== answerId)
      }

      if (!untrack(multiple)) {
        return [answerId]
      }

      return currentAnswerIds.includes(answerId)
        ? currentAnswerIds
        : [...currentAnswerIds, answerId]
    })
  }

  const setAnswerSelectionFromInteraction = (answerId: string, selected: boolean) => {
    setSkipped(false)
    updateAnswerSelected(answerId, selected)
  }

  const syncControlledAnswerSelection = (answerId: string, selected: boolean) => {
    if (selected) {
      setSkipped(false)
    }

    updateAnswerSelected(answerId, selected)
  }

  const registerAnswerSelection = (answerId: string, defaultSelected: boolean) => {
    if (defaultSelected) {
      defaultSelectedAnswerIds = [
        ...defaultSelectedAnswerIds.filter((currentAnswerId) => currentAnswerId !== answerId),
        answerId
      ]
      setSelectedAnswerIds((currentAnswerIds) => {
        if (!untrack(multiple)) {
          return currentAnswerIds.length ? currentAnswerIds : [answerId]
        }

        return currentAnswerIds.includes(answerId)
          ? currentAnswerIds
          : [...currentAnswerIds, answerId]
      })
    }

    return () => {
      defaultSelectedAnswerIds = defaultSelectedAnswerIds.filter(
        (currentAnswerId) => currentAnswerId !== answerId
      )
      setSelectedAnswerIds((currentAnswerIds) =>
        currentAnswerIds.filter((currentAnswerId) => currentAnswerId !== answerId)
      )
    }
  }

  const setAnswerDefault = (answerId: string, defaultSelected: boolean) => {
    if (defaultSelected) {
      defaultSelectedAnswerIds = defaultSelectedAnswerIds.includes(answerId)
        ? defaultSelectedAnswerIds
        : [...defaultSelectedAnswerIds, answerId]
      return
    }

    defaultSelectedAnswerIds = defaultSelectedAnswerIds.filter(
      (currentAnswerId) => currentAnswerId !== answerId
    )
  }

  const registerDescription = (registeredDescriptionId: string) => {
    setDescriptionIds((currentDescriptionIds) =>
      currentDescriptionIds.includes(registeredDescriptionId)
        ? currentDescriptionIds
        : [...currentDescriptionIds, registeredDescriptionId]
    )

    return () => {
      setDescriptionIds((currentDescriptionIds) =>
        currentDescriptionIds.filter(
          (currentDescriptionId) => currentDescriptionId !== registeredDescriptionId
        )
      )
    }
  }

  const registerError = (registeredErrorId: string) => {
    setErrorIds((currentErrorIds) =>
      currentErrorIds.includes(registeredErrorId)
        ? currentErrorIds
        : [...currentErrorIds, registeredErrorId]
    )

    return () => {
      setErrorIds((currentErrorIds) =>
        currentErrorIds.filter((currentErrorId) => currentErrorId !== registeredErrorId)
      )
    }
  }

  const validate = () => {
    setValidationAttempted(true)

    if (!untrack(valid)) {
      return false
    }

    if (!rootContext.nativeValidation) {
      return true
    }

    const invalidAnswer = untrack(answers).find(
      (answer) =>
        isAnswerFilled(answer) && answer.element.willValidate && !answer.element.validity.valid
    )

    if (!invalidAnswer) {
      return true
    }

    invalidAnswer.element.focus()
    invalidAnswer.element.reportValidity()

    return false
  }

  const focus = () => {
    untrack(element)?.focus()
  }

  const focusInvalid = () => {
    const currentElement = untrack(element)
    const selectedInput = currentElement?.querySelector<HTMLInputElement>(
      "input[data-filled][name]:not(:disabled)"
    )
    const firstControl = currentElement?.querySelector<HTMLElement>(
      "input:not([type=hidden]):not(:disabled), textarea:not(:disabled)"
    )

    ;(selectedInput ?? firstControl ?? currentElement)?.focus()
  }

  const reset = () => {
    setValidationAttempted(false)
    setSkipped(false)
    setSelectedAnswerIds(
      untrack(multiple) ? [...defaultSelectedAnswerIds] : defaultSelectedAnswerIds.slice(0, 1)
    )
    setResetVersion((version) => version + 1)
  }

  const skip = () => {
    if (untrack(required)) {
      return
    }

    setSelectedAnswerIds([])
    setSkipped(true)
  }

  // Collapse a multi-selection down to a single answer when the item leaves
  // multiple mode.
  createEffect(
    on(
      multiple,
      (isMultiple, wasMultiple) => {
        if (!wasMultiple || isMultiple) {
          return
        }

        setSelectedAnswerIds((currentAnswerIds) => {
          const selectedAnswer = untrack(answers).find((answer) =>
            currentAnswerIds.includes(answer.id)
          )

          return selectedAnswer ? [selectedAnswer.id] : []
        })
      },
      { defer: true }
    )
  )

  const getAnswerByElement = (answerElement: Element) =>
    untrack(answers).find((answer) => answer.element === answerElement) ?? null

  const getAnswerByShortcut = (shortcut: string) => {
    const byChoiceValue = untrack(shortcutByChoiceValue)
    const currentAnswers = untrack(answers)

    if (byChoiceValue) {
      const choiceValue = Array.from(byChoiceValue.entries()).find(
        ([, choiceShortcut]) => choiceShortcut === shortcut
      )?.[0]

      return (
        currentAnswers.find((answer) => answer.type === "choice" && answer.value === choiceValue) ??
        null
      )
    }

    const answerId = Array.from(untrack(shortcutByAnswerId).entries()).find(
      ([, answerShortcut]) => answerShortcut === shortcut
    )?.[0]

    return currentAnswers.find((answer) => answer.id === answerId) ?? null
  }

  const moveAnswerFocus = (currentElement: Element, direction: "next" | "previous") => {
    const currentAnswers = untrack(answers)
    const answerIndex = currentAnswers.findIndex((answer) => answer.element === currentElement)
    const currentAnswer = answerIndex < 0 ? null : (currentAnswers[answerIndex] ?? null)

    if (
      !currentAnswers.length ||
      (isTextEntryTarget(currentElement) && !isEmptyNavigableInput(currentAnswer)) ||
      (answerIndex < 0 && currentElement !== untrack(element))
    ) {
      return false
    }

    const nextAnswer =
      answerIndex < 0
        ? (currentAnswers.find(isAnswerFilled) ??
          (direction === "next" ? currentAnswers[0] : currentAnswers[currentAnswers.length - 1]))
        : currentAnswers[
            (answerIndex + (direction === "next" ? 1 : -1) + currentAnswers.length) %
              currentAnswers.length
          ]

    if (!nextAnswer || nextAnswer.element === currentElement) {
      return false
    }

    if (answerIndex >= 0 && isRadioTarget(currentElement) && isRadioTarget(nextAnswer.element)) {
      return false
    }

    nextAnswer.element.focus()

    if (nextAnswer.type === "choice" && isRadioTarget(nextAnswer.element)) {
      nextAnswer.element.click()
    }

    return true
  }

  onMount(() => {
    const currentElement = untrack(element)

    if (!currentElement) {
      return
    }

    // The registration is a live object: getters keep the root reading fresh
    // values without re-registering on every change.
    const registration: ItemRegistration = {
      get choices() {
        return answerControls().flatMap((answer) =>
          answer.type === "choice" ? [{ disabled: answer.ownDisabled, value: answer.value }] : []
        )
      },
      get disabled() {
        return disabled()
      },
      element: currentElement,
      focus,
      focusInvalid,
      getAnswerByElement,
      getAnswerByShortcut,
      moveAnswerFocus,
      get name() {
        return props.name
      },
      get required() {
        return required()
      },
      reset,
      skip,
      get status() {
        return status()
      },
      validate
    }

    onCleanup(rootContext.registerItem(registration))
  })

  const context: QuestionnaireItemContextValue = {
    get active() {
      return active()
    },
    get disabled() {
      return disabled()
    },
    get hasInputAnswer() {
      return hasInputAnswer()
    },
    get invalid() {
      return invalid()
    },
    get multiple() {
      return multiple()
    },
    get name() {
      return props.name
    },
    registerAnswerControl,
    registerAnswerSelection,
    registerDescription,
    registerError,
    get required() {
      return required()
    },
    get resetVersion() {
      return resetVersion()
    },
    get selectedAnswerIds() {
      return selectedAnswerIds()
    },
    setAnswerDefault,
    setAnswerSelectionFromInteraction,
    get shortcutByAnswerId() {
      return shortcutByAnswerId()
    },
    get shortcutByChoiceValue() {
      return shortcutByChoiceValue()
    },
    get shortcuts() {
      return rootContext.shortcuts
    },
    get status() {
      return status()
    },
    syncControlledAnswerSelection
  }

  const describedBy = () =>
    [...descriptionIds(), ...(invalid() ? errorIds() : []), props["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined
  const keyShortcuts = () =>
    [
      props["aria-keyshortcuts"],
      active() ? "Meta+Enter Control+Enter" : undefined,
      active() && answers().length ? "ArrowUp ArrowDown" : undefined,
      active() && !rootContext.first ? "ArrowLeft" : undefined,
      active() && !rootContext.last && status() !== "unanswered" ? "ArrowRight" : undefined
    ]
      .filter(Boolean)
      .join(" ") || undefined

  const setItemRef = (nextElement: HTMLFieldSetElement) => {
    setElement(nextElement)
    props.ref?.(nextElement)
  }

  const state: QuestionnaireItemState = {
    get active() {
      return active()
    },
    get disabled() {
      return disabled()
    },
    get invalid() {
      return invalid()
    },
    get multiple() {
      return multiple()
    },
    get required() {
      return required()
    },
    get status() {
      return status()
    }
  }

  return {
    context,
    itemProps: {
      get "aria-describedby"() {
        return describedBy()
      },
      get "aria-invalid"() {
        return invalid() || undefined
      },
      get "aria-keyshortcuts"() {
        return keyShortcuts()
      },
      get disabled() {
        return disabled()
      },
      get hidden() {
        return !active()
      },
      get inert() {
        return !active()
      },
      ref: setItemRef,
      tabIndex: -1
    },
    state
  }
}

// -------------------------------------------------------------------------------------
// use-questionnaire-choice
// -------------------------------------------------------------------------------------

type CreateQuestionnaireChoiceParameters = Pick<
  QuestionnaireChoiceProps,
  "checked" | "defaultChecked" | "disabled" | "onChange" | "value"
>

function createQuestionnaireChoice(
  props: CreateQuestionnaireChoiceParameters
): QuestionnaireChoiceContextValue {
  const itemContext = useQuestionnaireItemContext("QuestionnaireChoice")
  const answerId = createUniqueId()
  const [inputElement, setInputElement] = createSignal<HTMLInputElement | null>(null)
  const initialDefaultChecked = untrack(() => props.defaultChecked ?? false)
  const controlled = () => props.checked !== undefined
  const choiceDisabled = () => props.disabled ?? false
  const disabled = () => itemContext.disabled || choiceDisabled()
  const selected = () => itemContext.selectedAnswerIds.includes(answerId)
  const checked = createMemo(() =>
    controlled() ? (itemContext.status === "skipped" ? false : Boolean(props.checked)) : selected()
  )
  const type = () => (itemContext.multiple ? "checkbox" : "radio")
  const shortcut = createMemo(
    () =>
      itemContext.shortcutByChoiceValue?.get(props.value) ??
      itemContext.shortcutByAnswerId.get(answerId) ??
      null
  )

  onMount(() => {
    onCleanup(itemContext.registerAnswerSelection(answerId, initialDefaultChecked))
  })

  createEffect(() => {
    itemContext.setAnswerDefault(answerId, props.defaultChecked ?? false)
  })

  createEffect(() => {
    const element = inputElement()

    if (!element) {
      return
    }

    const registration: AnswerControlRegistration = {
      get disabled() {
        return disabled()
      },
      element,
      id: answerId,
      get ownDisabled() {
        return choiceDisabled()
      },
      type: "choice",
      get value() {
        return props.value
      }
    }

    onCleanup(itemContext.registerAnswerControl(registration))
  })

  createEffect(() => {
    if (controlled()) {
      itemContext.resetVersion
      itemContext.syncControlledAnswerSelection(answerId, Boolean(props.checked))
    }
  })

  createEffect(() => {
    const element = inputElement()

    if (!element) {
      return
    }

    // Keep the native reset target aligned with Questionnaire's owned default,
    // including controlled choices whose checked prop remains authoritative.
    element.defaultChecked = controlled() ? Boolean(props.checked) : (props.defaultChecked ?? false)

    if (itemContext.resetVersion > 0) {
      element.checked = checked()
    }
  })

  const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
    props.onChange?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (!controlled()) {
      itemContext.setAnswerSelectionFromInteraction(answerId, event.currentTarget.checked)
      return
    }

    if (itemContext.status === "skipped" && props.checked === event.currentTarget.checked) {
      itemContext.setAnswerSelectionFromInteraction(answerId, Boolean(props.checked))
    }
  }

  const state: QuestionnaireChoiceState = {
    get checked() {
      return checked()
    },
    get disabled() {
      return disabled()
    },
    get invalid() {
      return itemContext.invalid
    },
    get shortcut() {
      return shortcut()
    },
    get type() {
      return type()
    }
  }

  return {
    inputProps: {
      get "aria-invalid"() {
        return itemContext.invalid || undefined
      },
      get "aria-keyshortcuts"() {
        return getAnswerKeyShortcuts(shortcut(), !disabled() && checked())
      },
      get checked() {
        return checked()
      },
      get disabled() {
        return disabled()
      },
      id: answerId,
      get name() {
        return itemContext.status === "skipped" ? undefined : itemContext.name
      },
      onChange: handleChange,
      ref: setInputElement,
      get required() {
        return itemContext.required && !itemContext.multiple && !itemContext.hasInputAnswer
      },
      get type() {
        return type()
      },
      get value() {
        return props.value
      }
    },
    state
  }
}

// -------------------------------------------------------------------------------------
// use-questionnaire-input
// -------------------------------------------------------------------------------------

type CreateQuestionnaireInputParameters = Pick<
  QuestionnaireInputProps,
  "defaultValue" | "disabled" | "onInput" | "ref" | "type" | "value"
>

function createQuestionnaireInput(props: CreateQuestionnaireInputParameters) {
  const itemContext = useQuestionnaireItemContext("QuestionnaireInput")
  const answerId = createUniqueId()
  const [inputElement, setInputElement] = createSignal<HTMLInputElement | null>(null)
  const initialDefaultFilled = untrack(() => hasInputValue(props.defaultValue))
  const controlled = () => props.value !== undefined
  const defaultFilled = () => hasInputValue(props.defaultValue)
  const controlledFilled = () => hasInputValue(props.value)
  const [uncontrolledFilled, setUncontrolledFilled] = createSignal(initialDefaultFilled)
  const disabled = () => itemContext.disabled || (props.disabled ?? false)
  const filled = () => (controlled() ? controlledFilled() : uncontrolledFilled())
  const selected = () => itemContext.selectedAnswerIds.includes(answerId)

  onMount(() => {
    onCleanup(itemContext.registerAnswerSelection(answerId, initialDefaultFilled))
  })

  createEffect(() => {
    itemContext.setAnswerDefault(answerId, defaultFilled())
  })

  onMount(() => {
    const element = untrack(inputElement)

    // Solid divergence: apply the uncontrolled default value imperatively so
    // the native input keeps owning its text between renders.
    if (element && !untrack(controlled) && props.defaultValue !== undefined) {
      element.value = String(props.defaultValue)
    }
  })

  createEffect(() => {
    const element = inputElement()

    if (!element) {
      return
    }

    const registration: AnswerControlRegistration = {
      get disabled() {
        return disabled()
      },
      element,
      id: answerId,
      type: "input"
    }

    onCleanup(itemContext.registerAnswerControl(registration))
  })

  createEffect(() => {
    if (controlled()) {
      itemContext.resetVersion
      itemContext.syncControlledAnswerSelection(answerId, controlledFilled())
      return
    }

    if (itemContext.resetVersion > 0) {
      setUncontrolledFilled(defaultFilled())
    }
  })

  createEffect(() => {
    const element = inputElement()

    if (!element) {
      return
    }

    // Keep the native reset target aligned with the value Questionnaire owns.
    element.defaultValue = controlled()
      ? String(props.value)
      : props.defaultValue !== undefined
        ? String(props.defaultValue)
        : ""
  })

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    props.onInput?.(event)

    if (event.defaultPrevented) {
      return
    }

    const nextFilled = event.currentTarget.value.trim().length > 0

    if (controlled()) {
      return
    }

    setUncontrolledFilled(nextFilled)
    itemContext.setAnswerSelectionFromInteraction(answerId, nextFilled)
  }

  const setInputRef = (element: HTMLInputElement) => {
    setInputElement(element)
    props.ref?.(element)
  }

  const state: QuestionnaireInputState = {
    get disabled() {
      return disabled()
    },
    get filled() {
      return filled()
    },
    get invalid() {
      return itemContext.invalid
    }
  }

  return {
    inputProps: {
      get "aria-invalid"() {
        return itemContext.invalid || undefined
      },
      get "aria-keyshortcuts"() {
        return getAnswerKeyShortcuts(null, !disabled() && filled() && selected())
      },
      get disabled() {
        return disabled()
      },
      // Detach the input from the form while it is not the selected answer so
      // it never submits stale values.
      get form() {
        return selected() ? undefined : ""
      },
      id: answerId,
      get name() {
        return selected() ? itemContext.name : undefined
      },
      onInput: handleInput,
      ref: setInputRef,
      get type() {
        return props.type ?? "text"
      },
      get value() {
        return controlled() ? String(props.value) : undefined
      }
    },
    state
  }
}

// -------------------------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------------------------

export {
  QuestionnaireChoiceContext,
  QuestionnaireContext,
  QuestionnaireItemContext,
  createQuestionnaireChoice,
  createQuestionnaireInput,
  createQuestionnaireItem,
  createQuestionnaireRoot,
  useQuestionnaire,
  useQuestionnaireChoiceContext,
  useQuestionnaireContext,
  useQuestionnaireItemContext,
  type QuestionnaireActionsProps,
  type QuestionnaireChoiceDescriptionProps,
  type QuestionnaireChoiceInputProps,
  type QuestionnaireChoiceLabelProps,
  type QuestionnaireChoiceProps,
  type QuestionnaireChoiceShortcutProps,
  type QuestionnaireChoicesProps,
  type QuestionnaireDescriptionProps,
  type QuestionnaireErrorProps,
  type QuestionnaireInputProps,
  type QuestionnaireItemProps,
  type QuestionnaireNavigationProps,
  type QuestionnaireNextProps,
  type QuestionnairePreviousProps,
  type QuestionnaireProgressProps,
  type QuestionnaireRootProps,
  type QuestionnaireSkipProps,
  type QuestionnaireSubmitProps,
  type QuestionnaireTitleProps,
  type QuestionnaireChoiceDefinition,
  type QuestionnaireInputType,
  type QuestionnaireItemDefinition,
  type QuestionnaireItemStatus,
  type QuestionnaireRootState,
  type QuestionnaireShortcutMode
}
