import { Skeleton } from "~/registry/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div class="flex items-center space-x-4">
      <Skeleton animate={false} circle height={48} />
      <div class="space-y-2">
        <Skeleton height={16} radius={10} width={250} />
        <Skeleton height={16} radius={10} width={200} />
      </div>
    </div>
  );
}
