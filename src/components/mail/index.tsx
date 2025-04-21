import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";

import { cn } from "~/lib/utils";
import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "~/registry/ui/resizable";
import { Separator } from "~/registry/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs";
import { TextField, TextFieldInput } from "~/registry/ui/text-field";

import {
  IconArchive,
  IconFile,
  IconInbox,
  IconMessages,
  IconSend,
  IconShoppingCart,
  IconTrash,
  IconUpdates,
  IconUsers,
} from "../icons";
import { AccountSwitcher } from "./account-switcher";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";

export function Mail() {
  const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
    name: "resizable-sizes",
    storage: cookieStorage,
    storageOptions: {
      path: "/",
    },
  });

  const [isCollapsed, setIsCollapsed] = createSignal(false);

  return (
    <Resizable onSizesChange={setSizes} sizes={sizes()}>
      <ResizablePanel
        class={cn(
          isCollapsed() &&
            "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
        collapsible
        initialSize={sizes()[0] ?? 0.2}
        maxSize={0.2}
        minSize={0.1}
        onCollapse={(e) => {
          setIsCollapsed(e === 0), console.log("collapse", e);
        }}
        onExpand={() => {
          setIsCollapsed(false), console.log("expand");
        }}
      >
        <AccountSwitcher isCollapsed={isCollapsed()} />
        <Separator />
        <Nav
          isCollapsed={isCollapsed()}
          links={[
            {
              icon: IconInbox,
              label: "128",
              title: "Inbox",
              variant: "default",
            },
            {
              icon: IconFile,
              label: "9",
              title: "Drafts",
              variant: "ghost",
            },
            {
              icon: IconSend,
              label: "",
              title: "Sent",
              variant: "ghost",
            },
            {
              icon: IconTrash,
              label: "23",
              title: "Trash",
              variant: "ghost",
            },
            {
              icon: IconArchive,
              label: "",
              title: "Archive",
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed()}
          links={[
            {
              icon: IconUsers,
              label: "972",
              title: "Social",
              variant: "ghost",
            },
            {
              icon: IconUpdates,
              label: "342",
              title: "Updates",
              variant: "ghost",
            },
            {
              icon: IconMessages,
              label: "128",
              title: "Forums",
              variant: "ghost",
            },
            {
              icon: IconShoppingCart,
              label: "8",
              title: "Shopping",
              variant: "ghost",
            },
            {
              icon: IconArchive,
              label: "21",
              title: "Promotions",
              variant: "ghost",
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={sizes()[1] ?? 0.4} minSize={0.3}>
        <Tabs defaultValue="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="font-bold text-xl">Inbox</h1>
            <TabsList class="ml-auto">
              <TabsTrigger class="text-zinc-600 dark:text-zinc-200" value="all">
                All mail
              </TabsTrigger>
              <TabsTrigger
                class="text-zinc-600 dark:text-zinc-200"
                value="unread"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="p-4">
            <TextField class="relative">
              <svg
                class="absolute top-2.5 left-2 size-4 text-muted-foreground"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Search</title>
                <path
                  d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <TextFieldInput class="pl-8" placeholder="Search" type="text" />
            </TextField>
          </div>
          <TabsContent class="m-0" value="all">
            <MailList type="all" />
          </TabsContent>
          <TabsContent class="m-0" value="unread">
            <MailList type="unread" />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={sizes()[2] ?? 0.4} minSize={0.3}>
        <MailDisplay />
      </ResizablePanel>
    </Resizable>
  );
}
