import { Button } from "~/registry/ui/button"
import { Checkbox } from "~/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"
import { Textarea } from "~/registry/ui/textarea"

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const years = ["2024", "2025", "2026", "2027", "2028", "2029"]

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
                <FieldLabel for="checkout-card-name">Name on Card</FieldLabel>
                <Input id="checkout-card-name" placeholder="Evil Rabbit" required />
              </Field>
              <Field>
                <FieldLabel for="checkout-card-number">Card Number</FieldLabel>
                <Input id="checkout-card-number" placeholder="1234 5678 9012 3456" required />
                <FieldDescription>Enter your 16-digit card number</FieldDescription>
              </Field>
              <div class="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel for="checkout-exp-month">Month</FieldLabel>
                  <Select<string>
                    options={months}
                    placeholder="MM"
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                  >
                    <SelectTrigger class="w-full" id="checkout-exp-month">
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-exp-year">Year</FieldLabel>
                  <Select<string>
                    options={years}
                    placeholder="YYYY"
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                  >
                    <SelectTrigger class="w-full" id="checkout-exp-year">
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-cvv">CVV</FieldLabel>
                  <Input id="checkout-cvv" placeholder="123" required />
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
                <Checkbox id="checkout-same-as-shipping" defaultChecked />
                <FieldLabel class="font-normal" for="checkout-same-as-shipping">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-comments">Comments</FieldLabel>
                <Textarea
                  class="resize-none"
                  id="checkout-comments"
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
