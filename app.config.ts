import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getHighlighter } from "shiki";
import rehypeComponent from "./src/lib/mdx/component";

export default defineConfig({
  extensions: ["mdx", "md"],
  server: { preset: "github-pages" },
  ssr: true,
  vite: {
    plugins: [
      tailwindcss(),
      pkg.default.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [
          rehypeSlug,
          rehypeComponent,
          [
            rehypePrettyCode,
            {
              getHighlighter: async () => {
                return await getHighlighter({
                  theme: "github-dark",
                });
              },
            },
          ],
        ],
        remarkPlugins: [remarkGfm],
      }),
    ],
  },
});
