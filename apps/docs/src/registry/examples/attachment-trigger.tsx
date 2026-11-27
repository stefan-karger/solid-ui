import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger
} from "~/registry/ui/attachment"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"

export default function AttachmentTriggerDemo() {
  return (
    <div class="mx-auto w-full max-w-sm py-12">
      <Dialog>
        <Attachment class="w-full">
          <AttachmentMedia>
            <IconPlaceholder lucide="FileSearchIcon" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>research-summary.pdf</AttachmentTitle>
            <AttachmentDescription>Open preview dialog</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Copy link">
              <IconPlaceholder lucide="CopyIcon" />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove research-summary.pdf">
              <IconPlaceholder lucide="XIcon" />
            </AttachmentAction>
          </AttachmentActions>
          <DialogTrigger
            render={(partProps) => (
              <AttachmentTrigger
                {...partProps}
                aria-label="Preview research-summary.pdf"
              />
            )}
          />
        </Attachment>
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>research-summary.pdf</DialogTitle>
            <DialogDescription>
              The attachment trigger fills the card and opens the dialog, while
              the actions stay independently clickable above it.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
