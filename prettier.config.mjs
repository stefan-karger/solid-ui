/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  printWidth: 100,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ]
}
