import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Tabs, TabsList, TabsTrigger } from "~/registry/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <IconPlaceholder lucide="SearchIcon" class="size-4" />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <IconPlaceholder lucide="CodeIcon" class="size-4" />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
