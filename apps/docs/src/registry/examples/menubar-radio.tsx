import { createSignal } from "solid-js"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger
} from "~/registry/ui/menubar"

export default function MenubarRadio() {
  const [user, setUser] = createSignal("benoit")
  const [theme, setTheme] = createSignal("system")

  return (
    <Menubar class="w-72">
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup onChange={setUser} value={user()}>
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Theme</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup onChange={setTheme} value={theme()}>
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="system">System</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
