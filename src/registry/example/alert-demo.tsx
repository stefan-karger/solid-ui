import { IconTerminal } from "~/components/icons";
import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert";

export default function AlertDemo() {
  return (
    <Alert>
      <IconTerminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
