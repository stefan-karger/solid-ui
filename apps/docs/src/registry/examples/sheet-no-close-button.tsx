import { Button } from "~/registry/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/registry/ui/sheet"

export default function SheetNoCloseButton() {
  return (
    <Sheet>
      <SheetTrigger
        render={(partProps) => <Button {...partProps} variant="outline" />}
      >
        Open Sheet
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No Close Button</SheetTitle>
          <SheetDescription>
            This sheet doesn&apos;t have a close button in the top-right corner.
            Click outside to close.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
