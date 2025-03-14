// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          {assets}
          <script
            defer
            src="https://analytics.eu.umami.is/script.js"
            data-website-id="ee09d538-8dab-4134-9dca-aad904b65af7"
          />
          <link
            rel="preload"
            href="/fonts/Geist.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/GeistMono.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
        </head>
        <body class="min-h-screen bg-background font-sans antialiased">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
