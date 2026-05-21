import type { Meta, StoryObj } from '@storybook/react';
import type { DsCheckboxProps } from '../../src/components/Checkbox';
import { DsCheckbox, DS_CHECKBOX_STATES } from '../../src/components/Checkbox';
import { DsCheckboxCheckAll } from '../../src/components/Checkbox/DsCheckboxCheckAll';

const meta: Meta<DsCheckboxProps> = {
  title: 'Components/Checkbox',
  component: DsCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox Checkbox (Ant Design + tokens). Figma: 16px control, 8px label gap, SM/Normal typography.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=388-11396',
    },
  },
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: {
      control: 'select',
      options: DS_CHECKBOX_STATES,
    },
  },
};

export default meta;
type Story = StoryObj<DsCheckboxProps>;

export const Basic: Story = {
  args: {
    label: 'Checkbox',
    showLabel: true,
    checked: false,
    indeterminate: false,
    disabled: false,
    state: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default inactive checkbox with label (Status=Inactive, State=Default).',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="ds-checkbox-story-disabled">
      <DsCheckbox label="Checkbox" disabled checked />
      <DsCheckbox label="Checkbox" disabled />
      <DsCheckbox label="Checkbox" disabled indeterminate />
    </div>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22686-23861',
    },
    docs: {
      description: {
        story:
          'Disabled checkbox — checked, unchecked, and indeterminate (Figma State=Disabled).',
      },
    },
  },
};

export const CheckAll: Story = {
  render: () => <DsCheckboxCheckAll />,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22686-23778',
    },
    docs: {
      description: {
        story:
          'Interactive “check all” pattern: checking the parent selects all items; partial selection shows indeterminate on the parent.',
      },
    },
  },
};
