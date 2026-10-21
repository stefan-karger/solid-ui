import { AppWindowIcon, CodeIcon } from "lucide-solid"

import { Tabs, TabsList, TabsTrigger } from "~/registry/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
