import { DsIcon } from '../../icons';
import type { FaIconName } from '../../icons/DsIcon';
import type { DsIconVariant } from '../../icons/DsIcon';
import { DS_TABLE_PANEL } from './tablePanelMetrics';

export type DsTableSortOrder = 'ascend' | 'descend' | null | undefined;

function resolveSortIcon(sortOrder: DsTableSortOrder): {
  name: FaIconName;
  variant: DsIconVariant;
  active: boolean;
} {
  if (sortOrder === 'ascend') {
    return { name: 'arrow-up-wide-short', variant: 'solid', active: true };
  }
  if (sortOrder === 'descend') {
    return { name: 'arrow-down-wide-short', variant: 'solid', active: true };
  }
  return { name: 'arrow-up-arrow-down', variant: 'regular', active: false };
}

export interface DsTableSortIconProps {
  sortOrder?: DsTableSortOrder;
  className?: string;
}

/** Figma 4503:89445 — none / ascending / descending sort icons. */
export function DsTableSortIcon({ sortOrder, className }: DsTableSortIconProps) {
  const { name, variant, active } = resolveSortIcon(sortOrder);

  return (
    <DsIcon
      name={name}
      variant={variant}
      size={DS_TABLE_PANEL.sortIconSizePx}
      className={[
        'ds-table__sort-icon',
        active ? 'ds-table__sort-icon--active' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
