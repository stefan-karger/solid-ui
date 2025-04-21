import { Show } from "solid-js";

import { IconMoon, IconSun } from "~/components/icons";
import { Toggle } from "~/registry/ui/toggle";

export default function ToggleDemo() {
  return (
    <Toggle>
      {(state) => (
        <Show fallback={<IconMoon class="size-6" />} when={state.pressed()}>
          <IconSun class="size-6" />
        </Show>
      )}
    </Toggle>
  );
}
