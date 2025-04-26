import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandReddit,
  IconBrandX,
  IconBrandYoutube
} from "@/components/icons"
import { BarList } from "@/registry/ui/bar-list"
import { Card } from "@/registry/ui/card"

export default function BarListDemo() {
  const data = [
    {
      name: "Twitter",
      value: 456,
      href: "https://twitter.com/tremorlabs",
      icon: IconBrandX
    },
    {
      name: "Google",
      value: 351,
      href: "https://google.com",
      icon: IconBrandGoogle
    },
    {
      name: "GitHub",
      value: 271,
      href: "https://github.com/tremorlabs/tremor",
      icon: IconBrandGithub
    },
    {
      name: "Reddit",
      value: 191,
      href: "https://reddit.com",
      icon: IconBrandReddit
    },
    {
      name: "Youtube",
      value: 91,
      href: "https://www.youtube.com/@tremorlabs3079",
      icon: IconBrandYoutube
    }
  ]
  return (
    <Card class="mx-auto w-96 p-5">
      <h3 class="font-medium">Website Analytics</h3>
      <p class="mt-4 flex items-center justify-between text-muted-foreground">
        <span>Source</span>
        <span>Views</span>
      </p>
      <BarList data={data} class="mt-2" />
    </Card>
  )
}
