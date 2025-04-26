import type { RouteProps } from "@solidjs/router"
import { MDXProvider } from "solid-mdx"

import { MDXComponents } from "@/components/mdx-components"
import Sidebar from "@/components/sidebar"
import { TableOfContents } from "@/components/toc"

import "@/styles/mdx.css"

export default function DocsLayout(props: RouteProps<string>) {
  return (
    <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <Sidebar />
      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div class="mx-auto w-full min-w-0">
          <MDXProvider components={MDXComponents}>
            <article>{props.children}</article>
          </MDXProvider>
        </div>
        <div class="hidden text-sm xl:block">
          <TableOfContents />
        </div>
      </main>
    </div>
  )
}
