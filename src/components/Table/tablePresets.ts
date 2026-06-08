import type { TableProps } from 'antd';

export const DS_TABLE_SIZES = ['small', 'middle', 'large'] as const;
export type DsTableSize = (typeof DS_TABLE_SIZES)[number];

export const DS_TABLE_HEADER_ALIGNMENTS = ['left', 'center', 'right'] as const;
export type DsTableHeaderAlignment = (typeof DS_TABLE_HEADER_ALIGNMENTS)[number];

export const DS_TABLE_BODY_ALIGNMENTS = ['left', 'center', 'right'] as const;
export type DsTableBodyAlignment = (typeof DS_TABLE_BODY_ALIGNMENTS)[number];

export function mapDsTableSizeToAnt(size: DsTableSize): NonNullable<TableProps['size']> {
  return size;
}

export function tableClass(
  size: DsTableSize,
  striped: boolean,
  framed = false,
  className?: string,
): string {
  return [
    'ds-table',
    `ds-table--${size}`,
    striped ? 'ds-table--striped' : '',
    framed ? 'ds-table--framed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export {
  DS_TABLE_ROW_STATE_CLASS,
  DS_TABLE_ROW_STATES,
  getDsTableRowClassName,
  type DsTableRowState,
} from './tableRowStates';
