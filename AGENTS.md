# MCP DS Sandbox — agent context

Design system source: Figma library **MCP DS Sandbox** ([file](https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox)).

## When building UI

1. Use **Ant Design** components (`antd`) as the implementation layer.
2. Theme via `src/ant-theme.ts` and `ConfigProvider` — brand primary is **`#00636A`**.
3. Prefer **semantic** CSS variables from `src/tokens.css` (e.g. `--color-text-default`, `--color-primary-default`).
4. Use **component** tokens only inside matching component wrappers.
5. Typography: Figma text style classes (e.g. `.text-heading-5`, `.text-sm-normal`) or `--text-*` variables.
6. See `design-system-audit.md` for component variants and Figma node IDs.

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
