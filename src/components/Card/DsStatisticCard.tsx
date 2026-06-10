import type { ReactNode } from 'react';
import { DsIconCircleQuestion } from '../../icons';
import { CardThemeProvider } from './CardThemeProvider';
import { DsCardFooterButton } from './DsCardFooterButton';
import { DsCardStatisticTag } from './DsCardStatisticTag';
import {
  DS_STATISTIC_CARD_DEFAULTS,
  type DsCardStatisticTagColour,
  type DsStatisticCardTone,
} from './cardStatisticPresets';
import { DS_CARD_PANEL } from './cardPanelMetrics';
import './component.css';

export type { DsCardStatisticTagColour, DsStatisticCardTone };
export { DS_STATISTIC_CARD_DEFAULTS } from './cardStatisticPresets';

export interface DsStatisticCardProps {
  title?: string;
  value?: string | number;
  unit?: string;
  trendColour?: DsCardStatisticTagColour;
  trendLabel?: string;
  trendPeriod?: string;
  benchmark?: string;
  /** Body tone — Default (white), Success (green tint), Error (red tint). */
  tone?: DsStatisticCardTone;
  showStatisticTag?: boolean;
  showFooter?: boolean;
  showInfoIcon?: boolean;
  footerLabel?: string;
  footerDisabled?: boolean;
  className?: string;
  onFooterClick?: () => void;
  onInfoClick?: () => void;
}

function statisticCardClass(tone: DsStatisticCardTone, className?: string) {
  return [
    'ds-card',
    'ds-statistic-card',
    `ds-statistic-card--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function InfoButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="ds-statistic-card__info-btn"
      aria-label="More information"
      onClick={onClick}
    >
      <DsIconCircleQuestion size={DS_CARD_PANEL.extraIconSizePx} />
    </button>
  );
}

export function DsStatisticCard({
  title = DS_STATISTIC_CARD_DEFAULTS.title,
  value = DS_STATISTIC_CARD_DEFAULTS.value,
  unit = DS_STATISTIC_CARD_DEFAULTS.unit,
  trendColour = DS_STATISTIC_CARD_DEFAULTS.trendColour,
  trendLabel = DS_STATISTIC_CARD_DEFAULTS.trendLabel,
  trendPeriod = DS_STATISTIC_CARD_DEFAULTS.trendPeriod,
  benchmark = DS_STATISTIC_CARD_DEFAULTS.benchmark,
  tone = DS_STATISTIC_CARD_DEFAULTS.tone,
  showStatisticTag = DS_STATISTIC_CARD_DEFAULTS.showStatisticTag,
  showFooter = DS_STATISTIC_CARD_DEFAULTS.showFooter,
  showInfoIcon = DS_STATISTIC_CARD_DEFAULTS.showInfoIcon,
  footerLabel = DS_STATISTIC_CARD_DEFAULTS.footerLabel,
  footerDisabled = false,
  className,
  onFooterClick,
  onInfoClick,
}: DsStatisticCardProps) {
  const trendRow: ReactNode =
    showStatisticTag || trendPeriod ? (
      <div className="ds-statistic-card__trend-row">
        {showStatisticTag ? (
          <DsCardStatisticTag colour={trendColour} label={trendLabel} />
        ) : null}
        {trendPeriod ? (
          <span className="ds-statistic-card__period">{trendPeriod}</span>
        ) : null}
      </div>
    ) : null;

  return (
    <CardThemeProvider>
      <article className={statisticCardClass(tone, className)}>
        <div className="ds-statistic-card__body">
          <div className="ds-statistic-card__content">
            <div className="ds-statistic-card__header">
              <h3 className="ds-statistic-card__title text-base-strong">{title}</h3>
              {showInfoIcon ? <InfoButton onClick={onInfoClick} /> : null}
            </div>

            <div className="ds-statistic-card__value-row">
              <span className="ds-statistic-card__value text-heading-1">{value}</span>
              {unit ? (
                <span className="ds-statistic-card__unit text-base-strong">{unit}</span>
              ) : null}
            </div>

            {trendRow}

            {benchmark ? (
              <p className="ds-statistic-card__benchmark">{benchmark}</p>
            ) : null}
          </div>
        </div>

        {showFooter ? (
          <DsCardFooterButton
            label={footerLabel}
            disabled={footerDisabled}
            onClick={onFooterClick}
          />
        ) : null}
      </article>
    </CardThemeProvider>
  );
}
