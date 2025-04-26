import { IconBold, IconItalic, IconUnderline } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup multiple>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <IconBold class="size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <IconItalic class="size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <IconUnderline class="size-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
