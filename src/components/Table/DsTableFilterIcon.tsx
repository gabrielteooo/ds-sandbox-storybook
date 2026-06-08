import { DsIconFilter } from '../../icons';
import { DS_TABLE_PANEL } from './tablePanelMetrics';

export interface DsTableFilterIconProps {
  filtered?: boolean;
  className?: string;
}

/** Figma 5965:18647 — table column filter icon. */
export function DsTableFilterIcon({ filtered = false, className }: DsTableFilterIconProps) {
  return (
    <DsIconFilter
      size={DS_TABLE_PANEL.filterIconSizePx}
      className={[
        'ds-table__filter-icon',
        filtered ? 'ds-table__filter-icon--active' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
