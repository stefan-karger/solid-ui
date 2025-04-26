import { IconBrandApple, IconBrandPaypal, IconCreditCard } from "@/components/icons"
import { Button } from "@/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/registry/ui/card"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { TextField, TextFieldInput, TextFieldLabel } from "@/registry/ui/text-field"

export function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <RadioGroup defaultValue="card" class="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" class="peer sr-only" />
            <Label
              html-for="card"
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[checked]:border-primary"
            >
              <IconCreditCard class="mb-3 size-6" />
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem value="paypal" id="paypal" class="peer sr-only" />
            <Label
              html-for="paypal"
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[checked]:border-primary"
            >
              <IconBrandPaypal class="mb-3 size-6" />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem value="apple" id="apple" class="peer sr-only" />
            <Label
              html-for="apple"
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[checked]:border-primary"
            >
              <IconBrandApple class="mb-3 size-6" />
              Apple
            </Label>
          </div>
        </RadioGroup>
        <TextField class="grid gap-2">
          <TextFieldLabel>Name</TextFieldLabel>
          <TextFieldInput placeholder="First Last" type="text" />
        </TextField>
        <TextField class="grid gap-2">
          <TextFieldLabel>Card number</TextFieldLabel>
          <TextFieldInput placeholder="" type="text" />
        </TextField>
        <div class="grid grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label html-for="month">Expires</Label>
            <Select
              options={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "April",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
              ]}
              placeholder="Month"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <SelectTrigger id="month">
                <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
          <div class="grid gap-2">
            <Label html-for="year">Year</Label>
            <Select
              options={Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i)}
              placeholder="Year"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <SelectTrigger id="year">
                <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
          <TextField class="grid gap-2">
            <TextFieldLabel>CVC</TextFieldLabel>
            <TextFieldInput placeholder="CVC" type="text" />
          </TextField>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Continue</Button>
      </CardFooter>
    </Card>
  )
}
