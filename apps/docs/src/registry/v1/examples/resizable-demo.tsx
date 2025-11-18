import { Resizable, ResizableHandle, ResizablePanel } from "~/registry/v1/ui/resizable"

export default function ResizableDemo() {
  return (
    <Resizable class="max-w-md rounded-lg border md:min-w-[450px]" orientation="horizontal">
      <ResizablePanel initialSize={0.5}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel initialSize={0.5}>
        <Resizable orientation="vertical">
          <ResizablePanel initialSize={0.25}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel initialSize={0.75}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  )
}
