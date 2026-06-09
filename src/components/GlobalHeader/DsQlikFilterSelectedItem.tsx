import { DsIconCloseCircle } from '../../icons';
import { DS_DASHBOARD_HEADER_PANEL } from './dashboardHeaderPanelMetrics';

export type DsQlikFilterSelectedScale = '25%' | '50%' | '75%' | '100%';

export interface DsQlikFilterSelectedItemProps {
  label: string;
  value: string;
  /** Figma scale variant — 25% / 50% / 75% / 100% progress bar fill */
  scale?: DsQlikFilterSelectedScale;
  onRemove?: () => void;
  className?: string;
}

const SCALE_TO_PROGRESS: Record<DsQlikFilterSelectedScale, number> = {
  '25%': 0.25,
  '50%': 0.5,
  '75%': 0.75,
  '100%': 1,
};

/** Figma Qlik Fliter-Selected 4234:36594 */
export function DsQlikFilterSelectedItem({
  label,
  value,
  scale = '25%',
  onRemove,
  className,
}: DsQlikFilterSelectedItemProps) {
  const progress = SCALE_TO_PROGRESS[scale];

  return (
    <div
      className={['ds-qlik-filter-selected', className].filter(Boolean).join(' ')}
      style={{
        width: DS_DASHBOARD_HEADER_PANEL.qlikChipWidthPx,
        minHeight: DS_DASHBOARD_HEADER_PANEL.qlikBarHeightPx,
      }}
    >
      <div
        className="ds-qlik-filter-selected__content"
        style={{ height: DS_DASHBOARD_HEADER_PANEL.qlikChipContentHeightPx }}
      >
        <div className="ds-qlik-filter-selected__text">
          <span className="ds-qlik-filter-selected__label text-sm-normal">{label}</span>
          <span className="ds-qlik-filter-selected__value text-base-normal">{value}</span>
        </div>
        <button
          type="button"
          className="ds-qlik-filter-selected__remove"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          <DsIconCloseCircle size={14} />
        </button>
      </div>
      <div
        className="ds-qlik-filter-selected__progress"
        style={{ height: DS_DASHBOARD_HEADER_PANEL.qlikProgressHeightPx }}
      >
        <div className="ds-qlik-filter-selected__progress-track" />
        <div
          className="ds-qlik-filter-selected__progress-active"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
