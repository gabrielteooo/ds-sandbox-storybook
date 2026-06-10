import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DsNavigationMenu,
  type DsNavigationMenuProps,
} from '../../src/components/NavigationMenu';
import '../../src/components/Input/component.css';
import '../../src/components/NavigationMenu/component.css';

const FIGMA = {
  navigationMenu:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=218-15636',
  menuLogo:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22506-8661',
  menuItem:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=376-28894',
  menuItemParent:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=376-29067',
  menuWithChild:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=1213-27091',
} as const;

const meta: Meta<DsNavigationMenuProps> = {
  title: 'Components/Navigation Menu',
  component: DsNavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Navigation Menu** (218:15636). Dark sidemenu with logo header, search, inline navigation items, expandable submenus, and collapse footer. Click **Collapse Menu** to toggle collapsed state.',
      },
    },
    design: { type: 'figma', url: FIGMA.navigationMenu },
  },
  args: {
    defaultCollapsed: false,
    showSearch: true,
    searchPlaceholder: 'Search',
    logoLabel: 'Fleet Management System',
    defaultSelectedKeys: ['home'],
    defaultOpenKeys: ['sub1'],
  },
  argTypes: {
    defaultCollapsed: {
      control: 'boolean',
      description: 'Initial collapsed state — use Collapse Menu in the story to toggle.',
    },
    showSearch: { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
    logoLabel: { control: 'text' },
    defaultSelectedKeys: { control: 'object' },
    defaultOpenKeys: { control: 'object' },
    items: { table: { disable: true } },
    collapsed: { table: { disable: true } },
    selectedKeys: { table: { disable: true } },
    openKeys: { table: { disable: true } },
    onCollapseChange: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    onLogoutClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsNavigationMenuProps>;

/** Click **Collapse Menu** in the footer to collapse/expand the sidemenu. */
export const Default: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(args.defaultCollapsed ?? false);

    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <DsNavigationMenu
          {...args}
          collapsed={collapsed}
          onCollapseChange={setCollapsed}
        />
        <div
          style={{
            flex: 1,
            padding: 24,
            background: 'var(--color-bg-layout)',
            color: 'var(--color-text-default)',
          }}
        >
          <p className="text-base-normal">
            Main content area — use the sidemenu footer to collapse the navigation
            menu.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.navigationMenu },
    docs: {
      description: {
        story:
          'Full navigation menu (218:15636) — logo (22506:8661), menu items (376:28894), submenu parent (376:29067), and submenu children (1213:27091). Click **Collapse Menu** to switch to the icon-only collapsed layout.',
      },
    },
  },
};
