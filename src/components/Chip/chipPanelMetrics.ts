/** Figma Chip 16020:3829 — layout metrics. */
export const DS_CHIP_PANEL = {
  borderRadiusPx: 8,
  contentGapPx: 8,
  activeBorderWidthPx: 1.5,
  defaultBorderWidthPx: 1,
  size: {
    base: {
      heightPx: 40,
      paddingInlinePx: 16,
    },
    small: {
      heightPx: 30,
      paddingInlinePx: 12,
    },
  },
  badge: {
    base: {
      minSizePx: 20,
      borderRadiusPx: 8,
      paddingInlinePx: 4,
    },
    small: {
      sizePx: 12,
      borderRadiusPx: 8,
    },
  },
} as const;

export type DsChipSize = keyof typeof DS_CHIP_PANEL.size;

export const DS_CHIP_SIZES = Object.keys(DS_CHIP_PANEL.size) as DsChipSize[];
