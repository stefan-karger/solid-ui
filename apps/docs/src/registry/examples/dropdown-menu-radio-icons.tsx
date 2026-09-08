import { Building2Icon, CreditCardIcon, WalletIcon } from "lucide-solid"
import { createSignal } from "solid-js"

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
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Payment Method
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
          <DropdownMenuRadioGroup onChange={setPaymentMethod} value={paymentMethod()}>
            <DropdownMenuRadioItem value="card">
              <CreditCardIcon class="size-4" />
              Credit Card
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <WalletIcon class="size-4" />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <Building2Icon class="size-4" />
              Bank Transfer
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
