import { Kbd, KbdGroup } from "~/registry/ui/kbd"

export default function KbdDemo() {
  return (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <span class="text-sm">Save:</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm">Copy:</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm">Paste:</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>V</Kbd>
        </KbdGroup>
      </div>
    </div>
  )
}
