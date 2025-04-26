import { Authentication } from "@/components/authentication"
import { MetaTags } from "@/components/meta-tags"

export default function AuthenticationRoute() {
  return (
    <>
      <MetaTags
        title="Authentication"
        description="Authentication forms built using the components."
      />
      <Authentication />
    </>
  )
}
