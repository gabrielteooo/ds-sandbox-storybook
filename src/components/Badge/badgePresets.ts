import type { BadgeProps } from 'antd';

/** Figma Badge / Basic — Small (16px) · Base (20px). */
export type DsBadgeSize = 'small' | 'default';

export const DS_BADGE_SIZES: DsBadgeSize[] = ['small', 'default'];

export function mapDsBadgeSizeToAnt(size: DsBadgeSize): BadgeProps['size'] {
  return size === 'small' ? 'small' : undefined;
}

/** Figma Badge / Status — maps to Ant `status` prop. */
export type DsBadgeStatus = NonNullable<BadgeProps['status']>;

export const DS_BADGE_STATUSES: DsBadgeStatus[] = [
  'success',
  'default',
  'error',
  'processing',
  'warning',
];

export const DS_BADGE_STATUS_LABELS: Record<DsBadgeStatus, string> = {
  success: 'Success',
  default: 'Default',
  error: 'Error',
  processing: 'Processing',
  warning: 'Warning',
};

/** Figma Badge / Ribbon semantic colours (507:38121). */
export type DsBadgeRibbonColor =
  | 'cyan'
  | 'green'
  | 'purple'
  | 'blue'
  | 'volcano'
  | 'magenta'
  | 'red';

/** Figma display names — Cyan · Polar Green · Golden Purple · Daybreak Blue · Volcano · Magenta · Dust Red. */
export const DS_BADGE_RIBBON_FIGMA_LABELS: Record<DsBadgeRibbonColor, string> = {
  cyan: 'Cyan',
  green: 'Polar Green',
  purple: 'Golden Purple',
  blue: 'Daybreak Blue',
  volcano: 'Volcano',
  magenta: 'Magenta',
  red: 'Dust Red',
};

/**
 * Figma 507:38121 ribbon fills — mirrors tokens.css primitives.
 * Passed to Ant as custom hex (not preset names) so DS colours win over Ant defaults.
 */
export const DS_BADGE_RIBBON_STYLES: Record<
  DsBadgeRibbonColor,
  { bg: string; corner: string }
> = {
  cyan: { bg: '#00636A', corner: '#005055' }, // cyan-ant-6 / cyan-ant-7
  green: { bg: '#64C32A', corner: '#509C22' }, // green-ant-6 / green-ant-7
  purple: { bg: '#722ED1', corner: '#531DAB' }, // purple-ant-6 / purple-ant-7
  blue: { bg: '#233C99', corner: '#192B6C' }, // data-blue-6 / data-blue-7
  volcano: { bg: '#FA541C', corner: '#D4380D' }, // volcano-ant-6 / volcano-ant-7
  magenta: { bg: '#EB2F96', corner: '#C41D7F' }, // magenta-ant-6 / magenta-ant-7
  red: { bg: '#F5222D', corner: '#CF1322' }, // red-ant-6 / red-ant-7
};

/** Story order matches Figma 22748:6074. */
export const DS_BADGE_RIBBON_COLORS: DsBadgeRibbonColor[] = [
  'cyan',
  'green',
  'purple',
  'blue',
  'volcano',
  'magenta',
  'red',
];
