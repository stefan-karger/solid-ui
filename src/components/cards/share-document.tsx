import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar";
import { Button } from "~/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/registry/ui/select";
import { Separator } from "~/registry/ui/separator";
import { TextField, TextFieldInput } from "~/registry/ui/text-field";

export function ShareDocument() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex space-x-2">
          <TextField>
            <TextFieldInput
              readOnly
              type="text"
              value="http://example.com/link/to/document"
            />
          </TextField>
          <Button class="shrink-0" variant="secondary">
            Copy Link
          </Button>
        </div>
        <Separator class="my-4" />
        <div class="space-y-4">
          <h4 class="font-medium text-sm">People with access</h4>
          <div class="grid gap-6">
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p class="font-medium text-sm leading-none">Olivia Martin</p>
                  <p class="text-muted-foreground text-sm">m@example.com</p>
                </div>
              </div>
              <Select
                defaultValue="Can edit"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
                options={["Can edit", "Can view"]}
                placeholder="Select"
              >
                <SelectTrigger class="ml-auto w-[110px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/05.png" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div>
                  <p class="font-medium text-sm leading-none">
                    Isabella Nguyen
                  </p>
                  <p class="text-muted-foreground text-sm">b@example.com</p>
                </div>
              </div>
              <Select
                defaultValue="Can view"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
                options={["Can edit", "Can view"]}
                placeholder="Select"
              >
                <SelectTrigger class="ml-auto w-[110px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div>
                  <p class="font-medium text-sm leading-none">Sofia Davis</p>
                  <p class="text-muted-foreground text-sm">p@example.com</p>
                </div>
              </div>
              <Select
                defaultValue="Can view"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
                options={["Can edit", "Can view"]}
                placeholder="Select"
              >
                <SelectTrigger class="ml-auto w-[110px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
