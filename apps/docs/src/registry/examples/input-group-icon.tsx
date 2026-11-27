import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "~/registry/ui/input-group"

export default function InputGroupIcon() {
  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <IconPlaceholder lucide="SearchIcon" class="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Enter your email" type="email" />
        <InputGroupAddon>
          <IconPlaceholder lucide="MailIcon" class="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <IconPlaceholder lucide="CreditCardIcon" class="size-4" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <IconPlaceholder lucide="CheckIcon" class="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <IconPlaceholder lucide="StarIcon" class="size-4" />
          <IconPlaceholder lucide="InfoIcon" class="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
