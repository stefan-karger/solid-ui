import { Separator } from "~/registry/ui/separator"

export default function SeparatorDemo() {
  return (
    <div class="flex max-w-sm flex-col gap-4 text-sm">
      <div class="flex flex-col gap-1.5">
        <div class="font-medium leading-none">solid-ui</div>
        <div class="text-muted-foreground">Beautifully designed components for SolidJS</div>
      </div>
      <Separator />
      <div>
        A set of beautifully designed components that you can customize, extend, and build on.
      </div>
    </div>
  )
}
