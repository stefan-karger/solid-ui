import { Skeleton } from "~/registry/new-york-v4/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div class="flex h-full w-full flex-col items-center space-y-3">
      <Skeleton height={125} radius={16} width={250} />
      <div class="space-y-2">
        <Skeleton height={16} width={250} />
        <Skeleton height={16} width={200} />
      </div>
    </div>
  )
}
