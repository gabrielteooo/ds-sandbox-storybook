# MCP DS Sandbox — Design System Audit

**Source:** [MCP-DS-Sandbox (Figma)](https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=413-15306)  
**Inspected node:** `413:15306` — Alert documentation canvas  
**Published library:** `MCP DS Sandbox` (team library, subscribed to this file)  
**Audit date:** 2026-05-19  
**Method:** Figma MCP (`get_metadata`, `get_design_context`, `get_variable_defs`, `search_design_system`, `get_libraries`) — read-only, no Figma edits.

---

## Executive summary

This design system is an **Ant Design–aligned UI kit** with **custom brand tokens** (primary teal `#00636a`), **Inter** body type, and **Font Awesome 6 Pro** icons. Tokens are organized in Figma variable collections (`primitives`, `semantic`, `component`, `type`) and exposed to components as CSS custom properties (e.g. `--color/system/error/bg`).

The **working Figma file** currently exposes only a **Welcome** cover page locally; the full component library lives in the **published team library** `MCP DS Sandbox`. Storybook should target the **library**, not only the sandbox file’s single page.

**Stack implication for Storybook:** Map stories to **Ant Design React** primitives where components include Ant snippets in Figma descriptions, then theme Ant’s `ConfigProvider` / CSS variables from exported tokens.

---

## 1. Colour variables

### 1.1 Collection structure

| Collection   | Role | Examples |
|-------------|------|----------|
| `primitives` | Raw scales (Ant palette steps, spacing, radius) | `color/red-ant/1`–`9`, `color/cyan-ant/1`–`9`, `space/4`–`40`, `radius/2`–`12` |
| `semantic`   | Product meaning | `color/bg/base`, `color/text/default`, `color/system/error/bg` |
| `component`  | Per-component states | `button/primary/bg/hover`, `input/border/active`, `tab/border/default` |
| `type`       | Typography numbers | `size/12`–`48`, `line-h/18`–`46` |

### 1.2 Semantic colours (discovered via library search)

**Backgrounds**

- `color/bg/base`, `color/bg/layout`, `color/bg/container`, `color/bg/mask`

**Text**

- `color/text/base`, `color/text/default` *(resolved on Alert: `#000000e0` / 88% black)*
- `color/text/label`, `color/text/heading`, `color/text/secondary`, `color/text/tertiary` *(tertiary resolved: `#0000008c` / 55%)*
- `color/text/white`

**Fills & borders**

- `color/fill/content`, `color/fill/secondary`
- `color/border/secondary`, `color/border/split`

**Brand / primary**

- `color/primary/default`, `color/primary/bg`, `color/primary/text`
- `color/primary/hover`, `color/primary/active`
- `color/primary/border`, `color/primary/bg-hover`, `color/primary/text-hover`, `color/primary/text-active`, `color/primary/border-hover`

**Icons**

- `color/Icon/default` *(resolved: `#0000008c`)*
- `color/Icon/hover`

### 1.3 System feedback colours (resolved from Alert variants)

| Token | Error | Info | Success | Warning |
|-------|-------|------|---------|---------|
| `color/system/{type}/bg` | `#fff1f0` | `#e6f4ff` | `#f0f9ea` | `#fff7e6` |
| `color/system/{type}/border` | `#ffa39e` | `#91caff` | `#c1e7aa` | `#ffd591` |
| `color/system/{type}/default` or `active` | `#cf1322` (active) | `#0958d9` | `#509c22` | `#d46b08` |

Additional semantic keys found: `color/system/info/text`, `color/system/error/border-hover`, `color/system/success/border-hover`.

### 1.4 Primitive palette samples

Ant Design–style ramps (steps 1–9 observed):

- `color/red-ant/*`
- `color/cyan-ant/*`

*(Search returns a subset per query; full ramps exist in the library under `variables/primitives/color/`.)*

### 1.5 Component-level colour tokens (pattern)

Stateful tokens follow **`{component}/{role}/{state}`**:

**Button — primary**

- `button/primary/bg/{default|hover|active|disabled}`
- `button/primary/border/{default|hover|active|disabled}`
- `button/primary/text/{default|disable}`

**Button — secondary**

- `button/secondary/bg/{default|hover|disabled}`
- `button/secondary/border/{hover|active}`
- `button/secondary/text/{default|hover|active|icon}`

**Other components** (names from library paths): `input/border/{hover|active}`, `chip/border/{hover|active}`, `tab/border/{default|active}`, `tag/border/default`, `tag/bg/secondary`, `dropdown/border`, `collapse/border`, `upload/bg/border`, `anchor/border`, `menu/bg/secondary`.

**Resolved brand button (from Alert embedded actions)**

| Token | Resolved value |
|-------|----------------|
| `button/primary/bg/default` | `#00636a` |
| `button/primary/border/default` | `#00636a` |
| `button/primary/text/default` | `white` |
| `button/secondary/bg/default` | `white` |
| `button/secondary/border/default` | `#d9d9d9` |
| `button/secondary/text/default` | `rgba(0,0,0,0.88)` |

---

## 2. Typography styles

### 2.1 Font families

| Token | Usage |
|-------|--------|
| `font/inter` | All UI text (Inter) |
| `font/font-awesome` | Icon font (Font Awesome 6 Pro Regular/Solid) |

### 2.2 Font sizes & line heights (`type` collection + aliases)

| Size token | px (resolved) | Line height token | px (resolved) |
|------------|---------------|-------------------|---------------|
| `size/xs` | 12 | `line-h/xs` | 18 |
| `size/sm` | 14 | `line-h/s` | 22 |
| `size/base` | 16 | `line-h/base` | 24 |
| `size/lg` | 20 | — | — |

Additional primitives in library: `size/8`, `10`, `12`, `14`, `16`, `20`, `24`, `30`, `38`, `40`, `48` and `line-h/18`, `22`, `24`, `28`, `32`, `38`, `46`.

### 2.3 Weights

- `weight/regular` → 400  
- `weight/semibold` → 600  

*(Medium weight used in style names; confirm in Figma text styles.)*

### 2.4 Text styles (Figma styles in library)

**Headings:** `Heading/1` … `Heading/5`

**Body scale (size × weight):**

| Style | Typical use |
|-------|-------------|
| `XS/Normal`, `XS/Medium`, `XS/Strong` | Captions, meta |
| `SM/Normal`, `SM/Medium`, `SM/Strong` | Secondary body, alert description |
| `Base/Normal`, `Base/Medium`, `Base/Strong` | Default UI copy |
| `LG/Normal`, `LG/Medium`, `LG/Strong` | Emphasized body |

**Composed example (from Alert title):** `Heading/5` = Inter semibold 16px / 24px line-height.

**Composed example (from Alert body):** `SM/Normal` = Inter regular 14px / 22px.

---

## 3. Spacing and radius rules

### 3.1 Primitive spacing scale (`primitives` collection)

Numeric steps (px = token value):

`space/4`, `space/8`, `space/12`, `space/16`, `space/24`, `space/32`, `space/40`, `space/3xl`

### 3.2 Semantic spacing aliases (used on components)

| Alias | Resolved px | Typical use |
|-------|-------------|-------------|
| `space/xs` | 8 | Button horizontal padding, tight gaps |
| `space/sm` | 12 | Alert icon gap |
| `space/base` | 16 | Alert padding, action gaps |

### 3.3 Primitive radius scale

`radius/2`, `radius/4`, `radius/6`, `radius/8`, `radius/12` (CORNER_RADIUS scope)

### 3.4 Semantic radius aliases

| Alias | Resolved px | Typical use |
|-------|-------------|-------------|
| `radius/xs` | 4 | Buttons, compact controls |
| `radius/base` | 8 | Alerts (Info/Success/Warning), cards |
| `Components/Alert/Global/borderRadiusLG` | 8 | Error alert (legacy alias) |

### 3.5 Component-specific spacing

Examples from Alert / Button:

- `Components/Alert/Global/marginXS` → 8px (title ↔ description)
- `Components/Button/Global/marginXS` → 8px (icon ↔ label)
- `Components/Button/Global/controlHeightSM` → 24px (compact button height)
- `Components/Alert/Component/withDescriptionIconSize` → 24px

---

## 4. Component names and variants

Components live in the **MCP DS Sandbox** published library. Naming conventions:

- **Ant wrappers:** `*ComponentName*` (e.g. `*Dropdown Menu*`, `*Card*/Base`)
- **Domain composites:** `Header/…`, `Table/Row/…`, `*Card*/Statistics`
- **Utilities:** `Breadcrumb Separator`, `logo/Default`, `Logo-Track`

### 4.1 Components confirmed in library search

| Component | Type | Notes |
|-----------|------|-------|
| **Alert** | `component_set` | Variants: `Type=Error \| Info \| Success \| Warning` — [Ant Alert docs](https://ant.design/components/alert/) |
| **Alert / Broadcast** | `component_set` | Variants: `Danger=yes\|no`, `close=yes\|no` |
| **Button Compact Item** | `component_set` | |
| **Modal Footer** | `component` | |
| **Radio** | `component_set` | Ant `Radio` snippet in description |
| **\*Switch\* / Text and Icon** | `component_set` | |
| **\*Slider\* / InputNumber** | `component` | Ant `Slider` + `InputNumber` |
| **\*Dropdown Menu\*** | `component_set` | |
| **Help Center Menu** | `component` | Ant `Menu` inline example |
| **\*Card\*/Base** | `component_set` | |
| **\*Card\*/Statistics** | `component_set` | |
| **\*Card\*/Help Center** | `component` | Ant `Card` |
| **\*List\* / Vertical** | `component` | Ant `List` vertical layout |
| **Table/Row/Data fields** | `component` | |
| **Pagination Item / Number** | `component_set` | |
| **Dropdown-rich-text-paint** | `component_set` | |
| **ColorPicker / Color Select RGB** | `component` | |
| **Header/Global header** | `component_set` | |
| **Header/Dashboard Header w Filter Criteria** | `component_set` | |
| **Header/Dashboard filter** | `component` | |
| **collapse-drawer-header** | `component_set` | |
| **Homepage Widget** | `component_set` | |
| **Logo-Track** | `component_set` | |
| **logo/Default** | `component` | |

> **Note:** Library search is query-limited (~20 results). The published library contains additional Ant-based components; re-run `search_design_system` with terms like `Input`, `Select`, `Tag`, `Modal`, `Tabs`, `Form` before Storybook build-out.

### 4.2 Alert — variant matrix (inspected)

**Standard Alert** (`508:37318`):

| Property | Values |
|----------|--------|
| `Type` | Error, Info, Success, Warning |
| Boolean props | `icon`, `description`, `closeIcon`, `customActions` |

**Broadcast Alert** (`16830:2050`):

| Variant name | Meaning |
|--------------|---------|
| `Danger=yes, close=no` | Danger styling, no dismiss |
| `Danger=no, close=no` | Default, no dismiss |
| `Danger=no, close=yes` | Default, dismissible |

---

## 5. Common interaction states

### 5.1 Cross-cutting state vocabulary

| State | Where used |
|-------|------------|
| `default` | Rest |
| `hover` | Buttons, inputs, chips, tabs, borders |
| `active` | Pressed / focused emphasis |
| `disabled` / `disable` | Inactive controls (typo `disable` on some primary text tokens) |
| `border-hover` | System banners (error/success) |

### 5.2 Button states (primary & secondary)

Full matrix per `bg`, `border`, `text` × `{default, hover, active, disabled}` — see §1.5.

### 5.3 Input / chip / tab

- `input/border/hover`, `input/border/active`
- `chip/border/hover`, `chip/border/active`
- `tab/border/default`, `tab/border/active`

### 5.4 Alert-specific

- No discrete hover variant in inspected set; emphasis is via **Type** (semantic colour trio: bg / border / icon).
- Optional **close** control and **customActions** slot (embeds primary + secondary buttons).

### 5.5 Icon interaction

- `color/Icon/default` at rest; `color/Icon/hover` for interactive icons.

---

## 6. Page templates

### 6.1 In the working sandbox file

| Page / frame | Purpose |
|--------------|---------|
| `Welcome 👋` → `Cover` | Marketing / cover only (1600×960) |
| `Alert ✅` (node `413:15306`) | Component spec: variant grid + labels |

No full-page product templates were found **in the sandbox file pages list**.

### 6.2 In the published library (composite layouts)

These act as **page-level patterns** for product screens:

| Template / pattern | Type |
|--------------------|------|
| `Header/Global header` | Global chrome |
| `Header/Dashboard Header w Filter Criteria` | Dashboard header + filters |
| `Header/Dashboard filter` | Filter strip |
| `Homepage Widget` | Dashboard widget tile |
| `\*Card\*/Statistics` | Metric / stats block |
| `\*Card\*/Help Center` | Help content card |
| `\*List\* / Vertical` | Feed / list layout |
| `Table/Row/Data fields` | Data table row pattern |
| `Help Center Menu` | Secondary nav (inline menu) |
| `collapse-drawer-header` | Drawer / collapsible panel header |

For Storybook, model these as **template stories** (composition of Header + content slot + optional Table/Cards), not as atomic components.

---

## 7. Figma ↔ code token mapping (recommended)

Use this naming when exporting to CSS / Style Dictionary / Storybook `preview.ts`:

```css
/* Semantic */
--color-text-default: rgba(0, 0, 0, 0.88);
--color-text-tertiary: rgba(0, 0, 0, 0.55);
--color-icon-default: rgba(0, 0, 0, 0.55);

/* Brand */
--color-primary: #00636a;

/* System */
--color-error-bg: #fff1f0;
--color-error-border: #ffa39e;
--color-error-active: #cf1322;
/* … mirror info / success / warning … */

/* Space */
--space-xs: 8px;
--space-sm: 12px;
--space-base: 16px;

/* Radius */
--radius-xs: 4px;
--radius-base: 8px;

/* Type */
--font-family-sans: 'Inter', system-ui, sans-serif;
--font-size-sm: 14px;
--line-height-sm: 22px;
--font-size-base: 16px;
--line-height-base: 24px;
```

Figma MCP already emits variables with slashes; normalize to kebab-case for CSS.

---

## 8. Recommended next steps (Storybook + Cursor)

### Phase A — Token foundation (do first)

1. **Export full variables** from the `MCP DS Sandbox` library (Figma Variables REST API, Tokens Studio, or manual JSON) — MCP search alone is not exhaustive.
2. **Generate `tokens.json`** (or Style Dictionary input) with collections: `primitives`, `semantic`, `component`, `type`.
3. **Emit CSS variables + Ant Design theme config** (`token.colorPrimary`, `token.colorError`, etc.) mapping semantic → Ant tokens.
4. Add **`design-system-audit.md`** (this file) to the repo and reference it in `.cursor/rules` or `AGENTS.md` so Cursor uses canonical names in prompts.

### Phase B — Storybook scaffold

5. **Initialize Storybook 8** in `ds-sandbox-storybook` with React + TypeScript.
6. **Install `antd`** (+ `@ant-design/icons` or Font Awesome if matching Figma exactly).
7. Configure **`preview.tsx`**: `ConfigProvider` theme from §7; global Inter font; optional CSS variables.
8. Add **`design-tokens` story** — swatches for system colours, primary, text, spacing, radius, type scale (no custom UI, just reference).

### Phase C — Component stories (priority order)

9. **Alert** — all `Type` variants + boolean props; link to Ant docs; match node `508:37318`.
10. **Button** (primary/secondary × states) — once component set is located in library.
11. **Input / Select / Form** — high reuse for screen building.
12. **Header/Global header** + **Dashboard** templates as `layout/*` stories.
13. **Card**, **Table**, **List** patterns for composite screens.

### Phase D — Cursor + Figma continuity

14. **Figma Code Connect** (optional): map `Alert`, `Button`, etc. to story paths for MCP `get_design_context` hints.
15. Add **Cursor rule**: “When building screens, use tokens from `design-system-audit.md` / `tokens.json`; prefer Ant Design components; brand primary is `#00636a`.”
16. Keep **Figma library subscribed** in the sandbox file so `search_design_system` stays in sync.

### Phase E — Gaps to clarify with design

17. Confirm **dark mode** — no mode variants observed in this audit.
18. Confirm **MD typography tier** — `MD/*` styles not returned by search; verify in Figma styles panel.
19. Inventory **remaining library components** via full library publish manifest or Figma “Assets” panel.
20. Decide **icon strategy**: Font Awesome 6 Pro (Figma) vs `@ant-design/icons` (code) for parity.

---

## Appendix A — Inspection limits

| Limit | Impact |
|-------|--------|
| `get_variable_defs` without selection | Returns empty unless called on a specific component node |
| `search_design_system` | Paginated / top-N per query; not a full export |
| Sandbox file pages | Only `Welcome 👋` locally; library holds components |
| Hex values | Resolved values sampled from Alert nodes; other tokens may alias primitives |

## Appendix B — Key Figma node IDs (Alert reference)

| Node | ID |
|------|-----|
| Alert component set | `508:37318` |
| Type=Error | `508:37317` |
| Type=Info | `510:32752` |
| Type=Success | `510:33016` |
| Type=Warning | `510:33148` |
| Alert / Broadcast set | `16830:2050` |

## Appendix C — Library reference

- **File key:** `9EWHgAT1kDwK3NmfT8hBFk`
- **Library name:** MCP DS Sandbox
- **Library key:** `lk-ea0832f7df18935e5c7ab7cc0e7d3359b0e969a5b51cda35a202bf1bda6df4ef03f42d2c3537c0599a93deccb60456740430302f167d1cc7b33c88d3ce7bfb7a`
