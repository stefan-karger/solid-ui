import { Resizable, ResizableHandle, ResizablePanel } from "@/registry/ui/resizable"

export default function ResizableDemo() {
  return (
    <Resizable class="max-w-md rounded-lg border">
      <ResizablePanel initialSize={0.25} class="overflow-hidden">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel initialSize={0.75} class="overflow-hidden">
        <Resizable orientation="vertical">
          <ResizablePanel initialSize={0.5} class="overflow-hidden">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel initialSize={0.5} class="overflow-hidden">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  )
}
