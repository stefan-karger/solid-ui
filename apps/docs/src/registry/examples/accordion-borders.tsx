import { For } from "solid-js"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/registry/ui/accordion"

const items = [
  {
    value: "billing",
    trigger: "How does billing work?",
    content:
      "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members."
  },
  {
    value: "security",
    trigger: "Is my data secure?",
    content:
      "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols."
  },
  {
    value: "integration",
    trigger: "What integrations do you support?",
    content:
      "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks."
  }
]

export default function AccordionBorders() {
  return (
    <Accordion class="max-w-lg rounded-lg border" collapsible defaultValue={["billing"]}>
      <For each={items}>
        {(item) => (
          <AccordionItem class="border-b px-4 last:border-b-0" value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
