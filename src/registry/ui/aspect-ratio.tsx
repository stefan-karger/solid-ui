import type { Component, ComponentProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

type AspectRatioProps = ComponentProps<"div"> & { ratio?: number };

const AspectRatio: Component<AspectRatioProps> = (rawProps) => {
  const props = mergeProps({ ratio: 1 / 1 }, rawProps);
  const [local, others] = splitProps(props, ["ratio"]);
  return (
    <div
      style={{
        "padding-bottom": `${100 / local.ratio}%`,
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
        {...others}
      />
    </div>
  );
};

export { AspectRatio };
