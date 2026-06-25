/** Figma collapse-group 1218:22617 / collapse-item 407:46 — layout metrics. */
export const DS_COLLAPSE_PANEL = {
  borderRadiusPx: 8,
  expandIconSizePx: 14,
  headerGapPx: 12,
  drawerHeaderPaddingInlinePx: 16,
  drawerHeaderPaddingBlockPx: 12,
  size: {
    small: {
      headerPaddingBlockPx: 8,
      headerPaddingInlineStartPx: 8,
      headerPaddingInlineEndPx: 12,
      contentPaddingPx: 12,
    },
    default: {
      headerPaddingBlockPx: 12,
      headerPaddingInlineStartPx: 12,
      headerPaddingInlineEndPx: 16,
      contentPaddingPx: 16,
    },
    large: {
      headerPaddingBlockPx: 16,
      headerPaddingInlineStartPx: 16,
      headerPaddingInlineEndPx: 24,
      contentPaddingPx: 24,
    },
  },
} as const;

export type DsCollapseSize = keyof typeof DS_COLLAPSE_PANEL.size;

export const DS_COLLAPSE_SIZES = Object.keys(
  DS_COLLAPSE_PANEL.size,
) as DsCollapseSize[];

export const DS_COLLAPSE_EXPAND_ICON_POSITIONS = ['left', 'right'] as const;
export type DsCollapseExpandIconPosition =
  (typeof DS_COLLAPSE_EXPAND_ICON_POSITIONS)[number];
