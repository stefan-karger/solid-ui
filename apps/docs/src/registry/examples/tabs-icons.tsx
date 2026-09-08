import { CodeIcon, SearchIcon } from "lucide-solid"

import { Tabs, TabsList, TabsTrigger } from "~/registry/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <SearchIcon class="size-4" />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon class="size-4" />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
