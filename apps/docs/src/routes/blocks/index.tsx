import { A } from "@solidjs/router"

import { BlockDisplay } from "~/components/block-display"
import { getActiveStyle } from "~/registry/styles"
import { Button } from "~/registry/v1/ui/button"

export const dynamic = "force-static"
export const revalidate = false

// const FEATURED_BLOCKS = ["dashboard-01", "sidebar-07", "sidebar-03", "login-03", "login-04"]
const FEATURED_BLOCKS = ["sidebar-07", "login-01"]

export default function BlocksPage() {
  const activeStyle = getActiveStyle()

  return (
    <div class="flex flex-col gap-12 md:gap-24">
      {FEATURED_BLOCKS.map((name) => (
        <BlockDisplay name={name} styleName={activeStyle.name} />
      ))}
      <div class="container-wrapper">
        <div class="container flex justify-center py-6">
          <Button as={A} href="/blocks/sidebar" variant="outline">
            Browse more blocks
          </Button>
        </div>
      </div>
    </div>
  )
}
