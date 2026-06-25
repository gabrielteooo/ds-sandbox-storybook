import type { Meta, StoryObj } from '@storybook/react';
import { DsChip, type DsChipProps, DS_CHIP_SIZES } from '../../src/components/Chip';
import '../../src/components/Chip/component.css';

const FIGMA = {
  componentSet:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=16020-3829',
  withBadgeBase:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=16020-3828',
  textOnlyBase:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=16020-3830',
  withBadgeSmall:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=16237-9631',
} as const;

const meta: Meta<DsChipProps> = {
  title: 'Components/Chip',
  component: DsChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Chip** (Ant Design Button + tokens). Filter chip with optional leading badge — Figma 16020:3829.',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    label: 'Overdue EDO',
    size: 'base',
    withBadge: true,
    badgeCount: 24,
    disabled: false,
    selected: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text.',
    },
    size: {
      control: 'select',
      options: DS_CHIP_SIZES,
      description: 'Figma Size=Base (40px) or Small (30px).',
    },
    withBadge: {
      control: 'boolean',
      description: 'Figma With Badge=yes — count pill (base) or dot indicator (small).',
    },
    badgeCount: {
      control: 'text',
      description: 'Count shown in base-size badge pill.',
    },
    disabled: {
      control: 'boolean',
      description: 'Figma State=Disabled.',
    },
    selected: {
      control: 'boolean',
      description: 'Figma State=Pressed — active/selected filter chip.',
    },
    defaultSelected: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsChipProps>;

/** Figma 16020:3829 — three default chip types in one view. */
export const DefaultTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
      }}
    >
      <DsChip withBadge size="base" badgeCount={24} label="Overdue EDO" />
      <DsChip withBadge={false} size="base" label="Overdue EDO" />
      <DsChip withBadge size="small" label="Overdue EDO" />
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.componentSet },
    docs: {
      description: {
        story:
          'Default-state chips (16020:3829): With Badge + Base (16020:3828), text-only Base (16020:3830), and With Badge + Small (16237:9631).',
      },
    },
  },
};
