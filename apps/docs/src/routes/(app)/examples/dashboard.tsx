import { Dashboard } from "@/components/dashboard"
import { MetaTags } from "@/components/meta-tags"

export default function DashboardRoute() {
  return (
    <>
      <MetaTags title="Dashboard" description="Example dashboard app built using the components." />
      <Dashboard />
    </>
  )
}
