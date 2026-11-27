import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

export default function TraceDescriptionDemo() {
  return (
    <Trace class="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="FilePenIcon" />
        </TraceIcon>
        <TraceTitle>
          Edited components/settings/notification-preferences-form.tsx
        </TraceTitle>
        <TraceDescription class="font-mono">+48 −12</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="TerminalIcon" />
        </TraceIcon>
        <TraceTitle>Ran pnpm test</TraceTitle>
        <TraceDescription>14s</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="SearchIcon" />
        </TraceIcon>
        <TraceTitle>Searched for useChat</TraceTitle>
        <TraceDescription>8 results</TraceDescription>
      </TraceLine>
    </Trace>
  )
}
