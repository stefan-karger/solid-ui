import { Cards } from "@/components/cards"
import { MetaTags } from "@/components/meta-tags"

export default function CardsRoute() {
  return (
    <>
      <MetaTags title="Cards" description="Examples of cards built using the components." />
      <Cards />
    </>
  )
}
