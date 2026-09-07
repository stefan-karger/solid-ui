import A from "~/components/docs/a.astro"
import Blockquote from "~/components/docs/blockquote.astro"
import Code from "~/components/docs/code.astro"
import Figure from "~/components/docs/figure.astro"
import H1 from "~/components/docs/h1.astro"
import H2 from "~/components/docs/h2.astro"
import H3 from "~/components/docs/h3.astro"
import H4 from "~/components/docs/h4.astro"
import H5 from "~/components/docs/h5.astro"
import H6 from "~/components/docs/h6.astro"
import Hr from "~/components/docs/hr.astro"
import Li from "~/components/docs/li.astro"
import Ol from "~/components/docs/ol.astro"
import P from "~/components/docs/p.astro"
import Pre from "~/components/docs/pre.astro"
import Strong from "~/components/docs/strong.astro"
import Table from "~/components/docs/table.astro"
import Td from "~/components/docs/td.astro"
import Th from "~/components/docs/th.astro"
import Tr from "~/components/docs/tr.astro"
import Ul from "~/components/docs/ul.astro"

export const mdxComponents = {
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
  table: Table,
  tr: Tr,
  th: Th,
  td: Td,
  pre: Pre,
  figure: Figure,
  code: Code
}
