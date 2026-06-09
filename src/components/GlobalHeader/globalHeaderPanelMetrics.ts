/**
 * Figma Global Header 700:84831 / Header-title 4822:86378 — layout metrics (px).
 */
export const DS_GLOBAL_HEADER_PANEL = {
  /** Horizontal padding — space/2xl */
  paddingInlinePx: 40,
  /** Vertical padding — space/lg */
  paddingBlockPx: 24,
  /** Gap between top and bottom rows — space/base */
  rowGapPx: 16,
  /** Breadcrumbs + actions row height */
  topRowHeightPx: 32,
  /** Utility icon hit target — 32×32 */
  iconActionSizePx: 32,
  /** Gap between utility icons — space/base */
  iconActionGapPx: 16,
  /** Gap between timestamp and CTA group */
  metaGapPx: 16,
  /** Gap between CTA buttons — space/xs */
  ctaGapPx: 8,
  /** Gap before title block — space/base */
  titleBlockGapPx: 16,
  /** Title stack gap — space/xxs */
  titleStackGapPx: 4,
  /** Title row icon gap — space/xs */
  titleIconGapPx: 8,
  /** Search input width — Figma With Search 5937:21709 */
  searchWidthPx: 504,
} as const;

export const DS_GLOBAL_HEADER_TYPES = [
  'default',
  'with-tabs',
  'with-search',
] as const;

export type DsGlobalHeaderType = (typeof DS_GLOBAL_HEADER_TYPES)[number];
