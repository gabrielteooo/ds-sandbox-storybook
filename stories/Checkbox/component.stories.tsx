import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import type { DsCheckboxProps } from '../../src/components/Checkbox';
import { DsCheckbox, DS_CHECKBOX_STATES } from '../../src/components/Checkbox';
import { DsCheckboxCheckAll } from '../../src/components/Checkbox/DsCheckboxCheckAll';

/** Controlled wrapper so Basic can be clicked while Controls still drive `checked`. */
function InteractiveCheckbox(args: DsCheckboxProps) {
  const [checked, setChecked] = useState(args.checked ?? false);
  const [indeterminate, setIndeterminate] = useState(args.indeterminate ?? false);

  useEffect(() => {
    setChecked(args.checked ?? false);
  }, [args.checked]);

  useEffect(() => {
    setIndeterminate(args.indeterminate ?? false);
  }, [args.indeterminate]);

  return (
    <DsCheckbox
      {...args}
      checked={checked}
      indeterminate={indeterminate}
      onChange={(event) => {
        setChecked(event.target.checked);
        setIndeterminate(event.target.indeterminate ?? false);
        args.onChange?.(event);
      }}
    />
  );
}

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
  render: (args) => <InteractiveCheckbox {...args} />,
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
        story:
          'Default checkbox with label — click to toggle. **Controls** still set checked / indeterminate / disabled.',
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
