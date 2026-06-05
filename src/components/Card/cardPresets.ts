import type { CardProps } from 'antd';

/** Figma Card/Base — Small · Default */
export type DsCardSize = 'small' | 'default';

export const DS_CARD_SIZES: DsCardSize[] = ['small', 'default'];

export function mapDsCardSizeToAnt(size: DsCardSize): CardProps['size'] {
  return size === 'small' ? 'small' : undefined;
}
