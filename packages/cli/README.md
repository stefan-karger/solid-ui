# solid-ui

A CLI for adding components to your project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and sets up CSS variables for the project.

```bash
npx solidui-cli@latest init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx solidui-cli@latest add [component]
```

### Example

```bash
npx solidui-cli@latest add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx solidui-cli@latest add
```

## Registry URL

The CLI fetches components from `https://www.solid-ui.com`. Set
`SOLID_UI_REGISTRY_URL` to use another registry host, such as a local docs
server or a preview deploy:

```bash
SOLID_UI_REGISTRY_URL=http://localhost:4321 npx solidui-cli@latest add button
```

## Documentation

Visit https://solid-ui.com to view the documentation.

## License

Licensed under the [MIT license](https://github.com/stefan-karger/solid-ui/blob/main/LICENSE).
