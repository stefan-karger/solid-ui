import { Bubble, BubbleContent, BubbleGroup } from "~/registry/ui/bubble"
import { Toaster, createToaster } from "~/registry/ui/toast"

export default function BubbleLinkButtonDemo() {
  const toast = createToaster()
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <Toaster toaster={toast} />
      <BubbleGroup>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={(partProps) => (
              <button
                {...partProps}
                onClick={() => toast("You clicked forgot password")}
              >
                I forgot my password
              </button>
            )}
          />
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={(partProps) => (
              <button
                {...partProps}
                onClick={() => toast("You clicked help with subscription")}
              >
                I need help with my subscription
              </button>
            )}
          />
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={(partProps) => (
              <button
                {...partProps}
                onClick={() =>
                  toast("You clicked something else. Talk to a human.")
                }
              >
                Something else. Talk to a human.
              </button>
            )}
          />
        </Bubble>
      </BubbleGroup>
    </div>
  )
}
