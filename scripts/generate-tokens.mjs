#!/usr/bin/env node
/**
 * Generates src/tokens.css and src/ant-theme.ts from tokens/*.json
 * Run: node scripts/generate-tokens.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const SRC_DIR = path.join(ROOT, 'src');

const FONT_WEIGHT_MAP = {
  Regular: 400,
  Medium: 500,
  'Semi Bold': 600,
  Bold: 700,
  regular: 400,
  medium: 500,
  semibold: 600,
};

/** Map font size (px) → line-height token from type.json */
const FONT_SIZE_TO_LINE_HEIGHT_KEY = {
  8: 'xs',
  10: 'xs',
  12: 'xs',
  14: 's',
  16: 'base',
  20: 'lg',
  24: 'xl',
  30: '2xl',
  38: '3xl',
  40: '3xl',
  48: '3xl',
};

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, name), 'utf8'));
}

function toKebab(segment) {
  return segment
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function pathToCssVar(prefix, segments) {
  return `--${prefix}-${segments.map(toKebab).join('-')}`;
}

function colorToCss(value) {
  if (value == null) return null;
  if (typeof value === 'string') return value;
  if (value.hex) {
    const alpha = value.alpha ?? 1;
    if (alpha < 1 && value.components) {
      const [r, g, b] = value.components.map((c) => Math.round(c * 255));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return value.hex;
  }
  return null;
}

function flattenTokens(obj, prefix, segments = [], out = []) {
  if (!obj || typeof obj !== 'object') return out;

  if (obj.$value !== undefined && obj.$type !== undefined) {
    const varName = pathToCssVar(prefix, segments);
    let cssValue = null;

    switch (obj.$type) {
      case 'color':
        cssValue = colorToCss(obj.$value);
        break;
      case 'number':
        cssValue = `${obj.$value}px`;
        break;
      case 'string': {
        const raw = obj.$value;
        if (segments[0] === 'weight') {
          cssValue = String(
            FONT_WEIGHT_MAP[raw] ??
              (typeof raw === 'string' && /^\d+$/.test(raw) ? raw : raw),
          );
        } else {
          cssValue = `"${raw}"`;
        }
        break;
      }
      default:
        cssValue =
          typeof obj.$value === 'object'
            ? colorToCss(obj.$value)
            : String(obj.$value);
    }

    if (cssValue != null) {
      out.push({ varName, cssValue, segments: [...segments], type: obj.$type });
    }
    return out;
  }

  for (const [key, child] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    flattenTokens(child, prefix, [...segments, key], out);
  }
  return out;
}

function styleNameToClass(name) {
  return `.text-${name.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`;
}

function styleNameToVar(name) {
  return `--text-${name.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()}`;
}

function buildTextStyles(textStylesFile, typeTokens) {
  const lineHeights = typeTokens.filter((t) => t.segments[0] === 'line-h');
  const lhByKey = Object.fromEntries(
    lineHeights.map((t) => [t.segments[1], t.cssValue.replace('px', '')]),
  );

  const styles = textStylesFile.textStyles || [];
  const entries = [];

  for (const style of styles) {
    if (style.fontFamily === 'Font Awesome 6 Pro') continue;

    const lhKey = FONT_SIZE_TO_LINE_HEIGHT_KEY[style.fontSize] ?? 'base';
    const lineHeight = lhByKey[lhKey] ?? '24';
    const fontWeight = FONT_WEIGHT_MAP[style.fontWeight] ?? 400;
    const name = style.name;
    const varBase = styleNameToVar(name);

    entries.push({
      name,
      varBase,
      className: styleNameToClass(name),
      fontFamily: style.fontFamily,
      fontSize: `${style.fontSize}px`,
      lineHeight: `${lineHeight}px`,
      fontWeight,
    });
  }

  return entries;
}

function getByPath(flat, segments) {
  const varName = pathToCssVar(
    segments[0] === 'color' ? 'color' : segments.join('-').includes('color')
      ? 'color'
      : '',
    segments,
  );
  // Try semantic color paths
  const key = `--color-${segments.slice(1).map(toKebab).join('-')}`;
  const found = flat.find((t) => t.varName === key);
  return found?.cssValue;
}

function pickSemantic(flat, ...segments) {
  const varName = pathToCssVar('color', segments);
  return flat.find((t) => t.varName === varName)?.cssValue;
}

function pickComponent(flat, ...segments) {
  const varName = pathToCssVar('component', segments);
  return flat.find((t) => t.varName === varName)?.cssValue;
}

function pickPrimitive(flat, category, ...segments) {
  const varName = pathToCssVar(category, segments);
  return flat.find((t) => t.varName === varName)?.cssValue;
}

function pickType(flat, ...segments) {
  const varName = pathToCssVar(segments[0], segments.slice(1));
  return flat.find((t) => t.varName === varName)?.cssValue;
}

function isResolvableColorValue(cssValue) {
  return (
    typeof cssValue === 'string' &&
    cssValue.length > 0 &&
    !cssValue.includes('{') &&
    !cssValue.startsWith('"')
  );
}

/** Resolve {color.text.default} aliases for Storybook swatch catalog */
function resolveSemanticColors(semantic) {
  const colorTokens = semantic.filter((t) => t.type === 'color');
  const byPath = new Map(colorTokens.map((t) => [t.segments.join('.'), t]));

  const resolveValue = (token, stack = new Set()) => {
    const path = token.segments.join('.');
    if (stack.has(path)) return null;
    stack.add(path);

    let raw = token.cssValue;
    if (typeof raw === 'string' && raw.startsWith('{') && raw.endsWith('}')) {
      const refPath = raw.slice(1, -1).replace(/^color\./, '');
      const ref = byPath.get(refPath);
      if (!ref) return null;
      raw = resolveValue(ref, stack)?.cssValue ?? null;
    }

    if (!isResolvableColorValue(raw)) return null;
    return { ...token, cssValue: raw };
  };

  return colorTokens
    .map((t) => resolveValue(t))
    .filter(Boolean);
}

function swatchLabel(cssVar) {
  const slug = cssVar.replace(/^--(color|primitive-data-color)-/, '');
  return slug
    .split('-')
    .map((part) => (/^\d+$/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(' ');
}

function toSwatch(cssVar) {
  return { name: swatchLabel(cssVar), cssVar };
}

function groupSemanticColorSections(semantic) {
  const colors = resolveSemanticColors(semantic);

  const text = [];
  const fill = [];
  const icon = [];
  const bg = [];
  const border = [];
  const primary = [];
  const systemSuccess = [];
  const systemWarning = [];
  const systemError = [];
  const systemInfo = [];
  const systemLink = [];
  const systemControl = [];

  for (const token of colors) {
    const group = token.segments[0]?.toLowerCase();
    const sub = token.segments[1]?.toLowerCase();
    const swatch = toSwatch(token.varName);

    if (group === 'text') text.push(swatch);
    else if (group === 'fill') fill.push(swatch);
    else if (group === 'icon') icon.push(swatch);
    else if (group === 'bg') bg.push(swatch);
    else if (group === 'border') border.push(swatch);
    else if (group === 'primary') primary.push(swatch);
    else if (group === 'system') {
      if (sub === 'success') systemSuccess.push(swatch);
      else if (sub === 'warning') systemWarning.push(swatch);
      else if (sub === 'error') systemError.push(swatch);
      else if (sub === 'info') systemInfo.push(swatch);
      else if (sub === 'link') systemLink.push(swatch);
      else if (sub === 'control') systemControl.push(swatch);
    }
  }

  const sortByVar = (a, b) => a.cssVar.localeCompare(b.cssVar);
  for (const list of [
    text,
    fill,
    icon,
    bg,
    border,
    primary,
    systemSuccess,
    systemWarning,
    systemError,
    systemInfo,
    systemLink,
    systemControl,
  ]) {
    list.sort(sortByVar);
  }

  return [
    { title: 'Text', swatches: text },
    { title: 'Fill', swatches: fill },
    { title: 'Icon', swatches: icon },
    { title: 'Background', swatches: bg },
    { title: 'Border', swatches: border },
    { title: 'Primary', swatches: primary },
    { title: 'System — Success', swatches: systemSuccess },
    { title: 'System — Warning', swatches: systemWarning },
    { title: 'System — Error', swatches: systemError },
    { title: 'System — Info', swatches: systemInfo },
    { title: 'System — Link', swatches: systemLink },
    { title: 'System — Control', swatches: systemControl },
  ].filter((section) => section.swatches.length > 0);
}

function groupDataColorSections(primitive) {
  const colors = primitive.filter(
    (t) =>
      t.segments[0] === 'data-color' &&
      t.type === 'color' &&
      isResolvableColorValue(t.cssValue),
  );

  const byFamily = new Map();
  for (const token of colors) {
    const family = token.segments[1];
    if (!byFamily.has(family)) byFamily.set(family, []);
    byFamily.get(family).push(toSwatch(token.varName));
  }

  return [...byFamily.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([family, swatches]) => ({
      title: `Data colour — ${family.charAt(0).toUpperCase()}${family.slice(1)}`,
      swatches: swatches.sort((a, b) => a.cssVar.localeCompare(b.cssVar)),
    }));
}

function buildPrimitiveSizeTokens(primitive, category) {
  return primitive
    .filter((t) => t.segments[0] === category && t.type === 'number')
    .map((t) => ({
      name: t.segments[1],
      cssVar: t.varName,
      value: t.cssValue,
    }))
    .sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
}

function generateSizeCatalogTs(primitive) {
  const spacing = buildPrimitiveSizeTokens(primitive, 'space');
  const radius = buildPrimitiveSizeTokens(primitive, 'radius');

  return `/* Generated by scripts/generate-tokens.mjs — do not edit by hand */

export type SizeToken = { name: string; cssVar: string; value: string };

/** Primitive spacing from tokens/primitives.tokens.json */
export const SPACING_TOKENS: SizeToken[] = ${JSON.stringify(spacing, null, 2)};

/** Primitive radius from tokens/primitives.tokens.json */
export const RADIUS_TOKENS: SizeToken[] = ${JSON.stringify(radius, null, 2)};

export function formatSizeLabel(name: string, value: string): string {
  return \`\${name} (\${value})\`;
}
`;
}

function generateColorCatalogTs(semantic, primitive) {
  const semanticSections = groupSemanticColorSections(semantic);
  const dataColorSections = groupDataColorSections(primitive);

  return `/* Generated by scripts/generate-tokens.mjs — do not edit by hand */

export type ColorSwatch = { name: string; cssVar: string };
export type ColorSection = { title: string; swatches: ColorSwatch[] };

/** Semantic colour tokens from tokens/semantics.json */
export const SEMANTIC_COLOR_SECTIONS: ColorSection[] = ${JSON.stringify(semanticSections, null, 2)};

/** Data colour primitives from tokens/primitives.tokens.json */
export const DATA_COLOR_SECTIONS: ColorSection[] = ${JSON.stringify(dataColorSections, null, 2)};
`;
}

function generateCss(semantic, primitive, type, component, textStyleEntries) {
  const semanticResolved = resolveSemanticColors(semantic).map(({ varName, cssValue }) => ({
    varName,
    cssValue,
  }));

  const lines = [
    '/* Generated by scripts/generate-tokens.mjs — do not edit by hand */',
    '/* Re-run: node scripts/generate-tokens.mjs */',
    '',
    ':root {',
  ];

  const sections = [
    ['/* —— Primitives: spacing —— */', primitive.filter((t) => t.segments[0] === 'space')],
    ['/* —— Primitives: radius —— */', primitive.filter((t) => t.segments[0] === 'radius')],
    [
      '/* —— Primitives: color ramps (Ant palette) —— */',
      primitive.filter((t) => t.segments[0] === 'color'),
    ],
    [
      '/* —— Primitives: data colours (charts) —— */',
      primitive.filter((t) => t.segments[0] === 'data-color'),
    ],
    ['/* —— Semantic colors —— */', semanticResolved],
    ['/* —— Typography variables —— */', type],
    ['/* —— Component tokens —— */', component],
    [
      '/* —— Text styles (Figma) —— */',
      textStyleEntries.flatMap((s) => [
        { varName: `${s.varBase}-font-family`, cssValue: `"${s.fontFamily}", system-ui, sans-serif` },
        { varName: `${s.varBase}-font-size`, cssValue: s.fontSize },
        { varName: `${s.varBase}-line-height`, cssValue: s.lineHeight },
        { varName: `${s.varBase}-font-weight`, cssValue: String(s.fontWeight) },
      ]),
    ],
  ];

  for (const [comment, tokens] of sections) {
    if (!tokens.length) continue;
    lines.push(`  ${comment}`);
    for (const { varName, cssValue } of tokens) {
      lines.push(`  ${varName}: ${cssValue};`);
    }
    lines.push('');
  }

  lines.push('}');
  lines.push('');

  lines.push('/* —— Text style utility classes —— */');
  for (const s of textStyleEntries) {
    lines.push(`${s.className} {`);
    lines.push(`  font-family: var(${s.varBase}-font-family);`);
    lines.push(`  font-size: var(${s.varBase}-font-size);`);
    lines.push(`  line-height: var(${s.varBase}-line-height);`);
    lines.push(`  font-weight: var(${s.varBase}-font-weight);`);
    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}

function stripPx(v) {
  if (v == null) return undefined;
  return typeof v === 'string' ? parseFloat(v) : v;
}

/** Ant Design expects unitless lineHeight; px values (e.g. 24) become 24×fontSize. */
function unitlessLineHeight(lineHeightPx, fontSizePx) {
  const lh = stripPx(lineHeightPx);
  const fs = stripPx(fontSizePx);
  if (lh == null || fs == null || fs === 0) return undefined;
  return Math.round((lh / fs) * 10000) / 10000;
}

function generateAntTheme(semantic, component, type, primitive) {
  const color = (path) => pickSemantic(semantic, 'color', ...path);
  const comp = (path) => pickComponent(component, ...path);
  const ty = (path) => pickType(type, ...path);
  const prim = (cat, path) => pickPrimitive(primitive, cat, ...path);

  const colorPrimary = color('primary', 'default') ?? '#00636A';
  const colorPrimaryHover = color('primary', 'hover') ?? '#008585';
  const colorPrimaryActive = color('primary', 'active') ?? '#005055';

  const theme = {
    token: {
      colorPrimary,
      colorPrimaryHover,
      colorPrimaryActive,
      colorSuccess: color('system', 'success', 'default') ?? '#509c22',
      colorWarning: color('system', 'warning', 'default') ?? '#d46b08',
      colorError: color('system', 'error', 'active') ?? color('system', 'error', 'default') ?? '#cf1322',
      colorInfo: color('system', 'info', 'default') ?? '#0958d9',
      colorText: color('text', 'default') ?? 'rgba(0, 0, 0, 0.88)',
      colorTextSecondary: color('text', 'secondary') ?? 'rgba(0, 0, 0, 0.65)',
      colorTextTertiary: color('text', 'tertiary') ?? 'rgba(0, 0, 0, 0.55)',
      colorTextQuaternary: color('text', 'quarternary') ?? 'rgba(0, 0, 0, 0.25)',
      colorTextDisabled: color('text', 'quarternary') ?? 'rgba(0, 0, 0, 0.25)',
      colorBorder: color('border', 'default') ?? '#d9d9d9',
      colorBgContainerDisabled: color('fill', 'tertiary') ?? 'rgba(0, 0, 0, 0.04)',
      colorBorderSecondary: color('border', 'secondary') ?? '#f0f0f0',
      colorBgBase: color('bg', 'base') ?? '#ffffff',
      colorBgLayout: color('bg', 'layout') ?? '#f5f5f5',
      colorBgContainer: color('bg', 'container') ?? '#ffffff',
      colorLink: color('primary', 'default') ?? colorPrimary,
      colorLinkHover: color('primary', 'hover') ?? colorPrimaryHover,
      colorLinkActive: color('primary', 'active') ?? colorPrimaryActive,
      borderRadius: stripPx(prim('radius', 'base')) ?? 8,
      borderRadiusSM: stripPx(prim('radius', 'xs')) ?? 4,
      borderRadiusLG: stripPx(prim('radius', 'lg')) ?? 12,
      fontFamily: `${ty('font', 'inter')?.replace(/"/g, '') ?? 'Inter'}, system-ui, sans-serif`,
      fontSize: stripPx(ty('size', 'base')) ?? 16,
      fontSizeSM: stripPx(ty('size', 'sm')) ?? 14,
      fontSizeLG: stripPx(ty('size', 'lg')) ?? 20,
      fontSizeXL: stripPx(ty('size', 'xl')) ?? 24,
      lineHeight:
        unitlessLineHeight(ty('line-h', 'base'), ty('size', 'base')) ?? 1.5,
      lineHeightSM:
        unitlessLineHeight(ty('line-h', 's'), ty('size', 'sm')) ?? 22 / 14,
      lineHeightLG:
        unitlessLineHeight(ty('line-h', 'lg'), ty('size', 'lg')) ?? 28 / 20,
      controlHeight: 32,
      controlHeightSM: 24,
      controlHeightLG: 40,
      paddingXS: stripPx(prim('space', 'xs')) ?? 8,
      paddingSM: stripPx(prim('space', 'sm')) ?? 12,
      padding: stripPx(prim('space', 'base')) ?? 16,
      paddingLG: stripPx(prim('space', 'lg')) ?? 24,
      paddingXL: stripPx(prim('space', 'xl')) ?? 32,
      marginXS: stripPx(prim('space', 'xs')) ?? 8,
      marginSM: stripPx(prim('space', 'sm')) ?? 12,
      margin: stripPx(prim('space', 'base')) ?? 16,
      marginLG: stripPx(prim('space', 'lg')) ?? 24,
      marginXL: stripPx(prim('space', 'xl')) ?? 32,
    },
    components: {
      Alert: {
        colorInfoBg: color('system', 'info', 'bg') ?? '#e6f4ff',
        colorInfoBorder: color('system', 'info', 'border') ?? '#91caff',
        colorSuccessBg: color('system', 'success', 'bg') ?? '#f0f9ea',
        colorSuccessBorder: color('system', 'success', 'border') ?? '#c1e7aa',
        colorWarningBg: color('system', 'warning', 'bg') ?? '#fff7e6',
        colorWarningBorder: color('system', 'warning', 'border') ?? '#ffd591',
        colorErrorBg: color('system', 'error', 'bg') ?? '#fff1f0',
        colorErrorBorder: color('system', 'error', 'border') ?? '#ffa39e',
        borderRadiusLG: stripPx(prim('radius', 'base')) ?? 8,
      },
      Button: {
        primaryColor: comp('button', 'primary', 'text', 'default') ?? '#ffffff',
        defaultBg: comp('button', 'secondary', 'bg', 'default') ?? '#ffffff',
        defaultBorderColor: comp('button', 'secondary', 'border', 'default') ?? '#d9d9d9',
        defaultColor: comp('button', 'secondary', 'text', 'default') ?? 'rgba(0, 0, 0, 0.88)',
        borderRadius: stripPx(prim('radius', 'xs')) ?? 4,
        controlHeightSM: 24,
      },
      Radio: {
        radioSize: 16,
        dotSize: 8,
        wrapperMarginInlineEnd: stripPx(prim('space', 'xs')) ?? 8,
        dotColorDisabled: color('text', 'quarternary') ?? 'rgba(0, 0, 0, 0.25)',
        colorPrimary: color('primary', 'default') ?? '#00636A',
        colorPrimaryHover: color('primary', 'hover') ?? '#008585',
        colorPrimaryActive: color('primary', 'active') ?? '#005055',
      },
    },
  };

  const header = `/**
 * Ant Design theme for MCP DS Sandbox
 * Generated by scripts/generate-tokens.mjs — do not edit by hand
 * Use: import { ConfigProvider } from 'antd'; import { antTheme } from './ant-theme';
 * @see https://ant.design/docs/react/customize-theme
 */

`;

  const body = `export const antTheme = ${JSON.stringify(theme, null, 2)} as const;

export type AntTheme = typeof antTheme;

export default antTheme;
`;

  return header + body;
}

// --- main ---
const primitivesFile = readJson('primitives.tokens.json');
const semanticsFile = readJson('semantics.json');
// Unwrap root `color` so paths are --color-text-default, not --color-color-text-default
const primitives = flattenTokens(primitivesFile, 'primitive');
const semantic = flattenTokens(semanticsFile.color ?? semanticsFile, 'color');
const typeFlat = flattenTokens(readJson('type.json'), 'type');
const component = flattenTokens(readJson('component.json'), 'component');
const textStylesFile = readJson('textstyles.json');
const textStyleEntries = buildTextStyles(textStylesFile, typeFlat);

fs.mkdirSync(SRC_DIR, { recursive: true });

const css = generateCss(semantic, primitives, typeFlat, component, textStyleEntries);
const antTs = generateAntTheme(semantic, component, typeFlat, primitives);

fs.writeFileSync(path.join(SRC_DIR, 'tokens.css'), css);
fs.writeFileSync(path.join(SRC_DIR, 'ant-theme.ts'), antTs);
fs.writeFileSync(
  path.join(SRC_DIR, 'token-color-catalog.ts'),
  generateColorCatalogTs(semantic, primitives),
);
fs.writeFileSync(
  path.join(SRC_DIR, 'token-size-catalog.ts'),
  generateSizeCatalogTs(primitives),
);

console.log('Wrote src/tokens.css');
console.log('Wrote src/token-color-catalog.ts');
console.log('Wrote src/token-size-catalog.ts');
console.log(`  - ${semantic.length} semantic color tokens`);
console.log(`  - ${primitives.length} primitive tokens`);
console.log(`  - ${typeFlat.length} type tokens`);
console.log(`  - ${component.length} component tokens`);
console.log(`  - ${textStyleEntries.length} text styles`);
console.log('Wrote src/ant-theme.ts');
