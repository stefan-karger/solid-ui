import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuRadioIcons() {
  const [paymentMethod, setPaymentMethod] = createSignal("card")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(partProps) => <Button {...partProps} variant="outline" />}
        class="w-fit"
      >
        Payment Method
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={setPaymentMethod}
            value={paymentMethod()}
          >
            <DropdownMenuRadioItem value="card">
              <IconPlaceholder lucide="CreditCardIcon" class="size-4" />
              Credit Card
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <IconPlaceholder lucide="WalletIcon" class="size-4" />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <IconPlaceholder lucide="BuildingComplexIcon" class="size-4" />
              Bank Transfer
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
