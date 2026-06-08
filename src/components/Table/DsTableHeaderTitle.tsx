import type { ReactNode } from 'react';
import { DsIconCircleQuestion, DsIconInfoCircle } from '../../icons';
import { DS_TABLE_PANEL } from './tablePanelMetrics';
import type { DsTableHeaderAlignment } from './tablePresets';

export interface DsTableHeaderTitleProps {
  label: ReactNode;
  align?: DsTableHeaderAlignment;
  showInfo?: boolean;
  showHelp?: boolean;
  className?: string;
}

/** Figma 940:69332 — header label with optional info / help icons. */
export function DsTableHeaderTitle({
  label,
  align = 'left',
  showInfo = false,
  showHelp = false,
  className,
}: DsTableHeaderTitleProps) {
  return (
    <span
      className={[
        'ds-table__header-title',
        `ds-table__header-title--${align}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="ds-table__header-label">{label}</span>
      {(showInfo || showHelp) && (
        <span className="ds-table__header-icons">
          {showInfo ? (
            <DsIconInfoCircle
              size={DS_TABLE_PANEL.infoIconSizePx}
              className="ds-table__header-icon"
            />
          ) : null}
          {showHelp ? (
            <DsIconCircleQuestion
              size={DS_TABLE_PANEL.infoIconSizePx}
              className="ds-table__header-icon"
            />
          ) : null}
        </span>
      )}
    </span>
  );
}
