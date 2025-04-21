import { Authentication } from "~/components/authentication";
import { MetaTags } from "~/components/meta-tags";

export default function AuthenticationRoute() {
  return (
    <>
      <MetaTags
        description="Authentication forms built using the components."
        title="Authentication"
      />
      <Authentication />
    </>
  );
}
