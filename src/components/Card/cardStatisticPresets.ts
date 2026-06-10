/** Figma Statistics Tag — Green · Red · Grey */
export type DsCardStatisticTagColour = 'green' | 'red' | 'grey';

/** Figma Statistic card body tone — Default · Success · Error */
export type DsStatisticCardTone = 'default' | 'success' | 'error';

export const DS_STATISTIC_CARD_DEFAULTS = {
  title: 'Statistic Title',
  value: '240',
  unit: 'hrs',
  trendColour: 'green' as DsCardStatisticTagColour,
  trendLabel: '8% (10)',
  trendPeriod: 'since 2024',
  benchmark: 'Benchmark value = XX',
  footerLabel: 'View detailed insights',
  tone: 'default' as DsStatisticCardTone,
  showStatisticTag: true,
  showFooter: true,
  showInfoIcon: true,
} as const;
