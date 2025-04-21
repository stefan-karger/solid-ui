import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar";

export function RecentSales() {
  return (
    <div class="space-y-8">
      <div class="flex items-center">
        <Avatar class="size-9">
          <AvatarImage alt="Avatar" src="/avatars/01.png" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div class="ml-4 space-y-1">
          <p class="font-medium text-sm leading-none">Olivia Martin</p>
          <p class="text-muted-foreground text-sm">olivia.martin@email.com</p>
        </div>
        <div class="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div class="flex items-center">
        <Avatar class="flex size-9 items-center justify-center space-y-0 border">
          <AvatarImage alt="Avatar" src="/avatars/02.png" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div class="ml-4 space-y-1">
          <p class="font-medium text-sm leading-none">Jackson Lee</p>
          <p class="text-muted-foreground text-sm">jackson.lee@email.com</p>
        </div>
        <div class="ml-auto font-medium">+$39.00</div>
      </div>
      <div class="flex items-center">
        <Avatar class="size-9">
          <AvatarImage alt="Avatar" src="/avatars/03.png" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div class="ml-4 space-y-1">
          <p class="font-medium text-sm leading-none">Isabella Nguyen</p>
          <p class="text-muted-foreground text-sm">isabella.nguyen@email.com</p>
        </div>
        <div class="ml-auto font-medium">+$299.00</div>
      </div>
      <div class="flex items-center">
        <Avatar class="size-9">
          <AvatarImage alt="Avatar" src="/avatars/04.png" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div class="ml-4 space-y-1">
          <p class="font-medium text-sm leading-none">William Kim</p>
          <p class="text-muted-foreground text-sm">will@email.com</p>
        </div>
        <div class="ml-auto font-medium">+$99.00</div>
      </div>
      <div class="flex items-center">
        <Avatar class="size-9">
          <AvatarImage alt="Avatar" src="/avatars/05.png" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div class="ml-4 space-y-1">
          <p class="font-medium text-sm leading-none">Sofia Davis</p>
          <p class="text-muted-foreground text-sm">sofia.davis@email.com</p>
        </div>
        <div class="ml-auto font-medium">+$39.00</div>
      </div>
    </div>
  );
}
