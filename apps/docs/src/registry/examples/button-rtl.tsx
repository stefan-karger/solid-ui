import { useLocale } from "@kobalte/core/i18n"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonRtl() {
  const locale = useLocale()

  return (
    <div class="flex flex-wrap items-center gap-2" data-provider-direction={locale.direction()}>
      <Button variant="outline">
        <ArrowLeftIcon data-icon="inline-start" />
        Previous
      </Button>
      <Button>
        Next
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}
