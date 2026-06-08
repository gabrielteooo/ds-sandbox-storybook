/**
 * Modal panel metrics — Figma 2914:74905 (basic), 422:13514 (information), 423:364 (results).
 */
export const DS_MODAL_PANEL = {
  basicWidthPx: 520,
  informationWidthPx: 400,
  resultsWidthPx: 628,
  borderRadiusPx: 8,
  /** TOKEN GAP: no --primitive-space token for 20px */
  headerPaddingTopPx: 20,
  headerPaddingBottomPx: 8,
  headerPaddingInlinePx: 24,
  bodyPaddingBottomPx: 12,
  footerPaddingBottomPx: 20,
  footerPaddingInlinePx: 24,
  footerGapPx: 8,
  informationPaddingTopPx: 20,
  informationPaddingInlinePx: 24,
  informationIconGapPx: 12,
  informationIconSizePx: 24,
  informationTitleBodyGapPx: 8,
  informationFooterPaddingTopPx: 12,
  resultsPaddingTopPx: 48,
  resultsPaddingBottomPx: 40,
  resultsPaddingInlinePx: 24,
  resultsSectionGapPx: 24,
  resultsIconSizePx: 64,
  resultsActionsPaddingTopPx: 40,
  resultsErrorDetailPaddingInlinePx: 40,
  buttonMinWidthPx: 80,
  /** Vertical offset from viewport top (Figma basic modal placement). */
  positionTopPercent: 25,
} as const;
