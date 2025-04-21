import { createSignal } from "solid-js";

import { Button } from "~/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/registry/ui/dropdown-menu";

export default function DropdownMenuDemo() {
  const [showGitLog, setShowGitLog] = createSignal(false);
  const [showHistory, setShowHistory] = createSignal(false);
  const [branch, setBranch] = createSignal("develop");

  return (
    <div class="flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger as={Button<"button">}>
          Git Settings
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-48">
          <DropdownMenuItem>
            <span>Commit</span>
            <DropdownMenuShortcut>⌘+K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Push</span>
            <DropdownMenuShortcut>⇧+⌘+K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Update Project</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub overlap>
            <DropdownMenuSubTrigger>GitHub</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Create Pull Request…</DropdownMenuItem>
                <DropdownMenuItem>View Pull Requests</DropdownMenuItem>
                <DropdownMenuItem>Sync Fork</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Open on GitHub</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showGitLog()}
            onChange={setShowGitLog}
          >
            Show Git Log
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showHistory()}
            onChange={setShowHistory}
          >
            Show History
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Branches</DropdownMenuGroupLabel>
            <DropdownMenuRadioGroup onChange={setBranch} value={branch()}>
              <DropdownMenuRadioItem value="main">main</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="develop">
                develop
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <p class="pt-2 text-gray-500 text-sm">
        Show Git Log: {showGitLog() ? "yes" : "no"}
      </p>
      <p class="pt-2 text-gray-500 text-sm">
        Show History: {showHistory() ? "yes" : "no"}
      </p>
      <p class="pt-2 text-gray-500 text-sm">Selected Branch: {branch()}</p>
    </div>
  );
}
