/**
 * Figma Dropdown 371:10124 / 375:2319 / 22770:15500 — layout metrics (px).
 */
export const DS_DROPDOWN_PANEL = {
  /** Trigger button height — Figma Small */
  triggerHeightPx: 32,
  /** Trigger padding horizontal — space/margin/marginSM */
  triggerPaddingInlinePx: 12,
  /** Trigger border radius — radius/sm */
  triggerBorderRadiusPx: 6,
  /** Total menu row height — padding-block + line-height (5 + 22 + 5 = 32px) */
  itemHeightPx: 32,
  /** Menu item padding block = (32 - 22) / 2 */
  itemPaddingBlockPx: 5,
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
  /** Menu text font size — size/sm */
  itemFontSizePx: 14,
  /** Menu text line height — line-h/s */
  itemLineHeightPx: 22,
  /** Menu container padding — Figma 22770:15500 */
  menuPaddingPx: 4,
  /** Gap between trigger and menu — Figma 22754:15462 */
  menuGapPx: 4,
} as const;
