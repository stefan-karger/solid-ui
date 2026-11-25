import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"

const output = `$ pnpm build
> next build

 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)

Route (app)                Size  First Load JS
┌ ○ /                    1.9 kB         112 kB
├ ○ /_not-found           993 B         103 kB
└ ƒ /api/chat             141 B         102 kB`

export default function CodeBlockBasic() {
  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockContent>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
