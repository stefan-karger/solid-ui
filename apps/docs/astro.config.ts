import { fileURLToPath } from "node:url";

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import solid from "@solid-ui/astro-solid2";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypePrettyCode } from "rehype-pretty-code";

import { rehypeCommandMetadata } from "./src/lib/command-metadata";
import { transformers } from "./src/lib/highlight-code";

export default defineConfig({
  output: "static",
  integrations: [
    mdx(),
    solid({
      devtools: false,
    }),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: { dark: "github-dark", light: "github-light-default" },
            transformers,
          },
        ],
        rehypeCommandMetadata,
      ],
    }),
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
