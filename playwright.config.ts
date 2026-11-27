import { defineConfig } from "@playwright/test"

// `pnpm validate` sets E2E_SCOPE=docs: its smoke tests need only the built docs,
// so the adapter fixture servers (and the cold `astro dev`) don't start.
const docsOnly = process.env.E2E_SCOPE === "docs"
const fixtureSpecs = ["**/adapter.spec.ts", "**/native.spec.ts"]

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 60_000,
  // Static previews take four local workers; CI runners have fewer cores.
  workers: process.env.CI ? 2 : 4,
  use: { headless: true, trace: "retain-on-failure" },
  projects: [
    ...(docsOnly
      ? []
      : [
          {
            name: "dev",
            // The unbundled SDK graph is large; concurrent cold pages exhaust Chromium requests.
            workers: 1,
            testMatch: fixtureSpecs,
            use: { baseURL: "http://127.0.0.1:4322" }
          },
          {
            name: "production",
            testMatch: fixtureSpecs,
            use: { baseURL: "http://127.0.0.1:4323" }
          }
        ]),
    {
      name: "docs",
      testIgnore: fixtureSpecs,
      use: { baseURL: "http://127.0.0.1:4324" }
    }
  ],
  webServer: [
    ...(docsOnly
      ? []
      : [
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
          }
        ]),
    {
      command:
        "pnpm --filter docs exec astro preview --host 127.0.0.1 --port 4324",
      url: "http://127.0.0.1:4324",
      timeout: 120_000
    }
  ]
})
