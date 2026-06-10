import type { Meta, StoryObj } from '@storybook/react';
import {
  DsAppShell,
  type DsAppShellProps,
} from '../../src/templates/AppShell';
import '../../src/templates/AppShell/component.css';

const FIGMA = {
  application:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22552-74306',
  dashboard:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22552-74949',
} as const;

const meta: Meta<DsAppShellProps> = {
  title: 'Templates/App Shell',
  component: DsAppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Application shell composed from **Navigation Menu**, **Global Header** (or **Dashboard Header**), and a topology-pattern content area. Use as the outer frame when implementing product pages from Figma.',
      },
    },
  },
  args: {
    variant: 'application',
    showSidebar: true,
    defaultNavCollapsed: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['application', 'dashboard'],
      description: 'Application page (default header) or Dashboard page (filters + Qlik bar).',
    },
    showSidebar: { control: 'boolean' },
    defaultNavCollapsed: { control: 'boolean' },
    children: { table: { disable: true } },
    applicationHeaderProps: { table: { disable: true } },
    dashboardHeaderProps: { table: { disable: true } },
    navCollapsed: { table: { disable: true } },
    onNavCollapseChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsAppShellProps>;

/** Figma App shell/Application page — global header + empty topology content area. */
export const ApplicationPage: Story = {
  args: {
    variant: 'application',
  },
  render: (args) => <DsAppShell {...args} />,
  parameters: {
    design: { type: 'figma', url: FIGMA.application },
    docs: {
      description: {
        story:
          'Default application page shell with breadcrumbs, data sync metadata, and utility actions. Content area uses the FMS topographic background pattern.',
      },
    },
  },
};

/** Figma App shell/Dashboard page — dashboard header with filters and Qlik bar. */
export const DashboardPage: Story = {
  args: {
    variant: 'dashboard',
  },
  render: (args) => <DsAppShell {...args} />,
  parameters: {
    design: { type: 'figma', url: FIGMA.dashboard },
    docs: {
      description: {
        story:
          'Dashboard page shell with filter row, Qlik chip bar, and empty topology content area for widgets.',
      },
    },
  },
};
