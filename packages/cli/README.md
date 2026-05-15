# solidui-cli

CLI for adding [Solid UI](https://www.solid-ui.com) components to your project.

## Commands

| Command | Description |
| ------- | ----------- |
| `init` | Create `ui.config.json`, Tailwind theme CSS, `cn` util |
| `add` | Add UI components from the registry |
| `add-block` | Add multi-file blocks (layouts) with `target` paths |
| `update` | Re-fetch and overwrite installed UI components |

## Usage

```bash
npx solidui-cli@latest init -y --with-color-mode --with-tailwind
npx solidui-cli@latest add button mode-toggle
npx solidui-cli@latest add-block sidebar-01
npx solidui-cli@latest update button
```

## Environment

- `SOLIDUI_REGISTRY_URL` — registry base URL (default `https://www.solid-ui.com`)

## Documentation

https://www.solid-ui.com/docs/cli

## License

MIT
