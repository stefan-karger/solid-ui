import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 60_000,
  workers: 2,
  use: { headless: true, trace: "retain-on-failure" },
  projects: [
    {
      name: "dev",
      // The unbundled SDK graph is large; concurrent cold pages exhaust Chromium requests.
      workers: 1,
      testIgnore: [
        "**/docs.spec.ts",
        "**/themes.spec.ts",
        "**/docs-shell.spec.ts",
        "**/preset-preview.spec.ts",
        "**/ports.spec.ts"
      ],
      use: { baseURL: "http://127.0.0.1:4322" }
    },
    {
      name: "production",
      testIgnore: [
        "**/docs.spec.ts",
        "**/themes.spec.ts",
        "**/docs-shell.spec.ts",
        "**/preset-preview.spec.ts",
        "**/ports.spec.ts"
      ],
      use: { baseURL: "http://127.0.0.1:4323" }
    },
    {
      name: "docs",
      testMatch: [
        "**/docs.spec.ts",
        "**/themes.spec.ts",
        "**/docs-shell.spec.ts",
        "**/preset-preview.spec.ts",
        "**/ports.spec.ts"
      ],
      use: { baseURL: "http://127.0.0.1:4324" }
    }
  ],
  webServer: [
    {
      // This fixture belongs to the suite. Replace leases retained between runs.
      command:
        "pnpm --filter docs exec astro dev --root test/fixtures/adapter --host 127.0.0.1 --port 4322 --force",
      url: "http://127.0.0.1:4322",
      timeout: 120_000
    },
    {
      command:
        "pnpm --filter docs exec astro preview --root test/fixtures/adapter --host 127.0.0.1 --port 4323",
      url: "http://127.0.0.1:4323",
      timeout: 120_000
    },
    {
      command:
        "pnpm --filter docs exec astro preview --host 127.0.0.1 --port 4324",
      url: "http://127.0.0.1:4324",
      timeout: 120_000
    }
  ]
})
