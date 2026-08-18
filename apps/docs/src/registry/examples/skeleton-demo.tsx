import { Skeleton } from "~/registry/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div class="flex items-center gap-4">
      <Skeleton width={48} height={48} circle />
      <div class="space-y-2">
        <Skeleton width={250} height={16} />
        <Skeleton width={250} height={16} />
      </div>
    </div>
  )
}
