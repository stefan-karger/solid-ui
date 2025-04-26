import { For } from "solid-js"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

import { mails } from "./data"
import { mail, setMail } from "./use-mail"

interface MailListProps {
  type: "all" | "unread"
}

export function MailList(props: MailListProps) {
  return (
    <div class="flex h-[600px] flex-col gap-2 overflow-auto p-4 pt-0">
      <For each={props.type === "all" ? mails : mails.filter((v) => !v.read)}>
        {(item) => (
          <button
            type="button"
            class={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id
              })
            }
          >
            <div class="flex w-full flex-col gap-1">
              <div class="flex items-center">
                <div class="flex items-center gap-2">
                  <div class="font-semibold">{item.name}</div>
                  {!item.read && <span class="flex size-2 rounded-full bg-blue-600" />}
                </div>
                <div
                  class={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {timeAgo(new Date(item.date))}
                </div>
              </div>
              <div class="text-xs font-medium">{item.subject}</div>
            </div>
            <div class="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div class="flex items-center gap-2">
                <For each={item.labels}>
                  {(label) => (
                    <Badge variant={label === "work" ? "default" : "secondary"}>{label}</Badge>
                  )}
                </For>
              </div>
            ) : null}
          </button>
        )}
      </For>
    </div>
  )
}

function timeAgo(value: Date) {
  const seconds = Math.floor((new Date().getTime() - value.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  let interval
  interval = seconds / 31536000
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "year")
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "month")
  }
  interval = seconds / 86400
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "day")
  }
  interval = seconds / 3600
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "hour")
  }
  interval = seconds / 60
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "minute")
  }
  return rtf.format(-Math.floor(interval), "second")
}
