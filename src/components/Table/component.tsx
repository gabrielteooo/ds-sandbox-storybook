import { Table } from 'antd';
import type { TableProps } from 'antd';
import { TableThemeProvider } from './TableThemeProvider';
import {
  mapDsTableSizeToAnt,
  tableClass,
  type DsTableSize,
} from './tablePresets';
import './component.css';

export { DS_TABLE_PANEL } from './tablePanelMetrics';
export { TableThemeProvider } from './TableThemeProvider';
export { DsTableBodyText, type DsTableBodyTextProps } from './DsTableBodyText';
export { DsTableFilterIcon, type DsTableFilterIconProps } from './DsTableFilterIcon';
export {
  DEFAULT_TABLE_FILTER_OPTIONS,
  DsTableFilterDropdown,
  type DsTableFilterDropdownProps,
  type DsTableFilterOption,
} from './DsTableFilterDropdown';
export { DsTableHeaderTitle, type DsTableHeaderTitleProps } from './DsTableHeaderTitle';
export { DsTableSortIcon, type DsTableSortIconProps, type DsTableSortOrder } from './DsTableSortIcon';
export {
  DsTableColumnActions,
  type DsTableColumnActionsProps,
} from './DsTableColumnActions';
export {
  DS_TABLE_BODY_ALIGNMENTS,
  DS_TABLE_HEADER_ALIGNMENTS,
  DS_TABLE_ROW_STATE_CLASS,
  DS_TABLE_ROW_STATES,
  DS_TABLE_SIZES,
  getDsTableRowClassName,
  mapDsTableSizeToAnt,
  tableClass,
  type DsTableBodyAlignment,
  type DsTableHeaderAlignment,
  type DsTableRowState,
  type DsTableSize,
} from './tablePresets';

export interface DsTableProps<RecordType extends object = object>
  extends TableProps<RecordType> {
  /** Figma Small / Base / Large — maps to Ant `small` | `middle` | `large`. */
  size?: DsTableSize;
  /** Zebra rows using `--component-table-bg-row-split`. */
  striped?: boolean;
  /** Outer frame border + radius — Figma Template Table S (22553:65229). */
  framed?: boolean;
}

export function DsTable<RecordType extends object = object>({
  size = 'middle',
  striped = false,
  framed = false,
  className,
  ...rest
}: DsTableProps<RecordType>) {
  return (
    <TableThemeProvider>
      <Table<RecordType>
        className={tableClass(size, striped, framed, className)}
        size={mapDsTableSizeToAnt(size)}
        {...rest}
      />
    </TableThemeProvider>
  );
}

export default DsTable;
