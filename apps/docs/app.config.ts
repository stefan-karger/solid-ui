import { defineConfig } from "@solidjs/start/config"

import { createWithSolidBase, defineTheme } from "@kobalte/solidbase/config"
import defaultTheme from "@kobalte/solidbase/default-theme"
import tailwindcss from "@tailwindcss/vite"

const theme = defineTheme({
  componentsPath: import.meta.resolve("./src/solidbase-theme"),
  extends: defaultTheme
})

export default defineConfig(
  createWithSolidBase(theme)(
    {
      ssr: true,
      server: {
        preset: "vercel",
        prerender: {
          crawlLinks: true
        }
      },
      vite: {
        plugins: [tailwindcss()]
      }
    },
    {
      title: "SolidUI",
      description: "The Future of Your Design System",
      titleTemplate: ":title – SolidUI",
      editPath: "https://github.com/stefan-karger/solid-ui/edit/dev/:path",
      markdown: {
        expressiveCode: {
          themes: ["github-dark-default", "github-light-default"]
        },
        importCodeFile: {
          transform(code, id) {
            if (id.endsWith(".tsx")) {
              return code
                .replaceAll("~/registry/v1/ui", "~/components/ui")
                .replaceAll("export default", "export")
            }
          }
        },
        packageManagers: {
          presets: {
            npm: {
              install: "npm install :content",
              "install-dev": "npm install :content -D",
              "install-global": "npm install :content -g",
              "install-local": "npm install",
              run: "npm run :content",
              exec: "npx :content",
              create: "npm init :content"
            },
            pnpm: {
              install: "pnpm add :content",
              "install-dev": "pnpm add :content -D",
              "install-global": "pnpm add :content -g",
              "install-local": "pnpm i",
              run: "pnpm :content",
              exec: "pnpx :content",
              create: "pnpm create :content"
            },
            yarn: {
              install: "yarn add :content",
              "install-dev": "yarn add :content -D",
              "install-global": "yarn add :content -g",
              "install-local": "yarn i",
              run: "yarn :content",
              exec: "yarn dlx :content",
              create: "yarn create :content"
            },
            bun: {
              install: "bun add :content",
              "install-dev": "bun add :content -d",
              "install-global": "bun add :content -g",
              "install-local": "bun i",
              run: "bun run :content",
              exec: "bunx --bun :content",
              create: "bun create :content"
            },
            deno: {
              install: "deno add npm::content",
              "install-dev": "deno add npm::content -D",
              "install-global": "deno add npm::content -g",
              "install-local": "deno i",
              run: "deno run :content",
              exec: "dpx :content",
              create: "deno run -A npm:create-:content"
            }
          }
        }
      }
    }
  )
)
