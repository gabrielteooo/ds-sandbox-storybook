import type { Meta, StoryObj } from '@storybook/react';
import { DsButton } from '../../src/components/Button';
import '../../src/components/Button/component.css';
import { DsAppShell, type DsAppShellProps } from '../../src/templates/AppShell';

const meta: Meta<DsAppShellProps> = {
  title: 'Templates/App Shell',
  component: DsAppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Application shell for product screens — global header, optional sidebar navigation, and a content slot. Use as the outer frame when implementing pages from Figma.',
      },
    },
  },
  args: {
    productName: 'MCP DS Sandbox',
    showSidebar: true,
    selectedNavKey: 'home',
  },
  argTypes: {
    productName: { control: 'text' },
    showSidebar: { control: 'boolean' },
    selectedNavKey: { control: 'text' },
    navItems: { table: { disable: true } },
    headerExtra: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsAppShellProps>;

const sampleContent = (
  <div
    style={{
      padding: 24,
      background: '#fff',
      borderRadius: 8,
      border: '1px dashed #d9d9d9',
      color: 'rgba(0,0,0,0.55)',
      minHeight: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Main content area
  </div>
);

/** Header + sidebar + content — default product chrome. */
export const Default: Story = {
  render: (args) => <DsAppShell {...args}>{sampleContent}</DsAppShell>,
};

/** Global header only — no sidebar (e.g. auth or marketing flows). */
export const HeaderOnly: Story = {
  args: {
    showSidebar: false,
  },
  render: (args) => <DsAppShell {...args}>{sampleContent}</DsAppShell>,
};

/** Example header actions in the global header slot. */
export const WithHeaderActions: Story = {
  render: (args) => (
    <DsAppShell
      {...args}
      headerExtra={<DsButton variant="primary" size="small" label="Action" />}
    >
      {sampleContent}
    </DsAppShell>
  ),
};
