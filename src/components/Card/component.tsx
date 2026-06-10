import { Card } from 'antd';
import type { CardProps } from 'antd';
import type { ReactNode } from 'react';
import { DsIconEllipsisVertical } from '../../icons';
import { CardHeader, type CardHeaderVariant } from './cardHeader';
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
  /** Figma card-header variant — defaults from `size`. */
  headerVariant?: CardHeaderVariant;
  /** Optional subtitle for Table / Chart header variants. */
  description?: ReactNode;
  showHeaderDot?: boolean;
  /** Header actions slot — defaults to ellipsis-vertical icon when `showExtra`. */
  extra?: ReactNode;
  /** Show default header extra (ellipsis icon). */
  showExtra?: boolean;
}

function shellClass(
  size: DsCardSize,
  hasHeader: boolean,
  bordered: boolean,
  className?: string,
) {
  return [
    'ds-card-shell',
    `ds-card-shell--${size}`,
    hasHeader ? 'ds-card-shell--has-header' : '',
    bordered ? 'ds-card-shell--bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function cardClass(size: DsCardSize, hasHeader: boolean) {
  return [
    'ds-card',
    `ds-card--${size}`,
    hasHeader ? 'ds-card--custom-header' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function resolveHeaderVariant(
  size: DsCardSize,
  headerVariant?: CardHeaderVariant,
): CardHeaderVariant {
  if (headerVariant) return headerVariant;
  return size === 'small' ? 'small' : 'default';
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
  headerVariant,
  description,
  showHeaderDot = false,
  extra,
  showExtra = true,
  bordered = true,
  className,
  children,
  ...rest
}: DsCardProps) {
  const hasHeader = title != null && title !== '';
  const resolvedExtra =
    extra !== undefined ? extra : showExtra ? <DsCardExtraButton /> : undefined;
  const resolvedHeaderVariant = resolveHeaderVariant(size, headerVariant);

  return (
    <CardThemeProvider>
      <div className={shellClass(size, hasHeader, bordered, className)}>
        {hasHeader ? (
          <CardHeader
            variant={resolvedHeaderVariant}
            title={title}
            extra={resolvedExtra}
            showDot={showHeaderDot}
            description={description}
          />
        ) : null}
        <Card
          className={cardClass(size, hasHeader)}
          size={mapDsCardSizeToAnt(size)}
          title={false}
          bordered={false}
          {...rest}
        >
          {children}
        </Card>
      </div>
    </CardThemeProvider>
  );
}

export default DsCard;
