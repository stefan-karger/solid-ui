import { IconBold, IconItalic, IconUnderline } from "~/components/icons";
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup multiple>
      <ToggleGroupItem aria-label="Bold" value="bold">
        <IconBold class="size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Italic" value="italic">
        <IconItalic class="size-6" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Underline" value="underline">
        <IconUnderline class="size-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
