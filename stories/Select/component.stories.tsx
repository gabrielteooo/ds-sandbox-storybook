import type { Meta, StoryObj } from '@storybook/react';
import type { DsSelectProps } from '../../src/components/Select';
import {
  DsSelect,
  DS_SELECT_SIZES,
  DS_SELECT_STATUSES,
  DS_SELECT_VARIANTS,
} from '../../src/components/Select';
import {
  DS_SELECT_DEFAULT_OPTIONS,
  DS_SELECT_SCROLL_OPTIONS,
} from '../../src/components/Select/selectConstants';
import './component.stories.css';

const FIGMA = {
  selectInput: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=415-57',
  menuItem: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=1226-85295',
  selectMenu: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=4171-8655',
  multipleChip: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=1226-85294',
} as const;

const meta: Meta<DsSelectProps> = {
  title: 'Components/Select',
  component: DsSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `MCP DS Sandbox **Select** — **basic**, **multiple** (checkbox menu + Select all / Clear all), and **search** (filterable). Toggle **status** in Controls for warning/error on any variant.`,
      },
    },
    design: { type: 'figma', url: FIGMA.selectInput },
  },
  args: {
    variant: 'basic',
    status: 'default',
    placeholder: 'Select',
    options: [...DS_SELECT_DEFAULT_OPTIONS],
    size: 'small',
    disabled: false,
    allowClear: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: DS_SELECT_VARIANTS,
      description: 'Input behaviour: basic · multiple · search',
    },
    status: {
      control: 'select',
      options: DS_SELECT_STATUSES,
      description: 'Warning/error border (all variants)',
    },
    size: {
      control: 'select',
      options: DS_SELECT_SIZES,
    },
    options: { table: { disable: true } },
    suffixIcon: { table: { disable: true } },
    className: { table: { disable: true } },
    popupClassName: { table: { disable: true } },
    listHeight: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsSelectProps>;

/** Single select — chevron, clear when focused with value, 5 options (no scroll). */
export const Basic: Story = {
  args: {
    variant: 'basic',
    defaultValue: 'banana',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.selectInput },
    docs: {
      description: {
        story:
          'Basic single select: open menu (5 options), hover row, select with teal highlight + semibold label, clear via allowClear when focused.',
      },
    },
  },
};

/** Filterable single — search icon when open, type to filter (e.g. "Bana"). */
export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: 'Select',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.selectInput },
    docs: {
      description: {
        story:
          'Search select: magnifying glass suffix when open; filter options as you type; same menu styling as basic.',
      },
    },
  },
};

/** Checkbox options, Select all / Clear all header, tags + maxTagCount (+N). */
export const MultipleSelection: Story = {
  args: {
    variant: 'multiple',
    defaultValue: ['apple', 'banana'],
    maxTagCount: 2,
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.multipleChip },
    docs: {
      description: {
        story:
          'Multiple select: menu header actions, checkbox rows, grey chips with remove; shows "+N" when more than maxTagCount (2).',
      },
    },
  },
};

/** Eight options — listHeight limits visible rows to 5, scrollbar appears. */
export const WithScrollbar: Story = {
  args: {
    variant: 'basic',
    options: DS_SELECT_SCROLL_OPTIONS,
    placeholder: 'Select',
  },
  parameters: {
    docs: {
      description: {
        story: 'More than five options — dropdown scrolls (listHeight = 5 × 40px).',
      },
    },
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="ds-select-story-sizes">
      <div className="ds-select-story-sizes__row">
        <span className="ds-select-story-sizes__label">X-Small</span>
        <DsSelect {...args} size="x-small" defaultValue="apple" />
      </div>
      <div className="ds-select-story-sizes__row">
        <span className="ds-select-story-sizes__label">Small</span>
        <DsSelect {...args} size="small" defaultValue="banana" />
      </div>
      <div className="ds-select-story-sizes__row">
        <span className="ds-select-story-sizes__label">Base</span>
        <DsSelect {...args} size="base" defaultValue="carrot" />
      </div>
    </div>
  ),
  args: {
    variant: 'basic',
    status: 'default',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.selectInput },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'basic',
    disabled: true,
    defaultValue: 'banana',
  },
};
