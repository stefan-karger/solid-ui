import { Button } from "~/registry/v1/ui/button"
import { Input } from "~/registry/v1/ui/input"
import { Label } from "~/registry/v1/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/v1/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <Button as={PopoverTrigger} variant="outline">
        Open popover
      </Button>

      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="width">Width</Label>
              <Input class="col-span-2 h-8" id="width" value="100%" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="maxWidth">Max. width</Label>
              <Input class="col-span-2 h-8" id="maxWidth" value="300px" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="height">Height</Label>
              <Input class="col-span-2 h-8" id="height" value="25px" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="maxHeight">Max. height</Label>
              <Input class="col-span-2 h-8" id="maxHeight" value="none" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
