import { createSignal } from "solid-js";

import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/registry/ui/select";

import { type Account, accounts } from "./data";

interface AccountSwitcherProps {
  isCollapsed: boolean;
}

export function AccountSwitcher(props: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = createSignal(accounts[0]);

  return (
    <Select
      class={cn("flex h-[56px] items-center justify-center px-2")}
      disallowEmptySelection
      itemComponent={(props) => (
        <SelectItem item={props.item}>
          <div class="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
            {props.item.rawValue.icon}
            {props.item.rawValue.email}
          </div>
        </SelectItem>
      )}
      onChange={setSelectedAccount}
      options={accounts}
      optionTextValue="label"
      optionValue="email"
      placeholder="Select an account"
      placement="bottom-start"
      value={selectedAccount()}
    >
      <SelectTrigger
        aria-label="Select account"
        class={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
          props.isCollapsed &&
            "flex size-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
        )}
      >
        <SelectValue<Account>>
          {(state) => (
            <>
              {state.selectedOption().icon}
              <div class={cn("ml-2", props.isCollapsed && "hidden")}>
                {state.selectedOption().label}
              </div>
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
}
