import {
  IconBrandApple,
  IconBrandPaypal,
  IconCreditCard,
} from "~/components/icons";
import { Button } from "~/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { Label } from "~/registry/ui/label";
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/registry/ui/select";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/registry/ui/text-field";

export function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <RadioGroup class="grid grid-cols-3 gap-4" defaultValue="card">
          <div>
            <RadioGroupItem class="peer sr-only" id="card" value="card" />
            <Label
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[checked]:border-primary"
              html-for="card"
            >
              <IconCreditCard class="mb-3 size-6" />
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem class="peer sr-only" id="paypal" value="paypal" />
            <Label
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[checked]:border-primary"
              html-for="paypal"
            >
              <IconBrandPaypal class="mb-3 size-6" />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem class="peer sr-only" id="apple" value="apple" />
            <Label
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[checked]:border-primary"
              html-for="apple"
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
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
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
                "December",
              ]}
              placeholder="Month"
            >
              <SelectTrigger id="month">
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
          <div class="grid gap-2">
            <Label html-for="year">Year</Label>
            <Select
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
              options={Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() + i,
              )}
              placeholder="Year"
            >
              <SelectTrigger id="year">
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
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
  );
}
