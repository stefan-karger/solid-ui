import { Cards } from "~/components/cards";
import { MetaTags } from "~/components/meta-tags";

export default function CardsRoute() {
  return (
    <>
      <MetaTags
        description="Examples of cards built using the components."
        title="Cards"
      />
      <Cards />
    </>
  );
}
