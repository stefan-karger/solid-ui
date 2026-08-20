import {
  type Accessor,
  createContext,
  createSignal,
  type ParentProps,
  untrack,
  useContext
} from "solid-js"

export const COLOR_MODE_COOKIE_KEY = "theme-color-mode"

export type ColorMode = "light" | "dark"

export type ColorModeContextValue = {
  colorMode: Accessor<ColorMode>
  toggleColorMode: () => void
  setColorMode: (mode: ColorMode) => void
}

export const ColorModeContext = createContext<ColorModeContextValue>()

export function ColorModeProvider(
  props: ParentProps<{
    initialColorMode: ColorMode
  }>
) {
  const [colorMode, setColorMode] = createSignal<ColorMode>(props.initialColorMode)

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "dark" ? "light" : "dark"))

    // Update the HTML element class
    const html = document.documentElement
    html.classList.remove("light", "dark")
    html.classList.add(untrack(colorMode))

    // Set the cookie
    // biome-ignore lint/suspicious/noDocumentCookie: <TODO: find a better way to do this>
    document.cookie = `${COLOR_MODE_COOKIE_KEY}=${untrack(colorMode)}; path=/; max-age=31536000; SameSite=Lax`
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, setColorMode }}>
      {props.children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode(): ColorModeContextValue {
  const context = useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}

export const getClientColorMode = () =>
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COLOR_MODE_COOKIE_KEY}=`))
    ?.split("=")[1] ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
