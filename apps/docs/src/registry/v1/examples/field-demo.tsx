import { Button } from "~/registry/v1/ui/button"
import { Checkbox } from "~/registry/v1/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from "~/registry/v1/ui/field"
import { Input } from "~/registry/v1/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/v1/ui/select"
import { Textarea } from "~/registry/v1/ui/textarea"

export default function FieldDemo() {
  return (
    <div class="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-7j9-card-name-43j">Name on Card</FieldLabel>
                <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" required />
              </Field>
              <Field>
                <FieldLabel for="checkout-7j9-card-number-uw1">Card Number</FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>Enter your 16-digit card number</FieldDescription>
              </Field>
              <div class="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel for="checkout-exp-month-ts6">Month</FieldLabel>
                  <Select
                    defaultValue=""
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    placeholder="MM"
                  >
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-7j9-exp-year-f59">Year</FieldLabel>
                  <Select
                    defaultValue=""
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                    options={[2024, 2025, 2026, 2027, 2028, 2029]}
                    placeholder="YYYY"
                  >
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox defaultChecked id="checkout-7j9-same-as-shipping-wgm" />
                <FieldLabel class="font-normal" for="checkout-7j9-same-as-shipping-wgm">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-7j9-optional-comments">Comments</FieldLabel>
                <Textarea
                  class="resize-none"
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
