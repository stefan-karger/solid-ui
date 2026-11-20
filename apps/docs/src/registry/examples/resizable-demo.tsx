import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "~/registry/ui/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      class="h-[200px] max-w-sm rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle aria-label="Resize files" />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={25}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle aria-label="Resize editor panels" />
          <ResizablePanel defaultSize={75}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
