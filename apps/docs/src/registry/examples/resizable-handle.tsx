import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/registry/ui/resizable"

export default function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup class="min-h-[200px] max-w-sm rounded-lg border" orientation="horizontal">
      <ResizablePanel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
