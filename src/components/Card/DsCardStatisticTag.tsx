import type { ReactElement } from 'react';
import { DsIconSortAsc, DsIconSortDesc } from '../../icons';
import type { DsCardStatisticTagColour } from './cardStatisticPresets';
import { DS_CARD_PANEL } from './cardPanelMetrics';

export interface DsCardStatisticTagProps {
  /** Figma Statistics Tag colour variant. */
  colour?: DsCardStatisticTagColour;
  /** Tag label, e.g. `8% (10)`. */
  label?: string;
}

function trendIcon(colour: DsCardStatisticTagColour): ReactElement | null {
  const size = DS_CARD_PANEL.statisticTagIconSizePx;
  if (colour === 'green') {
    return <DsIconSortAsc size={size} className="ds-card-statistic-tag__icon" />;
  }
  if (colour === 'red') {
    return <DsIconSortDesc size={size} className="ds-card-statistic-tag__icon" />;
  }
  return null;
}

export function DsCardStatisticTag({
  colour = 'green',
  label = '8% (10)',
}: DsCardStatisticTagProps) {
  return (
    <span
      className={[
        'ds-card-statistic-tag',
        `ds-card-statistic-tag--${colour}`,
      ].join(' ')}
    >
      {trendIcon(colour)}
      <span className="ds-card-statistic-tag__label">{label}</span>
    </span>
  );
}
