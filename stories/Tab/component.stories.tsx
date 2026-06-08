import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DsTabs,
  type DsTabsProps,
  DS_TAB_POSITIONS,
  DS_TAB_SIZES,
  DS_TAB_VARIANTS,
} from '../../src/components/Tab';
import './component.stories.css';

const FIGMA = {
  componentSet:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=512-65398',
  basic:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22758-578',
  containerItem:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=1819-69698',
  container:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22758-645',
} as const;

const TAB_ITEMS: DsTabsProps['items'] = [
  { key: '1', label: 'Tab 1', children: 'Content of tab 1' },
  { key: '2', label: 'Tab 2', children: 'Content of tab 2' },
  { key: '3', label: 'Tab 3', children: 'Content of tab 3' },
];

const meta: Meta<DsTabsProps> = {
  title: 'Components/Tab',
  component: DsTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Tabs** (Ant Design + tokens). **Basic** = line tabs (512:65398). **Container** = card tabs with nested content panel (1819:69698 / 22758:645).',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    variant: 'basic',
    size: 'default',
    tabPosition: 'top',
    items: TAB_ITEMS,
    defaultActiveKey: '1',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: DS_TAB_VARIANTS,
      description: 'Basic = line tabs; Container = card tabs with content panel.',
    },
    size: {
      control: 'select',
      options: DS_TAB_SIZES,
      description: 'Tab size — Small, Default, or Large.',
    },
    tabPosition: {
      control: 'select',
      options: DS_TAB_POSITIONS,
      description: 'Tab bar position relative to content.',
    },
    defaultActiveKey: {
      control: 'text',
      description: 'Initially active tab key.',
    },
    activeKey: { table: { disable: true } },
    onChange: { table: { disable: true } },
    items: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsTabsProps>;

/**
 * Figma 22758:578 — interactive 3-tab example. Click tabs to switch
 * content below (Content of tab 1 / 2 / 3).
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
  render: (args) => {
    const [activeKey, setActiveKey] = useState(args.defaultActiveKey ?? '1');

    return (
      <div className="ds-tab-story-basic">
        <DsTabs
          {...args}
          activeKey={activeKey}
          onChange={setActiveKey}
        />
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story:
          'Interactive basic tabs — click Tab 1, Tab 2, or Tab 3 to switch content. Matches Figma 22758:578.',
      },
    },
  },
};

/**
 * Figma 22758:645 — Container variant with card-style tab items
 * (1819:69698) and content panel nested directly below the tab row.
 */
export const Container: Story = {
  args: {
    variant: 'container',
    size: 'default',
    tabPosition: 'top',
  },
  render: (args) => {
    const [activeKey, setActiveKey] = useState(args.defaultActiveKey ?? '1');

    return (
      <div className="ds-tab-story-container">
        <DsTabs
          {...args}
          items={TAB_ITEMS}
          activeKey={activeKey}
          onChange={setActiveKey}
        />
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.container },
    docs: {
      description: {
        story:
          'Container tabs — grey inactive chips, white active tab, and content panel below. Click tabs to switch "Content of tab X". Matches Figma 22758:645.',
      },
    },
  },
};
