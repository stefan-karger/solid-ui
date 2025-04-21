import { createSignal } from "solid-js";

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
  TextFieldTextArea,
} from "~/registry/ui/text-field";

export function ReportAnIssue() {
  const [area, setArea] = createSignal();
  const [secLevel, setSecLevel] = createSignal();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an issue</CardTitle>
        <CardDescription>
          What area are you having problems with?
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="area">Area</Label>
            <Select
              defaultValue={"Billing"}
              id="area"
              itemComponent={(props) => (
                <SelectItem item={props.item}>
                  {props.item.textValue}
                </SelectItem>
              )}
              onChange={setArea}
              options={["Team", "Billing", "Accounts", "Deployments"]}
              value={area()}
            >
              <SelectTrigger aria-label="billing" class="flex-1">
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
          <div class="grid gap-2">
            <Label for="security-level">Security Level</Label>
            <Select
              defaultValue={"Level 2"}
              id="security-level"
              itemComponent={(props) => (
                <SelectItem item={props.item}>
                  {props.item.textValue}
                </SelectItem>
              )}
              onChange={setSecLevel}
              options={[
                "Level 1(lowest)",
                "Level 2",
                "Level 3",
                "Level 4",
                "Level 5(💀)",
              ]}
              value={secLevel()}
            >
              <SelectTrigger aria-label="security level" class="flex-1">
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="subject">Subject</Label>
          <TextField>
            <TextFieldInput
              id="subject"
              placeholder="I need help with..."
              type="text"
            />
          </TextField>
        </div>
        <div class="grid gap-2">
          <Label for="description">Description</Label>
          <TextField>
            <TextFieldTextArea
              id="description"
              placeholder="Please include all information relevant to your issue."
            />
          </TextField>
        </div>
      </CardContent>
      <CardFooter class="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
