import { ResizableGroup, ResizableHandle, ResizablePanel } from "~/registry/ui/resizable"

export default function ResizableDemo() {
  return (
    <ResizableGroup class="min-h-[200px] max-w-md rounded-lg border">
      <ResizablePanel initialSize={0.25} minSize={0.15}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={0.75}>
        <ResizableGroup orientation="vertical">
          <ResizablePanel initialSize={0.5} minSize={0.2}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Header</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel initialSize={0.5} minSize={0.2}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
    </ResizableGroup>
  )
}
