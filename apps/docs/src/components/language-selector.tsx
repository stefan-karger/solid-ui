import {
  type Accessor,
  createContext,
  createMemo,
  createSignal,
  type JSX,
  type Setter,
  useContext
} from "solid-js"

import { cn } from "~/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

export type Language = "en" | "ar" | "he"

export type Direction = "ltr" | "rtl"

export type Translations<T extends Record<string, string> = Record<string, string>> = Record<
  Language,
  {
    dir: Direction
    locale?: string
    values: T
  }
>

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic (العربية)" },
  { value: "he", label: "Hebrew (עברית)" }
] as const

type LanguageOption = (typeof languageOptions)[number]

type LanguageContextType = {
  language: Accessor<Language>
  setLanguage: Setter<Language>
}

const LanguageContext = createContext<LanguageContextType>()

interface LanguageProviderProps {
  children: JSX.Element
  defaultLanguage?: Language
}

const LanguageProvider = (props: LanguageProviderProps) => {
  const [language, setLanguage] = createSignal<Language>(props.defaultLanguage ?? "ar")

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}

const useLanguageContext = () => {
  return useContext(LanguageContext)
}

const useTranslation = <T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ar"
) => {
  const context = useLanguageContext()

  const [localLanguage, setLocalLanguage] = createSignal<Language>(defaultLanguage)

  const language = createMemo<Language>(() => {
    return context?.language() ?? localLanguage()
  })

  const setLanguage = (language: Language) => {
    if (context) {
      context.setLanguage(language)
      return
    }

    setLocalLanguage(language)
  }

  const translation = createMemo(() => {
    return translations[language()]
  })

  const dir = createMemo(() => translation().dir)
  const locale = createMemo(() => translation().locale)
  const t = createMemo(() => translation().values)

  return {
    language,
    setLanguage,
    dir,
    locale,
    t
  }
}

export interface LanguageSelectorProps {
  value: Language
  onValueChange: (value: Language) => void
  class?: string
  languages?: Language[]
}

const defaultLanguages: Language[] = ["en", "ar", "he"]

const LanguageSelector = (props: LanguageSelectorProps) => {
  const options = createMemo(() => {
    const languages = props.languages ?? defaultLanguages

    return languageOptions.filter((option) => languages.includes(option.value))
  })

  const selectedOption = createMemo(() => {
    return options().find((option) => option.value === props.value)
  })

  return (
    <Select<LanguageOption>
      itemComponent={(itemProps) => (
        <SelectItem item={itemProps.item}>{itemProps.item.rawValue.label}</SelectItem>
      )}
      onChange={(option) => {
        if (option) {
          props.onValueChange(option.value)
        }
      }}
      options={options()}
      optionTextValue="label"
      optionValue="value"
      value={selectedOption()}
    >
      <SelectTrigger
        class={cn("w-36", props.class)}
        data-name="language-selector"
        dir="ltr"
        size="sm"
      >
        <SelectValue<LanguageOption>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>

      <SelectContent class="data-closed:animate-none data-expanded:animate-none" dir="ltr" />
    </Select>
  )
}

export { LanguageProvider, LanguageSelector, useLanguageContext, useTranslation }
