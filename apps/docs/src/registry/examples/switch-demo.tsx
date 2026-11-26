import { Label } from "~/registry/ui/label"
import { Switch } from "~/registry/ui/switch"

export default function SwitchDemo() {
  return (
    <div class="flex items-center gap-2">
      <Switch id="switch-airplane-mode" />
      <Label for="switch-airplane-mode">Airplane Mode</Label>
    </div>
  )
}
