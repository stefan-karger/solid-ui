import { CookieSettings } from "./cookie-settings";
import { CreateAccount } from "./create-account";
import { Notifications } from "./notifications";
import { PaymentMethod } from "./payment-method";
import { ReportAnIssue } from "./report-an-issue";
import { ShareDocument } from "./share-document";
import { SolidUI } from "./solid-ui";
import { TeamMembers } from "./team-members";

export function Cards() {
  return (
    <>
      <div class="md:hidden">
        <img
          alt="Cards"
          class="block dark:hidden"
          height={1214}
          src="/examples/cards-light.png"
          width={1280}
        />
        <img
          alt="Cards"
          class="hidden dark:block"
          height={1214}
          src="/examples/cards-dark.png"
          width={1280}
        />
      </div>
      <div class="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div class="col-span-2 grid items-start gap-6 lg:col-span-1">
          <CreateAccount />
          <PaymentMethod />
        </div>
        <div class="col-span-2 grid items-start gap-6 lg:col-span-1">
          <TeamMembers />
          <ShareDocument />
          <Notifications />
        </div>
        <div class="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          <ReportAnIssue />
          <SolidUI />
          <CookieSettings />
        </div>
      </div>
    </>
  );
}
