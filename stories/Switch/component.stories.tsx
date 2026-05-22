import type { Meta, StoryObj } from '@storybook/react';
import type { DsSwitchProps } from '../../src/components/Switch';
import {
  DsSwitch,
  DS_SWITCH_CONTENTS,
  DS_SWITCH_SIZES,
} from '../../src/components/Switch';
import './component.stories.css';

const FIGMA = {
  canvas: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-12305',
  basic: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-13324',
  textIcon: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-13325',
  toggle: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=12128-6648',
} as const;

const meta: Meta<DsSwitchProps> = {
  title: 'Components/Switch',
  component: DsSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Switch** — Ant Design Switch with Figma track tokens (**Base** 44×22, **Small** 28×16).',
      },
    },
    design: { type: 'figma', url: FIGMA.canvas },
  },
  args: {
    size: 'base',
    content: 'basic',
    defaultChecked: false,
    disabled: false,
    loading: false,
    showLabel: false,
  },
  argTypes: {
    size: { control: 'select', options: DS_SWITCH_SIZES },
    content: {
      control: 'select',
      options: DS_SWITCH_CONTENTS,
      description: 'Inner track content preset',
    },
    label: { control: 'text' },
    showLabel: {
      control: 'boolean',
      description: 'Toggle layout with label (Figma Toggle)',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    checkedChildren: { table: { disable: true } },
    unCheckedChildren: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsSwitchProps>;

/** Default **Base** switch (Figma Size=Base, State=Default). */
export const Basic: Story = {
  args: {
    size: 'base',
    content: 'basic',
    defaultChecked: true,
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story: 'Basic switch at **base** size — selected teal track and white handle.',
      },
    },
  },
};

/** Number (**1** / **0**) and icon (**check**) variants. */
export const TextAndIcon: Story = {
  render: () => (
    <div className="ds-switch-stories-row">
      <DsSwitch size="base" content="number" defaultChecked />
      <DsSwitch size="base" content="icon" defaultChecked />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.textIcon },
    docs: {
      description: {
        story:
          '**Number** (`checkedChildren="1"`, `unCheckedChildren="0"`) and **icon** (`CheckOutlined`) presets at base size.',
      },
    },
  },
};

/** Label + switch — on and off (Figma Toggle). */
export const Toggle: Story = {
  render: () => (
    <div className="ds-switch-stories-stack">
      <DsSwitch size="base" showLabel label="Label" defaultChecked />
      <DsSwitch size="base" showLabel label="Label" defaultChecked={false} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.toggle },
    docs: {
      description: {
        story: 'Toggle row with **Label** and base switch — active and inactive states.',
      },
    },
  },
};
