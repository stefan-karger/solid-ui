import { columns } from "./components/columns";
import { tasks } from "./components/data";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";

export default function Tasks() {
  return (
    <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div class="flex items-center justify-between space-y-2">
        <div>
          <h2 class="font-bold text-2xl tracking-tight">Welcome back!</h2>
          <p class="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
