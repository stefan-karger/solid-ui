import { Kbd, KbdGroup } from "~/registry/ui/kbd"

export default function KbdGroupExample() {
  return (
    <div class="flex flex-col items-center gap-4">
      <p class="text-muted-foreground text-sm">
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  )
}
