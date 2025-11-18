import { createSignal, onMount } from "solid-js"
import { A } from "@solidjs/router"

import { IconBrandGithub } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"

const FALLBACK_STAR_COUNT = 1250

async function getGithubStarCount() {
  try {
    const res = await fetch("https://ungh.cc/repos/stefan-karger/solid-ui")
    const data = await res.json()
    return data.repo?.stars ?? FALLBACK_STAR_COUNT
  } catch {
    return FALLBACK_STAR_COUNT
  }
}

export function GitHubLink() {
  const [stars, setStars] = createSignal(FALLBACK_STAR_COUNT)

  onMount(async () => {
    const count = await getGithubStarCount()
    setStars(count)
  })

  const beautify = () =>
    stars() >= 1000 ? `${(stars() / 1000).toFixed(1)}k` : stars().toLocaleString()

  return (
    <Button
      as={A}
      class="h-8 shadow-none"
      href={"https://github.com/stefan-karger/solid-ui"}
      rel="noreferrer"
      size="sm"
      target="_blank"
      variant="ghost"
    >
      <span class="flex items-center gap-2">
        <IconBrandGithub />
        <span class="text-muted-foreground text-xs tabular-nums">{beautify()}</span>
      </span>
    </Button>
  )
}
