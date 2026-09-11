export function createHeadingId(content: string) {
  return content
    .replace(/<[^>]+>/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/['?]/g, "")
    .toLowerCase()
}
