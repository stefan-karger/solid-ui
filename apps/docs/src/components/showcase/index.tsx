// Adapted from shadcn/ui at f50887a (MIT, see the project LICENSE).

import { For, type Component } from "solid-js"

import MessageScrollerDemo from "~/registry/examples/message-scroller-demo"

import { AccountAccess } from "./account-access"
import { AnalyticsCard } from "./analytics-card"
import { ClaimableBalance } from "./claimable-balance"
import { ContributionHistory } from "./contribution-history"
import { DividendIncome } from "./dividend-income"
import { EmptyDistributeTrack } from "./empty-distribute-track"
import { NewMilestone } from "./new-milestone"
import { NotificationSettings } from "./notification-settings"
import { Payments } from "./payments"
import { PayoutThreshold } from "./payout-threshold"
import { PowerUsage } from "./power-usage"
import { QrConnect } from "./qr-connect"
import { SavingsTargets } from "./savings-targets"
import { SidebarNav } from "./sidebar-nav"
import { AccountAccess as SkeletonAccountAccess } from "./skeleton/account-access"
import { AnalyticsCard as SkeletonAnalyticsCard } from "./skeleton/analytics-card"
import { ClaimableBalance as SkeletonClaimableBalance } from "./skeleton/claimable-balance"
import { ContributionHistory as SkeletonContributionHistory } from "./skeleton/contribution-history"
import { DividendIncome as SkeletonDividendIncome } from "./skeleton/dividend-income"
import { EmptyDistributeTrack as SkeletonEmptyDistributeTrack } from "./skeleton/empty-distribute-track"
import { NewMilestone as SkeletonNewMilestone } from "./skeleton/new-milestone"
import { NotificationSettings as SkeletonNotificationSettings } from "./skeleton/notification-settings"
import { Payments as SkeletonPayments } from "./skeleton/payments"
import { PayoutThreshold as SkeletonPayoutThreshold } from "./skeleton/payout-threshold"
import { PowerUsage as SkeletonPowerUsage } from "./skeleton/power-usage"
import { QrConnect as SkeletonQrConnect } from "./skeleton/qr-connect"
import { SavingsTargets as SkeletonSavingsTargets } from "./skeleton/savings-targets"
import { TransferFunds as SkeletonTransferFunds } from "./skeleton/transfer-funds"
import { UIElements as SkeletonUIElements } from "./skeleton/ui-elements"
import { UIElements } from "./ui-elements"

function MessageScroller() {
  return (
    <div class="**:[.text-center.text-xs]:hidden">
      <MessageScrollerDemo />
    </div>
  )
}

export type ShowcaseCard = { id: string; component: Component }

// The home page and the /preview page show exactly these cards, column by column.
export const showcaseColumns: readonly {
  class: string
  cards: readonly ShowcaseCard[]
}[] = [
  {
    class: "flex flex-col items-start gap-(--gap)",
    cards: [
      { id: "ui-elements", component: UIElements },
      { id: "sidebar-nav", component: SidebarNav },
      { id: "savings-targets", component: SavingsTargets }
    ]
  },
  {
    class: "hidden flex-col gap-(--gap) lg:flex",
    cards: [
      { id: "contribution-history", component: ContributionHistory },
      { id: "claimable-balance", component: ClaimableBalance },
      { id: "dividend-income", component: DividendIncome }
    ]
  },
  {
    class: "hidden flex-col gap-(--gap) min-[1400px]:flex",
    cards: [
      { id: "new-milestone", component: NewMilestone },
      { id: "payout-threshold", component: PayoutThreshold },
      { id: "account-access", component: AccountAccess }
    ]
  },
  {
    class: "flex flex-col gap-(--gap)",
    cards: [
      { id: "qr-connect", component: QrConnect },
      { id: "message-scroller", component: MessageScroller },
      { id: "payments", component: Payments }
    ]
  },
  {
    class: "hidden flex-col gap-(--gap) min-[1900px]:flex",
    cards: [
      { id: "empty-distribute-track", component: EmptyDistributeTrack },
      { id: "analytics-card", component: AnalyticsCard },
      { id: "notification-settings", component: NotificationSettings },
      { id: "power-usage", component: PowerUsage }
    ]
  }
]

function CardsSkeletonRails() {
  return (
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-12 z-10 hidden min-[2200px]:block [&_[data-slot=skeleton]:nth-child(even)]:hidden"
    >
      <div class="absolute top-0 left-[calc(50%-950px-var(--rail-width)-var(--gap))] grid w-(--rail-width) grid-cols-[repeat(2,var(--rail-column))] gap-(--gap) opacity-50 [--rail-column:20rem] [--rail-width:calc(var(--rail-column)*2+var(--gap))]">
        <div class="flex flex-col gap-(--gap)">
          <SkeletonContributionHistory />
          <SkeletonClaimableBalance />
          <SkeletonDividendIncome />
          <SkeletonPayoutThreshold />
        </div>
        <div class="flex flex-col gap-(--gap)">
          <SkeletonUIElements />
          <SkeletonSavingsTargets />
          <SkeletonNewMilestone />
          <SkeletonPayoutThreshold />
          <SkeletonAccountAccess />
        </div>
      </div>
      <div class="absolute top-0 right-[calc(50%-950px-var(--rail-width)-var(--gap))] grid w-(--rail-width) grid-cols-[repeat(2,var(--rail-column))] gap-(--gap) opacity-50 [--rail-column:20rem] [--rail-width:calc(var(--rail-column)*2+var(--gap))]">
        <div class="flex flex-col gap-(--gap)">
          <SkeletonNewMilestone />
          <SkeletonPayoutThreshold />
          <SkeletonAccountAccess />
          <SkeletonQrConnect />
          <SkeletonTransferFunds />
          <SkeletonPayments />
          <SkeletonEmptyDistributeTrack />
        </div>
        <div class="flex flex-col gap-(--gap)">
          <SkeletonQrConnect />
          <SkeletonTransferFunds />
          <SkeletonPayments />
          <SkeletonEmptyDistributeTrack />
          <SkeletonAnalyticsCard />
          <SkeletonNotificationSettings />
          <SkeletonPowerUsage />
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <div
      data-slot="showcase"
      class="relative flex w-full max-w-none flex-col gap-(--gap) overflow-hidden bg-muted p-3 pb-0! text-foreground [--gap:--spacing(4)] 3xl:[--gap:--spacing(8)] min-[1900px]:p-12 min-[1900px]:[--gap:--spacing(10)]! sm:p-6 md:p-12 md:[--gap:--spacing(8)] lg:p-6 lg:[--gap:--spacing(6)] dark:bg-background"
    >
      <CardsSkeletonRails />
      <div class="relative z-10 mx-auto grid w-full grid-cols-1 gap-(--gap) **:data-[slot=card]:w-full min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:w-auto md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px]">
        <For each={showcaseColumns}>
          {(column) => (
            <div class={column.class}>
              <For each={column.cards}>{(card) => <card.component />}</For>
            </div>
          )}
        </For>
      </div>
      <div class="pointer-events-none absolute inset-x-0 top-0 z-1 h-120 bg-linear-to-b from-background via-muted to-transparent dark:hidden" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t from-background via-muted/80 to-transparent lg:h-80 xl:h-64 dark:via-background/80" />
    </div>
  )
}
