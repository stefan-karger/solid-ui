import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/registry/ui/resizable"

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup class="h-[200px] max-w-sm rounded-lg border" orientation="vertical">
      <ResizablePanel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
