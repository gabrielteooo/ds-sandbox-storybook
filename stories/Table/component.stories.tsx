import type { Meta, StoryObj } from '@storybook/react';
import type { TableColumnsType } from 'antd';
import { useMemo, useState, type Key } from 'react';
import { DsButton } from '../../src/components/Button';
import { DsCard } from '../../src/components/Card';
import { DsCheckbox } from '../../src/components/Checkbox';
import { DsPagination } from '../../src/components/Pagination';
import { DsRadio } from '../../src/components/Radio';
import {
  DsTable,
  DsTableBodyText,
  DsTableColumnActions,
  getDsTableRowClassName,
} from '../../src/components/Table';
import {
  DsIconArrowDownToLine,
  DsIconExpand,
  DsIconTable,
} from '../../src/icons';
import {
  BASIC_SORT_FILTER_COLUMNS,
  CONTAINER_TABLE_COLUMNS,
  NO_RECORDS_SORT_FILTER_COLUMNS,
  TABLE_STATE_COLUMNS,
  TABLE_STATE_ROWS,
  TEMPLATE_TABLE_DATA,
  type TableStateRow,
  type TemplateTableRow,
} from './tableStoryHelpers';
import './component.stories.css';

const FIGMA = {
  basicTable: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=599-6835',
  actions: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22761-7429',
  containerBasic:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22553-74924',
  containerBatchActions:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22553-78795',
  containerNoRecords:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22672-18499',
} as const;

interface ActionsRow {
  key: string;
  text: string;
}

interface BasicTableArgs {
  striped: boolean;
  bordered: boolean;
  framed: boolean;
  withSelection: boolean;
}

const ACTIONS_DATA: ActionsRow[] = Array.from({ length: 4 }, (_, index) => ({
  key: String(index + 1),
  text: 'Row cell text',
}));

function TableCardHeaderActions() {
  return (
    <div className="ds-table-story__card-actions">
      <DsButton
        variant="secondary"
        size="small"
        iconOnly
        icon={<DsIconTable size={14} />}
        label="Table view"
      />
      <DsButton
        variant="secondary"
        size="small"
        iconOnly
        icon={<DsIconArrowDownToLine size={16} />}
        label="Download"
      />
      <DsButton
        variant="secondary"
        size="small"
        iconOnly
        icon={<DsIconExpand size={16} />}
        label="Expand"
      />
    </div>
  );
}

function TableEmptyState() {
  return (
    <div className="ds-table-story__empty">
      <p className="text-base-strong ds-table-story__empty-title">No records found</p>
      <p className="text-base-normal ds-table-story__empty-description">
        Try using different keywords or adjusting your filters to find what you are looking for.
      </p>
    </div>
  );
}

const CONTAINER_TABLE_TOTAL = 604;

function useContainerTablePagination() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  return {
    page,
    pageSize,
    onPaginationChange: (nextPage: number, nextPageSize: number) => {
      setPage(nextPage);
      setPageSize(nextPageSize);
    },
  };
}

function BasicTableStory({
  striped,
  bordered,
  framed,
  withSelection,
}: BasicTableArgs) {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  return (
    <div className="ds-table-story ds-table-story--full">
      <DsTable<TemplateTableRow>
        key={`${striped}-${bordered}-${framed}-${withSelection}`}
        size="small"
        striped={striped}
        framed={framed}
        bordered={bordered}
        pagination={false}
        columns={BASIC_SORT_FILTER_COLUMNS}
        dataSource={TEMPLATE_TABLE_DATA}
        rowSelection={
          withSelection
            ? {
                selectedRowKeys: selectedKeys,
                onChange: (keys) => setSelectedKeys(keys),
              }
            : undefined
        }
      />
    </div>
  );
}

function ActionsTableStory() {
  const [selectedRadio, setSelectedRadio] = useState('1');
  const [checkedKeys, setCheckedKeys] = useState<Record<string, boolean>>({
    '1': false,
    '2': true,
    '3': false,
    '4': false,
  });

  const columns = useMemo<TableColumnsType<ActionsRow>>(
    () => [
      {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (text) => <DsTableBodyText text={text} />,
      },
      {
        title: 'Radio',
        key: 'radio',
        width: 140,
        align: 'center',
        render: (_, record) => (
          <DsRadio
            checked={selectedRadio === record.key}
            showLabel={false}
            onChange={() => setSelectedRadio(record.key)}
          />
        ),
      },
      {
        title: 'Checkbox',
        key: 'checkbox',
        width: 140,
        align: 'center',
        render: (_, record) => (
          <DsCheckbox
            checked={checkedKeys[record.key]}
            showLabel={false}
            onChange={(event) =>
              setCheckedKeys((prev) => ({
                ...prev,
                [record.key]: event.target.checked,
              }))
            }
          />
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 178,
        onCell: () => ({ className: 'ds-table__actions-cell' }),
        render: () => <DsTableColumnActions count={3} size="small" />,
      },
    ],
    [checkedKeys, selectedRadio],
  );

  return (
    <div className="ds-table-story ds-table-story--full">
      <DsTable<ActionsRow>
        size="small"
        striped
        bordered
        framed
        pagination={false}
        columns={columns}
        dataSource={ACTIONS_DATA}
      />
    </div>
  );
}

function TableStatesStory() {
  return (
    <div className="ds-table-story ds-table-story--full">
      <DsTable<TableStateRow>
        size="small"
        bordered
        framed
        pagination={false}
        columns={TABLE_STATE_COLUMNS}
        dataSource={TABLE_STATE_ROWS}
        rowClassName={(record) => getDsTableRowClassName(record.state)}
      />
    </div>
  );
}

function ContainerTableBasicStory() {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(['2']);
  const { page, pageSize, onPaginationChange } = useContainerTablePagination();

  return (
    <div className="ds-table-story ds-table-story--container">
      <DsCard
        size="default"
        title="Table Records"
        showExtra={false}
        extra={<TableCardHeaderActions />}
        className="ds-table-story__container-card"
      >
        <div className="ds-table-story__table-wrap">
          <DsTable<TemplateTableRow>
            size="middle"
            striped
            bordered
            pagination={false}
            scroll={{ x: 'max-content' }}
            columns={CONTAINER_TABLE_COLUMNS}
            dataSource={TEMPLATE_TABLE_DATA}
            rowSelection={{
              selectedRowKeys: selectedKeys,
              onChange: (keys) => setSelectedKeys(keys),
            }}
          />
        </div>
        <DsPagination
          className="ds-table-story__pagination"
          total={CONTAINER_TABLE_TOTAL}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </DsCard>
    </div>
  );
}

function ContainerTableBatchActionsStory() {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(['1', '2', '3']);
  const { page, pageSize, onPaginationChange } = useContainerTablePagination();

  return (
    <div className="ds-table-story ds-table-story--container">
      <DsCard
        size="default"
        title="Table Records"
        showExtra={false}
        extra={<TableCardHeaderActions />}
        className="ds-table-story__container-card"
      >
        <div className="ds-table-story__batch-actions">
          <p className="text-base-strong ds-table-story__batch-actions-title">
            {selectedKeys.length} items selected
          </p>
          <div className="ds-table-story__batch-actions-buttons">
            <DsButton variant="secondary" size="small" label="Action" />
            <DsButton variant="secondary" size="small" label="Action" />
          </div>
        </div>
        <div className="ds-table-story__table-wrap ds-table-story__table-wrap--with-batch">
          <DsTable<TemplateTableRow>
            size="middle"
            striped
            bordered
            pagination={false}
            scroll={{ x: 'max-content' }}
            columns={CONTAINER_TABLE_COLUMNS}
            dataSource={TEMPLATE_TABLE_DATA}
            rowSelection={{
              selectedRowKeys: selectedKeys,
              onChange: (keys) => setSelectedKeys(keys),
            }}
          />
        </div>
        <DsPagination
          className="ds-table-story__pagination"
          total={CONTAINER_TABLE_TOTAL}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </DsCard>
    </div>
  );
}

function ContainerTableNoRecordsStory() {
  return (
    <div className="ds-table-story ds-table-story--container">
      <DsCard
        size="default"
        title="Table Records"
        showExtra={false}
        extra={<TableCardHeaderActions />}
        className="ds-table-story__container-card"
      >
        <DsTable<TemplateTableRow>
          size="middle"
          bordered
          pagination={false}
          columns={NO_RECORDS_SORT_FILTER_COLUMNS}
          dataSource={[]}
          locale={{ emptyText: <TableEmptyState /> }}
        />
      </DsCard>
    </div>
  );
}

const meta: Meta<BasicTableArgs> = {
  title: 'Components/Table',
  component: DsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Table** — full-table examples only. Uses `DsButton`, `DsCheckbox`, `DsRadio`, typography tokens, and `--component-table-*` colour tokens.',
      },
    },
    design: { type: 'figma', url: FIGMA.basicTable },
  },
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Zebra rows using --component-table-bg-row-split.',
    },
    bordered: { control: 'boolean', description: 'Column grid borders.' },
    framed: {
      control: 'boolean',
      description: 'Outer frame border + 8px radius.',
    },
    withSelection: {
      control: 'boolean',
      description: 'Checkbox selection column.',
    },
  },
};

export default meta;
type Story = StoryObj<BasicTableArgs>;

export const BasicTable: Story = {
  args: {
    striped: true,
    bordered: true,
    framed: true,
    withSelection: true,
  },
  render: (args) => <BasicTableStory {...args} />,
  parameters: {
    design: { type: 'figma', url: FIGMA.basicTable },
    docs: {
      description: {
        story:
          'Small (S) table — 32px header, 46px body rows, sort/filter icons, optional checkbox column. Use Controls to toggle striped, bordered, framed, and selection.',
      },
    },
  },
};

export const Actions: Story = {
  render: () => <ActionsTableStory />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.actions },
    docs: {
      description: {
        story:
          'Row patterns with `DsRadio`, `DsCheckbox`, and tertiary `DsButton` actions — zebra striping, bordered grid, framed outer border.',
      },
    },
  },
};

export const TableStates: Story = {
  render: () => <TableStatesStory />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Row state tokens — Hover (`--component-table-bg-row-split`), Selected / active (`--color-system-control-bg-option-select`), Error (`--color-system-error-bg`), Disabled (`--color-text-disabled`). Hover also applies on mouse-over for default rows.',
      },
    },
  },
};

export const ContainerTableBasic: Story = {
  render: () => <ContainerTableBasicStory />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.containerBasic },
    docs: {
      description: {
        story:
          'Container table inside `DsCard` — header icon actions, checkbox + sort/filter columns, fixed Actions column, and pagination footer.',
      },
    },
  },
};

export const ContainerTableBatchActions: Story = {
  render: () => <ContainerTableBatchActionsStory />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.containerBatchActions },
    docs: {
      description: {
        story:
          'Batch actions bar with selection count and secondary buttons above a checkbox table with fixed Actions column.',
      },
    },
  },
};

export const ContainerTableNoRecords: Story = {
  render: () => <ContainerTableNoRecordsStory />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.containerNoRecords },
    docs: {
      description: {
        story:
          'Empty container table — `text-base-strong` title and `text-base-normal` description when no data is available.',
      },
    },
  },
};
