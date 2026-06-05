import type { Meta, StoryObj } from '@storybook/react';
import {
  DsDropdown,
  type DsDropdownProps,
} from '../../src/components/Dropdown';
import './component.stories.css';

const FIGMA = {
  buttonBasic:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=371-10124',
  menuItem:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=375-2319',
  basic:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22754-14713',
  open:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22754-15462',
} as const;

/** Figma 22754:15462 — text-only items when menu is open. */
const BASE_ITEMS: DsDropdownProps['items'] = [
  { key: '1', label: 'Dropdown Item' },
  { key: '2', label: 'Dropdown Item' },
  { key: '3', label: 'Dropdown Item' },
];

const meta: Meta<DsDropdownProps> = {
  title: 'Components/Dropdown',
  component: DsDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Dropdown** (Ant Design + tokens). Click the trigger to open the menu below. Matches Figma 371:10124 (button), 375:2319 (menu item), and 22754:15462 (open state).',
      },
    },
    design: { type: 'figma', url: FIGMA.basic },
  },
  args: {
    label: 'Dropdown',
    disabled: false,
    trigger: ['click'],
    placement: 'bottomLeft',
    items: BASE_ITEMS,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text shown in the default trigger button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the trigger button.',
    },
    placement: {
      control: 'select',
      options: [
        'bottomLeft',
        'bottomRight',
        'bottomCenter',
        'topLeft',
        'topRight',
        'topCenter',
      ],
      description: 'Popup placement relative to the trigger.',
    },
    trigger: {
      control: 'check',
      options: ['click', 'hover'],
      description: 'Events that open the dropdown.',
    },
    selectedKeys: {
      control: false,
      description: 'Controlled selected keys for menu items.',
    },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    items: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsDropdownProps>;

/**
 * Figma 22754:14713 / 22754:15462 — click the trigger to open the menu
 * directly below with a 4px gap. Trigger shows pressed styling while open.
 */
export const Basic: Story = {
  render: (args) => (
    <div className="ds-dropdown-story-basic">
      <DsDropdown {...args} />
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.open },
    docs: {
      description: {
        story:
          'Click the trigger to open the menu below (4px gap). Trigger border and text turn active teal while open — matches Figma 22754:15462.',
      },
    },
  },
};
