import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/registry/ui/switch";

export default function SwitchDemo() {
  return (
    <Switch class="flex items-center space-x-2">
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Airplane Mode</SwitchLabel>
    </Switch>
  );
}
