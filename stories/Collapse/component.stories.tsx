import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DsCollapse,
  DsCollapseDrawerHeader,
  type DsCollapseProps,
  DS_COLLAPSE_EXPAND_ICON_POSITIONS,
  DS_COLLAPSE_SIZES,
} from '../../src/components/Collapse';
import '../../src/components/Collapse/component.css';

const FIGMA = {
  collapseGroup:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=1218-22617',
  collapseItem:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=407-46',
  collapseDrawerHeader:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=10647-1971',
} as const;

const DEFAULT_BODY =
  'Authoritatively disseminate prospective leadership via opportunities economically sound.';

const COLLAPSE_ITEMS: DsCollapseProps['items'] = [
  { key: '1', label: 'Section Header', children: DEFAULT_BODY },
  { key: '2', label: 'Section Header' },
  { key: '3', label: 'Section Header' },
  { key: '4', label: 'Section Header' },
];

const meta: Meta<DsCollapseProps> = {
  title: 'Components/Collapse',
  component: DsCollapse,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Collapse** (Ant Design + tokens). Basic bordered accordion built from collapse-item (407:46) and collapse-group (1218:22617). Includes collapse-drawer-header (10647:1971) for drawer section titles.',
      },
    },
    design: { type: 'figma', url: FIGMA.collapseGroup },
  },
  args: {
    items: COLLAPSE_ITEMS,
    size: 'default',
    expandIconPosition: 'left',
    defaultActiveKey: ['1'],
    accordion: false,
    bordered: true,
  },
  argTypes: {
    size: {
      control: 'select',
      options: DS_COLLAPSE_SIZES,
      description: 'Panel size — Default, Small, or Large (407:46).',
    },
    expandIconPosition: {
      control: 'select',
      options: DS_COLLAPSE_EXPAND_ICON_POSITIONS,
      description: 'Chevron placement — Left or Right (407:46).',
    },
    defaultActiveKey: {
      control: 'object',
      description: 'Initially expanded panel key(s). Figma default group opens panel 1.',
    },
    accordion: {
      control: 'boolean',
      description: 'When true, only one panel can be expanded at a time.',
    },
    bordered: {
      control: 'boolean',
      description: 'Show outer border and dividers (Figma Type=Basic).',
    },
    activeKey: { table: { disable: true } },
    onChange: { table: { disable: true } },
    items: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsCollapseProps>;

/** Figma 1218:22617 — default-size basic collapse group; first panel expanded. */
export const Default: Story = {
  render: (args) => {
    const [activeKey, setActiveKey] = useState<string | string[]>(
      args.defaultActiveKey ?? ['1'],
    );

    return (
      <div style={{ width: 548 }}>
        <DsCollapse
          {...args}
          activeKey={activeKey}
          onChange={(keys) => setActiveKey(keys)}
        />
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.collapseGroup },
    docs: {
      description: {
        story:
          'Default-size basic collapse group (1218:22617). Click panel headers to expand or collapse sections.',
      },
    },
  },
};

/** Figma 10647:1971 — drawer / filter panel section header states. */
export const DrawerHeader: Story = {
  render: () => (
    <div style={{ width: 438, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DsCollapseDrawerHeader expanded={false}>Header</DsCollapseDrawerHeader>
      <DsCollapseDrawerHeader expanded>Header</DsCollapseDrawerHeader>
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.collapseDrawerHeader },
    docs: {
      description: {
        story:
          'Collapse drawer header (10647:1971) — collapsed vs expanded section title used in drawer filter panels.',
      },
    },
  },
};
