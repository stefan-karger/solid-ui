import { Timeline } from "~/registry/ui/timeline";

export default function TimelineDemo() {
  return (
    <Timeline
      activeItem={1}
      items={[
        {
          description: "This is the first event of the timeline.",
          title: "Event #1",
        },
        {
          description: "This is the second event of the timeline.",
          title: "Event #2",
        },
        {
          description: "This is the third event of the timeline.",
          title: "Event #3",
        },
      ]}
    />
  );
}
