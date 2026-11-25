import AiPatternGrid from "~/components/ai-pattern-grid.astro"
import ComponentPreview from "~/components/component-preview.astro"
import ComponentSource from "~/components/component-source.astro"
import ComponentsList from "~/components/components-list.astro"
import A from "~/components/docs/a.astro"
import AccordionContent from "~/components/docs/accordion-content.astro"
import AccordionItem from "~/components/docs/accordion-item.astro"
import AccordionTrigger from "~/components/docs/accordion-trigger.astro"
import Accordion from "~/components/docs/accordion.astro"
import AlertAction from "~/components/docs/alert-action.astro"
import AlertDescription from "~/components/docs/alert-description.astro"
import AlertTitle from "~/components/docs/alert-title.astro"
import Alert from "~/components/docs/alert.astro"
import AspectRatio from "~/components/docs/aspect-ratio.astro"
import Blockquote from "~/components/docs/blockquote.astro"
import Button from "~/components/docs/button.astro"
import Callout from "~/components/docs/callout.astro"
import CodeCollapsibleWrapper from "~/components/docs/code-collapsible-wrapper.astro"
import CodeTabs from "~/components/docs/code-tabs.astro"
import Code from "~/components/docs/code.astro"
import Figcaption from "~/components/docs/figcaption.astro"
import Figure from "~/components/docs/figure.astro"
import H1 from "~/components/docs/h1.astro"
import H2 from "~/components/docs/h2.astro"
import H3 from "~/components/docs/h3.astro"
import H4 from "~/components/docs/h4.astro"
import H5 from "~/components/docs/h5.astro"
import H6 from "~/components/docs/h6.astro"
import Hr from "~/components/docs/hr.astro"
import Img from "~/components/docs/img.astro"
import KbdGroup from "~/components/docs/kbd-group.astro"
import Kbd from "~/components/docs/kbd.astro"
import Li from "~/components/docs/li.astro"
import LinkedCard from "~/components/docs/linked-card.astro"
import Ol from "~/components/docs/ol.astro"
import P from "~/components/docs/p.astro"
import Pre from "~/components/docs/pre.astro"
import Step from "~/components/docs/step.astro"
import Steps from "~/components/docs/steps.astro"
import Strong from "~/components/docs/strong.astro"
import Table from "~/components/docs/table.astro"
import TabsContent from "~/components/docs/tabs-content.astro"
import TabsList from "~/components/docs/tabs-list.astro"
import TabsTrigger from "~/components/docs/tabs-trigger.astro"
import Tabs from "~/components/docs/tabs.astro"
import Td from "~/components/docs/td.astro"
import Th from "~/components/docs/th.astro"
import Tr from "~/components/docs/tr.astro"
import Ul from "~/components/docs/ul.astro"

export const mdxComponents = {
  AiPatternGrid,
  ComponentPreview,
  ComponentSource,
  ComponentsList,
  ComponentList: ComponentsList,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Link: A,
  LinkedCard,
  Kbd,
  KbdGroup,
  AspectRatio,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  Button,
  CodeCollapsibleWrapper,
  Callout,
  CodeTabs,
  // Named images use Astro's `class` attribute rather than React's `className`.
  Image: Img,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tab: "div",
  Step,
  Steps,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: A,
  p: P,
  strong: Strong,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: Hr,
  img: Img,
  table: Table,
  tr: Tr,
  th: Th,
  td: Td,
  pre: Pre,
  figure: Figure,
  figcaption: Figcaption,
  code: Code
}
