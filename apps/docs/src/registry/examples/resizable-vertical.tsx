import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "~/registry/ui/resizable"

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      class="min-h-[200px] max-w-sm rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize panels" />
      <ResizablePanel defaultSize={75}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
