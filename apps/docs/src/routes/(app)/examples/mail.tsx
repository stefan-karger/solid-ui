import { Mail } from "@/components/mail"
import { MetaTags } from "@/components/meta-tags"

export default function CardsRoute() {
  return (
    <>
      <MetaTags title="Mail" description="Examples of a mailing app built using the components." />
      <Mail />
    </>
  )
}
