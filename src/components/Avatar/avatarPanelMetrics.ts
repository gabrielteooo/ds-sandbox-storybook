/**
 * Avatar layout — Figma 398:11741 (Avatar component set).
 * Container sizes match Ant `controlHeight*` in ant-theme (24 / 32 / 40).
 * Figma variables `components/avatar/component/containerSize*` are not exported to tokens.css yet.
 */
export const DS_AVATAR_PANEL = {
  sizeSmallPx: 24,
  sizeDefaultPx: 32,
  sizeLargePx: 40,
  sizeCustomPx: 64,
  /** Icon type inner padding (Figma Icon rows) */
  iconPaddingSmallPx: 5,
  iconPaddingDefaultPx: 7,
  iconPaddingLargePx: 8,
  /** FA user glyph — Figma size/xs · base · lg · xl per avatar size */
  iconFontSizeSmallPx: 12,
  iconFontSizeDefaultPx: 16,
  iconFontSizeLargePx: 20,
  iconFontSizeCustomPx: 24,
  /** Status dot — Figma Badge / Basic `dotSize` 8px; no component badge token in tokens.css */
  badgeDotSizePx: 8,
  /** Avatar Group overlap (Figma 1233:39288 — negative margin between items) */
  groupOverlapSmallPx: 8,
  groupOverlapDefaultPx: 4,
  groupOverlapLargePx: 12,
  groupOverlapCustomPx: 12,
} as const;
