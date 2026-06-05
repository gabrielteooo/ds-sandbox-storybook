import { Card } from 'antd';
import type { CardProps } from 'antd';
import type { ReactNode } from 'react';
import { DsIconEllipsisVertical } from '../../icons';
import { CardThemeProvider } from './CardThemeProvider';
import type { DsCardSize } from './cardPresets';
import { mapDsCardSizeToAnt } from './cardPresets';
import { DS_CARD_PANEL } from './cardPanelMetrics';
import './component.css';

export type { DsCardSize };
export { DS_CARD_PANEL } from './cardPanelMetrics';
export { DS_CARD_SIZES, mapDsCardSizeToAnt } from './cardPresets';
export { CardThemeProvider } from './CardThemeProvider';

export interface DsCardProps extends Omit<CardProps, 'size' | 'title' | 'extra'> {
  /** Figma Small (compact) or Default card density. */
  size?: DsCardSize;
  title?: ReactNode;
  /** Header actions slot — defaults to ellipsis-vertical icon when `showExtra`. */
  extra?: ReactNode;
  /** Show default header extra (ellipsis icon). */
  showExtra?: boolean;
}

function cardClass(size: DsCardSize, className?: string) {
  return ['ds-card', `ds-card--${size}`, className].filter(Boolean).join(' ');
}

export function DsCardExtraButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="ds-card__extra-btn"
      aria-label="More actions"
      onClick={onClick}
    >
      <DsIconEllipsisVertical size={DS_CARD_PANEL.extraIconSizePx} />
    </button>
  );
}

export function DsCard({
  size = 'default',
  title,
  extra,
  showExtra = true,
  bordered = true,
  className,
  children,
  ...rest
}: DsCardProps) {
  const resolvedExtra =
    extra !== undefined ? extra : showExtra ? <DsCardExtraButton /> : undefined;

  return (
    <CardThemeProvider>
      <Card
        className={cardClass(size, className)}
        size={mapDsCardSizeToAnt(size)}
        title={title}
        extra={resolvedExtra}
        bordered={bordered}
        {...rest}
      >
        {children}
      </Card>
    </CardThemeProvider>
  );
}

export default DsCard;
