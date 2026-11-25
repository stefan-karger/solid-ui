import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter
} from "~/registry/ui/message"
export default function MessageDemo() {
  return (
    <MessageGroup class="max-w-md">
      <Message>
        <MessageAvatar aria-label="Alex">AL</MessageAvatar>
        <MessageContent>
          <MessageHeader>Alex</MessageHeader>
          <Bubble>
            <BubbleContent>
              The new components are ready to review.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <time datetime="2026-11-17T10:30:00Z">10:30</time>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar aria-label="You">YO</MessageAvatar>
        <MessageContent>
          <Bubble align="end" variant="secondary">
            <BubbleContent>I'll check the keyboard interactions.</BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
