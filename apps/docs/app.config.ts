import path from "path"
import { fileURLToPath } from "url"

import { defineConfig } from "@solidjs/start/config"

import tailwindcss from "@tailwindcss/vite"
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { getHighlighter } from "shiki"

import rehypeComponent from "./src/lib/mdx/component"

const { default: mdx } = pkg
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

export default defineConfig({
  ssr: true,
  server: {
    preset: "vercel"
  },
  extensions: ["mdx", "md"],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
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
