import { Card } from "~/registry/ui/card";
import { Flex } from "~/registry/ui/flex";

export default function FlexDemo() {
  return (
    <Card class="w-full max-w-xs p-6">
      <Flex>
        <div>
          <p class="font-normal text-card-foreground/70 text-sm">
            Tickets sold
          </p>
          <p class="font-semibold text-3xl text-card-foreground">9,876</p>
        </div>
        <div>
          <p class="font-normal text-card-foreground/70 text-sm">
            Average Selling Price
          </p>
          <p class="font-semibold text-3xl text-card-foreground">$ 175.20</p>
        </div>
      </Flex>
    </Card>
  );
}
