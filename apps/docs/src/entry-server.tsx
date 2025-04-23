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
            src="http://umami-a8gg4kg4co40owco8w0so0k0.91.99.20.236.sslip.io/script.js"
            data-website-id="19d584f1-8277-4761-8b29-ea2dc5521a75"
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
