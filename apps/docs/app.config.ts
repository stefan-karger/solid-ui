import { defineConfig } from "@solidjs/start/config"

/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { getHighlighter } from "shiki"
import tailwindcss from "@tailwindcss/vite";

import rehypeComponent from "./src/lib/mdx/component"

const { default: mdx } = pkg

export default defineConfig({
  ssr: true,
  server: {
    preset: "vercel"
  },
  extensions: ["mdx", "md"],
  vite: {
    plugins: [
      tailwindcss(),
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeComponent,
          [
            rehypePrettyCode,
            {
              getHighlighter: async () => {
                return await getHighlighter({
                  theme: "github-dark"
                })
              }
            }
          ]
        ]
      })
    ]
  }
})
