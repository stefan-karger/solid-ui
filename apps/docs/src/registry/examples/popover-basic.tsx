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
    <Popover>
      <PopoverTrigger render={(partProps) => <Button {...partProps} variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
