import { InputGroup, InputGroupAddon, InputGroupButton } from "~/registry/ui/input-group"

export default function InputGroupCustom() {
  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <textarea
          class="min-h-16 w-full flex-1 resize-none border-0 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          data-slot="input-group-control"
          placeholder="Autoresize-style custom control..."
          rows={3}
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
