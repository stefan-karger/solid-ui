import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/registry/ui/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      class="max-w-sm rounded-lg border"
    >
      <ResizablePanel>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
