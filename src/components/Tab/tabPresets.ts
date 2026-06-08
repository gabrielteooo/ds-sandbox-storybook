import type { TabsProps } from 'antd';

export type DsTabVariant = 'basic' | 'container';
export type DsTabSize = 'small' | 'default' | 'large';
export type DsTabPosition = 'top' | 'bottom' | 'left' | 'right';

export const DS_TAB_VARIANTS: DsTabVariant[] = ['basic', 'container'];
export const DS_TAB_SIZES: DsTabSize[] = ['small', 'default', 'large'];
export const DS_TAB_POSITIONS: DsTabPosition[] = ['top', 'bottom', 'left', 'right'];

/** Line-style Basic tabs — Figma 512:65398 */
export function mapDsTabSizeToAnt(size: DsTabSize): TabsProps['size'] {
  switch (size) {
    case 'small':
      return 'small';
    case 'default':
      return 'middle';
    case 'large':
      return 'large';
  }
}

/** Card-style Container tabs — Figma 1819:69698 (Base → large, Small → small) */
export function mapDsContainerTabSizeToAnt(size: DsTabSize): TabsProps['size'] {
  switch (size) {
    case 'small':
      return 'small';
    case 'default':
    case 'large':
      return 'large';
  }
}

export function mapDsTabSizeToAntForVariant(
  size: DsTabSize,
  variant: DsTabVariant,
): TabsProps['size'] {
  return variant === 'container'
    ? mapDsContainerTabSizeToAnt(size)
    : mapDsTabSizeToAnt(size);
}
