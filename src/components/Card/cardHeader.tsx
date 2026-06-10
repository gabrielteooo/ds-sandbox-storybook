import type { ReactNode } from 'react';
import { DsCardNotificationDot } from './DsCardNotificationDot';
import './component.css';

/** Figma card-header 22456:9547 — internal only, not exported from package. */
export type CardHeaderVariant = 'default' | 'small' | 'table' | 'chart';

export interface CardHeaderProps {
  variant?: CardHeaderVariant;
  title: ReactNode;
  extra?: ReactNode;
  showDot?: boolean;
  description?: ReactNode;
  /** Notification cards — zero vertical padding on small header. */
  compactPadding?: boolean;
  /** Unread notification — active title colour. */
  titleActive?: boolean;
  className?: string;
}

function headerClass(
  variant: CardHeaderVariant,
  compactPadding: boolean,
  className?: string,
) {
  return [
    'ds-card-header',
    `ds-card-header--${variant}`,
    compactPadding ? 'ds-card-header--compact-padding' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function titleClass(variant: CardHeaderVariant, titleActive: boolean) {
  const density =
    variant === 'small' ? 'text-sm-strong' : 'text-base-strong';
  return [
    'ds-card-header__title',
    density,
    titleActive ? 'ds-card-header__title--active' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function CardHeader({
  variant = 'default',
  title,
  extra,
  showDot = false,
  description,
  compactPadding = false,
  titleActive = false,
  className,
}: CardHeaderProps) {
  const hasDescription = description != null && description !== '';
  const isStacked = variant === 'table' || variant === 'chart';

  return (
    <header className={headerClass(variant, compactPadding, className)}>
      {showDot ? (
        <span className="ds-card-header__dot">
          <DsCardNotificationDot />
        </span>
      ) : null}

      <div
        className={[
          'ds-card-header__main',
          isStacked ? 'ds-card-header__main--stacked' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <h3 className={titleClass(variant, titleActive)}>{title}</h3>
        {hasDescription ? (
          <span className="ds-card-header__description text-sm-normal">
            {description}
          </span>
        ) : null}
      </div>

      {extra ? <div className="ds-card-header__actions">{extra}</div> : null}
    </header>
  );
}
