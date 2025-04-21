import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/stefan-karger.png" />
      <AvatarFallback>EK</AvatarFallback>
    </Avatar>
  );
}
