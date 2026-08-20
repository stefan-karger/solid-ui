import { Button } from "~/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"

export default function PopoverBasic() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger as={Button<"button">} class="w-fit" variant="outline">
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
