import { CheckIcon, CreditCardIcon, InfoIcon, MailIcon, SearchIcon, StarIcon } from "lucide-solid"

import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export default function InputGroupIcon() {
  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon class="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Enter your email" type="email" />
        <InputGroupAddon>
          <MailIcon class="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon class="size-4" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon class="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <StarIcon class="size-4" />
          <InfoIcon class="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
