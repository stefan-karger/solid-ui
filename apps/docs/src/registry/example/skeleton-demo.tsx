import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div class="flex items-center space-x-4">
      <Skeleton height={48} circle animate={false} />
      <div class="space-y-2">
        <Skeleton height={16} width={250} radius={10} />
        <Skeleton height={16} width={200} radius={10} />
      </div>
    </div>
  )
}
