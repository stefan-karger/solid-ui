import { Tabs, TabsList, TabsTrigger } from "~/registry/ui/tabs"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger disabled value="settings">
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
