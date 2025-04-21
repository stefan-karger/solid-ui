// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          {assets}
          <script
            data-website-id="ee09d538-8dab-4134-9dca-aad904b65af7"
            defer
            src="https://analytics.eu.umami.is/script.js"
          />
          <link
            as="font"
            crossorigin="anonymous"
            href="/fonts/Geist.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossorigin="anonymous"
            href="/fonts/GeistMono.woff2"
            rel="preload"
            type="font/woff2"
          />
        </head>
        <body class="min-h-screen font-sans antialiased">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
