import type { Meta, StoryObj } from '@storybook/react';
import {
  DS_GLOBAL_HEADER_TYPES,
  DsDashboardHeader,
  DsGlobalHeader,
  type DsDashboardHeaderProps,
  type DsGlobalHeaderProps,
} from '../../src/components/GlobalHeader';
import '../../src/components/Button/component.css';
import '../../src/components/GlobalHeader/component.css';
import '../../src/components/Select/component.css';
import './component.stories.css';

const FIGMA = {
  globalHeader:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=700-84831',
  headerTitle:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=4822-86378',
  withTabs:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22770-17801',
  withSearch:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=5937-21709',
  dashboardHeader:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=4212-91089',
  dashboardFilter:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22503-28865',
  dashboardFilterExpanded:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22778-3424',
  qlikFilterBar:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=4276-31326',
} as const;

const meta: Meta<DsGlobalHeaderProps> = {
  title: 'Components/Global Header',
  component: DsGlobalHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Global Header** (700:84831). Toggle **type** in controls to switch Default, With Tabs, and With Search variants.',
      },
    },
    design: { type: 'figma', url: FIGMA.globalHeader },
  },
  args: {
    type: 'default',
    title: 'Current page title',
    showBreadcrumbs: true,
    showDataSync: true,
    dataSyncLabel: 'Data last retrieved on',
    dataSyncTimestamp: '01 Oct 2024, 09:15 SGT',
    showPrimaryAction: true,
    primaryActionLabel: 'Button',
    showCollapseFilters: true,
    showNotifications: true,
    showHelp: true,
    showAvatar: true,
    avatarText: 'JD',
    searchPlaceholder: 'Search for keywords',
    defaultActiveTabKey: '1',
  },
  argTypes: {
    type: {
      control: 'select',
      options: DS_GLOBAL_HEADER_TYPES,
      description:
        'Figma variant — Default (1109:172976), With Tabs (22770:17801), With Search (5937:21709).',
    },
    title: {
      control: 'text',
      description: 'Page title — Figma Header-title 4822:86378.',
    },
    showBreadcrumbs: { control: 'boolean' },
    showDataSync: {
      control: 'boolean',
      if: { arg: 'type', neq: 'with-search' },
    },
    dataSyncLabel: {
      control: 'text',
      if: { arg: 'type', neq: 'with-search' },
    },
    dataSyncTimestamp: {
      control: 'text',
      if: { arg: 'type', neq: 'with-search' },
    },
    showPrimaryAction: {
      control: 'boolean',
      if: { arg: 'type', neq: 'with-search' },
    },
    primaryActionLabel: {
      control: 'text',
      if: { arg: 'type', neq: 'with-search' },
    },
    showCollapseFilters: {
      control: 'boolean',
      if: { arg: 'type', neq: 'with-search' },
    },
    searchPlaceholder: {
      control: 'text',
      if: { arg: 'type', eq: 'with-search' },
    },
    defaultActiveTabKey: {
      control: 'text',
      if: { arg: 'type', eq: 'with-tabs' },
    },
    showNotifications: { control: 'boolean' },
    showHelp: { control: 'boolean' },
    showAvatar: { control: 'boolean' },
    avatarText: { control: 'text' },
    breadcrumbItems: { table: { disable: true } },
    tabItems: { table: { disable: true } },
    activeTabKey: { table: { disable: true } },
    searchValue: { table: { disable: true } },
    defaultSearchValue: { table: { disable: true } },
    onTabChange: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    onPrimaryActionClick: { table: { disable: true } },
    onCollapseFiltersClick: { table: { disable: true } },
    onNotificationsClick: { table: { disable: true } },
    onHelpClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsGlobalHeaderProps>;

/** Toggle **type** in controls to preview each Figma variant. */
export const Default: Story = {
  render: (args) => (
    <div className="ds-global-header-story">
      <DsGlobalHeader {...args} />
    </div>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA.globalHeader,
    },
    docs: {
      description: {
        story:
          'Use the **type** control to switch between Default, With Tabs, and With Search. Related controls appear based on the selected variant.',
      },
    },
  },
};

/** Select filter categories to add Qlik chips; clear chips or use Reset to remove filters. */
export const DashboardHeader: StoryObj<DsDashboardHeaderProps> = {
  render: (args) => (
    <div className="ds-global-header-story">
      <DsDashboardHeader {...args} />
    </div>
  ),
  args: {
    title: 'Current page title',
    showBreadcrumbs: true,
    showDataSync: true,
    dataSyncLabel: 'Data last retrieved on',
    dataSyncTimestamp: '01 Oct 2024, 09:15 SGT',
    showPrimaryAction: true,
    primaryActionLabel: 'View in Qlik',
    showCollapseFilters: true,
    showNotifications: true,
    showHelp: true,
    showAvatar: false,
  },
  argTypes: {
    defaultFilterValues: { table: { disable: true } },
    searchPlaceholder: { table: { disable: true } },
    defaultActiveTabKey: { table: { disable: true } },
    tabItems: { table: { disable: true } },
    activeTabKey: { table: { disable: true } },
    searchValue: { table: { disable: true } },
    defaultSearchValue: { table: { disable: true } },
    onTabChange: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    avatarText: { table: { disable: true } },
  },
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA.dashboardFilterExpanded,
    },
    docs: {
      description: {
        story:
          'Dashboard Header variant (4212:91089) — click **More filters** to reveal four additional filters in a second row (22778:3424). Select a category in any filter dropdown to add a Qlik chip. Remove a chip with its clear icon, **Reset**, or the Qlik bar clear action.',
      },
    },
  },
};
