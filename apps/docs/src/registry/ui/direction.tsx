import { getReadingDirection, I18nProvider, useLocale, type Direction } from "@kobalte/core/i18n"
import { type JSX } from "@solidjs/web"
import { createContext, useContext, type Accessor } from "solid-js"

type DirectionProviderProps = {
  children: JSX.Element
  direction?: Direction
  locale?: string
}

const DEFAULT_LTR_LOCALE = "en-US"

const DEFAULT_RTL_LOCALE = "ar"

const DirectionContext = createContext<() => Direction>()

const DirectionProvider = (props: DirectionProviderProps) => {
  const direction = () =>
    props.direction ?? (props.locale ? getReadingDirection(props.locale) : "ltr")
  const locale = () =>
    props.locale ?? (direction() === "rtl" ? DEFAULT_RTL_LOCALE : DEFAULT_LTR_LOCALE)
  return (
    <DirectionContext value={direction}>
      <I18nProvider locale={locale()}>{props.children}</I18nProvider>
    </DirectionContext>
  )
}

const useDirection = (): Accessor<Direction> => {
  const direction = useContext(DirectionContext)
  if (direction) {
    return direction
  }
  return useLocale().direction
}

export { DirectionProvider, type Direction, type DirectionProviderProps, useDirection }
