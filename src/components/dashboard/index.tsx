import { IconDownload } from "~/components/icons";
import { Button } from "~/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { Grid } from "~/registry/ui/grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs";

import { MainNav } from "./main-nav";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { Search } from "./search";
import { UserNav } from "./user-nav";

export function Dashboard() {
  return (
    <>
      <div class="md:hidden">
        <img
          alt="Dashboard"
          class="block dark:hidden"
          height={866}
          src="/examples/dashboard-light.png"
          width={1280}
        />
        <img
          alt="Dashboard"
          class="hidden dark:block"
          height={866}
          src="/examples/dashboard-dark.png"
          width={1280}
        />
      </div>
      <div class="hidden flex-col md:flex">
        <div class="border-b">
          <div class="flex h-16 items-center px-4">
            <MainNav class="mx-6" />
            <div class="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div class="flex-1 space-y-4 p-8 pt-6">
          <div class="flex items-center justify-between space-y-2">
            <h2 class="font-bold text-3xl tracking-tight">Dashboard</h2>
            <div class="flex items-center space-x-2">
              <Button>
                <IconDownload class="mr-2 size-4" />
                Download
              </Button>
            </div>
          </div>
          <Tabs class="space-y-4" defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger disabled value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger disabled value="reports">
                Reports
              </TabsTrigger>
              <TabsTrigger disabled value="notifications">
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent class="space-y-4" value="overview">
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="font-medium text-sm">
                      Total Revenue
                    </CardTitle>
                    <svg
                      class="size-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Total Revenue</title>
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div class="font-bold text-2xl">$45,231.89</div>
                    <p class="text-muted-foreground text-xs">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="font-medium text-sm">
                      Subscriptions
                    </CardTitle>
                    <svg
                      class="size-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Subscriptions</title>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div class="font-bold text-2xl">+2350</div>
                    <p class="text-muted-foreground text-xs">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="font-medium text-sm">Sales</CardTitle>
                    <svg
                      class="size-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Sales</title>
                      <rect height="14" rx="2" width="20" x="2" y="5" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div class="font-bold text-2xl">+12,234</div>
                    <p class="text-muted-foreground text-xs">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="font-medium text-sm">
                      Active Now
                    </CardTitle>
                    <svg
                      class="size-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Active Now</title>
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div class="font-bold text-2xl">+573</div>
                    <p class="text-muted-foreground text-xs">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Grid class="gap-4" colsLg={7} colsMd={2}>
                <Card class="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent class="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card class="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </Grid>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
