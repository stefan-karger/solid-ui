import { type Component, type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const NativeSelect: Component<ComponentProps<"select">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        class={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed dark:bg-input/30 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          local.class
        )}
        data-slot="native-select"
        {...other}
      />
      <svg
        aria-hidden="true"
        class="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3.5 size-4 select-none text-muted-foreground opacity-50"
        data-slot="native-select-icon"
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

const NativeSelectOption: Component<ComponentProps<"option">> = (props) => {
  return <option data-slot="native-select-option" {...props} />
}

const NativeSelectOptGroup: Component<ComponentProps<"optgroup">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return <optgroup class={cn(local.class)} data-slot="native-select-optgroup" {...other} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
