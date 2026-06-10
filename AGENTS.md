# MCP DS Sandbox — agent context

Design system source: Figma library **MCP DS Sandbox** ([file](https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox)).

## When building UI

1. Use **Ant Design** components (`antd`) as the implementation layer.
2. Theme via `src/ant-theme.ts` and `ConfigProvider` — brand primary is **`#00636A`**.
3. Prefer **semantic** CSS variables from `src/tokens.css` (e.g. `--color-text-default`, `--color-primary-default`).
4. Use **component** tokens only inside matching component wrappers.
5. Typography: Figma text style classes (e.g. `.text-heading-5`, `.text-sm-normal`) or `--text-*` variables.
6. **Icons:** Font Awesome 6 Pro via `DsIcon` / presets (`load-fontawesome-pro.ts`). Default colour `--color-icon-default` (Figma `color/Icon/default`, `#0000008c`); hover `--color-icon-hover`. See **Foundation/Icons** and [Figma Icon](https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=472-11122).
7. See `design-system-audit.md` for component variants and Figma node IDs.

## Regenerating tokens

After updating `tokens/*.json` from Figma:

```bash
npm run tokens:build
```

## Storybook

```bash
npm install
npm run storybook
```

**Sidebar structure:** `Foundation/` (tokens, icons) · `Components/` (primitives) · `Forms/` (Figma screen compositions) · `Templates/` (app shell for full-screen implementation).

**Product mockups** (not in Storybook): standalone HTML via Vite — e.g. `npm run mockup:service-config` opens `mockups/service-asset-config.html` (source in `src/mockups/ServiceAssetConfigForm/`).

Templates live in `src/templates/` — use `DsAppShell` when building product pages from Figma.

## Figma Code Connect

Maps published Figma library components to `Ds*` React implementations so Figma MCP (`get_design_context`) returns your code snippets in Dev Mode.

- **Config:** `figma.config.json` · **Templates:** `src/figma/*.figma.ts`
- **Publish:** `npm run figma:connect:publish` (requires Figma personal access token with Code Connect scope — set `FIGMA_ACCESS_TOKEN`)
- **File key:** `9EWHgAT1kDwK3NmfT8hBFk` · **Library:** MCP DS Sandbox
- **Mapped so far:** Alert (`508:37318`), Button (`376:26847`), Button Group (`3126:27821`), Button Compact Item (`3126:25865`), Button Compact Separator (`3126:27636`), Drawer (`513:39439`), Drawer Header (`7031:61723`), Drawer Actions (`7031:61749`), Form / Vertical (`515:43856`), Input Label Vertical (`388:11598`), Input Caption (`388:11597`), Login Form (`516:42635`), Icon (`472:11122`)
- Add more templates alongside existing ones; node IDs are in each story’s `parameters.design.url` and `design-system-audit.md`.
