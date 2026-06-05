/**
 * Figma Dropdown 371:10124 / 375:2319 / 376:10633 — layout metrics (px).
 */
export const DS_DROPDOWN_PANEL = {
  /** Trigger button height — Figma Small */
  triggerHeightPx: 32,
  /** Trigger padding horizontal — space/margin/marginSM */
  triggerPaddingInlinePx: 12,
  /** Trigger border radius — radius/sm */
  triggerBorderRadiusPx: 6,
  /** Total menu row height — padding-block + line-height (8 + 24 + 8 = 40px) */
  itemHeightPx: 40,
  /** Menu item padding block = (40 - 24) / 2 */
  itemPaddingBlockPx: 8,
  /** Menu item padding inline — space/sm */
  itemPaddingInlinePx: 12,
  /** Gap between icon and label — space/xs */
  itemIconGapPx: 8,
  /** Menu item border radius — radius/base */
  itemBorderRadiusPx: 8,
  /** Menu icon size (FA container) */
  itemIconSizePx: 16,
  /** Menu icon font size — size/sm inside icon frame */
  itemIconFontSizePx: 14,
  /** Menu text font size — size/base */
  itemFontSizePx: 16,
  /** Menu text line height — line-h/base */
  itemLineHeightPx: 24,
  /** Menu item label area — Figma 376:10633 (190 − 2×12 padding) */
  itemLabelWidthPx: 166,
  /** Menu item / menu width — Figma 376:10633 */
  itemWidthPx: 190,
  /** Menu container padding — Figma 376:10633 (items are w-full, no inset) */
  menuPaddingPx: 0,
  /** Gap between trigger and menu — Figma 22754:15462 */
  menuGapPx: 4,
  /** Menu width — Figma 376:10633 */
  menuWidthPx: 190,
} as const;
