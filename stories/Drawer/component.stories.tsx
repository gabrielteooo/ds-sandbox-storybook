import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DsButton } from '../../src/components/Button';
import { DsDrawer, type DsDrawerProps } from '../../src/components/Drawer';
import '../../src/components/Button/component.css';
import '../../src/components/Drawer/component.css';

const FIGMA = {
  drawerRight:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14508',
  drawerHeader:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=7031-61723',
  drawerActions:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=7031-61749',
} as const;

const meta: Meta<DsDrawerProps> = {
  title: 'Components/Drawer',
  component: DsDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Drawer** (Ant Design + tokens). Right-placement panel with Drawer_Header (7031:61723), content slot, and Drawer_Actions footer (7031:61749). Matches Figma Placement=Right (421:14508).',
      },
    },
    design: { type: 'figma', url: FIGMA.drawerRight },
  },
  args: {
    open: false,
    title: 'Title',
    placement: 'right',
    showFooter: true,
    cancelText: 'Cancel',
    secondaryActionLabel: 'Button',
    primaryActionLabel: 'Button',
    maskClosable: true,
    closable: true,
    destroyOnClose: true,
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the drawer is visible.',
    },
    title: {
      control: 'text',
      description: 'Drawer header title — Figma Drawer_Header 7031:61723.',
    },
    content: {
      control: 'text',
      description: 'Body copy (alias for children).',
    },
    placement: {
      control: false,
      description: 'Figma story shows right placement only (421:14508).',
    },
    width: {
      control: 'number',
      description: 'Drawer width in px (default: 462).',
    },
    showFooter: {
      control: 'boolean',
      description: 'Show Drawer_Actions footer (7031:61749).',
    },
    cancelText: {
      control: 'text',
      description: 'Tertiary cancel action on the footer left.',
    },
    secondaryActionLabel: {
      control: 'text',
      description: 'Secondary button label on the footer right.',
    },
    primaryActionLabel: {
      control: 'text',
      description: 'Primary button label on the footer right.',
    },
    maskClosable: {
      control: 'boolean',
      description: 'Close when clicking the overlay mask.',
    },
    closable: {
      control: 'boolean',
      description: 'Show header close icon.',
    },
    onClose: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    onSecondaryAction: { table: { disable: true } },
    onPrimaryAction: { table: { disable: true } },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
    className: { table: { disable: true } },
    destroyOnClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsDrawerProps>;

/** Figma 421:14508 — click **Open drawer**; close via mask, header X, or **Cancel**. */
export const Right: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: 24 }}>
        <DsButton
          variant="primary"
          size="base"
          label="Open drawer"
          onClick={() => setOpen(true)}
        />
        <DsDrawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onSecondaryAction={() => setOpen(false)}
          onPrimaryAction={() => setOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.drawerRight },
    docs: {
      description: {
        story:
          'Right-placement drawer (421:14508). Open with the trigger button; dismiss by clicking the overlay, the header close icon, **Cancel**, or either footer button.',
      },
    },
  },
};
