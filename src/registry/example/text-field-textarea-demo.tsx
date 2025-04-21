import { TextField, TextFieldTextArea } from "~/registry/ui/text-field";

export default function TextareaDemo() {
  return (
    <TextField>
      <TextFieldTextArea placeholder="Type your message here." />
    </TextField>
  );
}
