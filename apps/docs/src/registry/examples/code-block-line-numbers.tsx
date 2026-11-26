import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"

const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`

export default function CodeBlockLineNumbers() {
  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
