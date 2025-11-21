import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createAsync, query, useParams } from "@solidjs/router";

import { getRegistryComponent, getRegistryItem } from "~/lib/registry";
import { cn } from "~/lib/utils";
import { getStyle, type Style } from "~/registry/styles";

const getCachedRegistryItem = query(
  async (name: string, styleName: Style["name"]) => {
    return await getRegistryItem(name, styleName);
  },
  "registryItem",
);

export default function BlockPage() {
  const params = useParams();

  const style = getStyle(params.style);

  if (!style) {
    return <div>Not Found</div>;
  }

  const item = createAsync(() =>
    getCachedRegistryItem(params.name, style.name),
  );

  const Component = getRegistryComponent(params.name, style.name);

  return (
    <Show when={item()}>
      {(data) => (
        <div class={cn("bg-background", data().meta?.container)}>
          <Dynamic component={Component} />
        </div>
      )}
    </Show>
  );
}
