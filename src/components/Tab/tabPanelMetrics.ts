/**
 * Figma Tabs / Basic 512:65398 — layout metrics (px).
 */
export const DS_TAB_PANEL = {
  /** Horizontal gap between tab items — components/tabs/component/horizontalItemGutter */
  horizontalItemGutterPx: 32,
  /** Vertical gap between tab items (left/right) — components/tabs/global/margin */
  verticalItemGapPx: 16,
  /** Tab icon-label gap */
  iconLabelGapPx: 12,
  /** Content area padding — Figma 22758:578 */
  contentPaddingPx: 24,
  /** Horizontal tab padding — size Default, Top/Bottom */
  horizontalPaddingDefaultPx: 12,
  horizontalPaddingSmallPx: 8,
  horizontalPaddingLargePx: 16,
  /** Vertical tab padding inline — components/tabs/global/paddingLG */
  verticalPaddingInlinePx: 24,
  /** Vertical tab padding block — Default */
  verticalPaddingBlockDefaultPx: 8,
  verticalPaddingBlockSmallPx: 4,
  verticalPaddingBlockLargePx: 12,
  /** Active indicator width — border-2 */
  indicatorWidthPx: 2,
  /** Storybook basic example width — Figma 512:65397 */
  storyWidthPx: 640,

  /* ── Container variant — Figma 1819:69698 / 22758:645 ── */
  /** Gap between card tab items — components/tabs/component/cardGutter */
  containerCardGutterPx: 2,
  /** Container tab height — Base (controlHeightLG) */
  containerTabHeightBasePx: 48,
  /** Container tab height — Small (controlHeight) */
  containerTabHeightSmallPx: 40,
  /** Container tab padding inline — components/tabs/global/padding */
  containerTabPaddingInlinePx: 16,
  /** Container tab padding block — components/tabs/global/paddingXS */
  containerTabPaddingBlockPx: 8,
  /** Container content padding — space/base */
  containerContentPaddingPx: 16,
  /** Container tab top radius — components/tabs/global/borderRadiusLG */
  containerTabRadiusPx: 8,
} as const;
