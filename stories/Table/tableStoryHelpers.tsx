import type { TableColumnsType } from 'antd';
import {
  DEFAULT_TABLE_FILTER_OPTIONS,
  DsTableBodyText,
  DsTableColumnActions,
  DsTableFilterDropdown,
  DsTableFilterIcon,
  DsTableHeaderTitle,
  DsTableSortIcon,
  type DsTableRowState,
} from '../../src/components/Table';

export const TABLE_COLUMN_KEYS = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'] as const;

export interface TemplateTableRow {
  key: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
}

export function createTemplateTableData(rowCount: number): TemplateTableRow[] {
  return Array.from({ length: rowCount }, (_, index) => ({
    key: String(index + 1),
    col1: 'Row cell text',
    col2: 'Row cell text',
    col3: 'Row cell text',
    col4: 'Row cell text',
    col5: 'Row cell text',
    col6: 'Row cell text',
  }));
}

type TableDataColumnKey = (typeof TABLE_COLUMN_KEYS)[number];

export function createPlainColumns(
  keys: readonly TableDataColumnKey[] = TABLE_COLUMN_KEYS,
): TableColumnsType<TemplateTableRow> {
  return keys.map((key) => ({
    title: <DsTableHeaderTitle label="Table Header" />,
    dataIndex: key,
    key,
    render: (value: string) => <DsTableBodyText text={value} />,
  }));
}

export function createSortFilterColumns(
  keys: readonly TableDataColumnKey[] = TABLE_COLUMN_KEYS,
): TableColumnsType<TemplateTableRow> {
  return keys.map((key) => ({
    title: <DsTableHeaderTitle label="Table Header" />,
    dataIndex: key,
    key,
    sorter: (a, b) => a[key].localeCompare(b[key]),
    sortIcon: ({ sortOrder }) => <DsTableSortIcon sortOrder={sortOrder} />,
    filterDropdown: (props) => (
      <DsTableFilterDropdown {...props} options={DEFAULT_TABLE_FILTER_OPTIONS} />
    ),
    onFilter: (value, record) => record.key === String(value),
    filterIcon: (filtered) => <DsTableFilterIcon filtered={filtered} />,
    render: (value: string) => <DsTableBodyText text={value} />,
  }));
}

export const TABLE_ACTIONS_CELL_PROPS = { className: 'ds-table__actions-cell' } as const;

export function createContainerTableColumns(): TableColumnsType<TemplateTableRow> {
  return [
    ...createSortFilterColumns(),
    {
      title: <DsTableHeaderTitle label="Actions" />,
      key: 'actions',
      fixed: 'right',
      width: 140,
      onCell: () => TABLE_ACTIONS_CELL_PROPS,
      render: () => <DsTableColumnActions count={2} size="middle" />,
    },
  ];
}

export interface TableStateRow {
  key: string;
  label: string;
  text: string;
  state: DsTableRowState;
}

export const TABLE_STATE_ROWS: TableStateRow[] = [
  { key: 'hover', label: 'Hover', text: 'Row cell text', state: 'split' },
  {
    key: 'selected',
    label: 'Selected / active',
    text: 'Row cell text',
    state: 'selected',
  },
  { key: 'error', label: 'Error', text: 'Row cell text', state: 'error' },
  { key: 'disabled', label: 'Disabled', text: 'Row cell text', state: 'disabled' },
];

export const TABLE_STATE_COLUMNS: TableColumnsType<TableStateRow> = [
  {
    title: <DsTableHeaderTitle label="State" />,
    dataIndex: 'label',
    key: 'label',
    width: 180,
    render: (label: string) => <DsTableBodyText text={label} />,
  },
  {
    title: <DsTableHeaderTitle label="Table Header" />,
    dataIndex: 'text',
    key: 'text',
    render: (text: string) => <DsTableBodyText text={text} />,
  },
];

/** Stable column refs — avoid recreating on each render (breaks sort/filter/pagination). */
export const BASIC_SORT_FILTER_COLUMNS = createSortFilterColumns(
  TABLE_COLUMN_KEYS.slice(0, -1),
);
export const NO_RECORDS_COLUMNS = createPlainColumns(TABLE_COLUMN_KEYS.slice(0, 4));
export const SORT_FILTER_COLUMNS = createSortFilterColumns();
export const CONTAINER_TABLE_COLUMNS = createContainerTableColumns();
export const TEMPLATE_TABLE_DATA = createTemplateTableData(5);
