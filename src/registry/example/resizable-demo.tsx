import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "~/registry/ui/resizable";

export default function ResizableDemo() {
  return (
    <Resizable class="max-w-md rounded-lg border">
      <ResizablePanel class="overflow-hidden" initialSize={0.25}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel class="overflow-hidden" initialSize={0.75}>
        <Resizable orientation="vertical">
          <ResizablePanel class="overflow-hidden" initialSize={0.5}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel class="overflow-hidden" initialSize={0.5}>
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  );
}
