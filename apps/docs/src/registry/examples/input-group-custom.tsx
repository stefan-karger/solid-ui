import { InputGroup, InputGroupAddon, InputGroupButton } from "~/registry/ui/input-group"

export default function InputGroupCustom() {
  const resize = (event: InputEvent & { currentTarget: HTMLTextAreaElement }) => {
    const textarea = event.currentTarget
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <textarea
          class="field-sizing-content flex min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none transition-[color,box-shadow] md:text-sm"
          data-slot="input-group-control"
          onInput={resize}
          placeholder="Autoresize textarea..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton class="ml-auto" size="sm" variant="default">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
