import { Checkbox } from "~/registry/ui/checkbox";
import { Label } from "~/registry/ui/label";

export default function CheckboxDemo() {
  return (
    <div class="flex items-start space-x-2">
      <Checkbox id="terms1" />
      <div class="grid gap-1.5 leading-none">
        <Label for="terms1-input">Accept terms and conditions</Label>
        <p class="text-muted-foreground text-sm">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
