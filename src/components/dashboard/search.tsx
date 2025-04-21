import { TextField, TextFieldInput } from "~/registry/ui/text-field";

export function Search() {
  return (
    <div>
      <TextField>
        <TextFieldInput
          class="md:w-[100px] lg:w-[300px]"
          placeholder="Search..."
          type="search"
        />
      </TextField>
    </div>
  );
}
