import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from 'antd';
import { useState } from 'react';
import type {
  DsRadioGroupProps,
  DsRadioProps,
  DsRadioVerticalGroupProps,
} from '../../src/components/Radio';
import {
  DsRadio,
  DsRadioGroup,
  DsRadioVerticalGroup,
  DS_RADIO_GROUP_BUTTON_STYLES,
  DS_RADIO_GROUP_SIZES,
  DS_RADIO_STATES,
} from '../../src/components/Radio';

type BasicRadioPairArgs = Pick<DsRadioProps, 'disabled' | 'state' | 'showLabel'>;

function BasicRadioPair({ disabled = false, state = 'default', showLabel = true }: BasicRadioPairArgs) {
  const [value, setValue] = useState('option-1');
  const groupDisabled = disabled || state === 'disabled';

  return (
    <Radio.Group
      value={value}
      onChange={(event) => setValue(event.target.value)}
      disabled={groupDisabled}
      className="ds-radio-basic-group"
    >
      <DsRadio value="option-1" label="Radio button" showLabel={showLabel} state={state} />
      <DsRadio value="option-2" label="Radio button" showLabel={showLabel} state={state} />
    </Radio.Group>
  );
}

const meta: Meta<DsRadioProps> = {
  title: 'Components/Radio',
  component: DsRadio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox Radio (Ant Design + tokens). Figma: 16px control, 8px label gap, SM/Normal typography. Click to select (solid primary + white dot).',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=395-10973',
    },
  },
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: {
      control: 'select',
      options: DS_RADIO_STATES,
    },
    checked: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsRadioProps>;

const basicStoryArgTypes: Story['argTypes'] = {
  label: { table: { disable: true } },
  defaultChecked: { table: { disable: true } },
  checked: { table: { disable: true } },
  value: { table: { disable: true } },
  onChange: { table: { disable: true } },
  className: { table: { disable: true } },
};

export const Basic: Story = {
  render: (args) => (
    <BasicRadioPair
      disabled={args.disabled}
      state={args.state}
      showLabel={args.showLabel}
    />
  ),
  args: {
    showLabel: true,
    disabled: false,
    state: 'default',
  },
  argTypes: basicStoryArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=395-11364',
    },
    docs: {
      description: {
        story:
          'Two radio buttons in a group — click either to select (only one active). **Controls**: disabled, state, showLabel.',
      },
    },
  },
};

const staticStoryArgTypes: Story['argTypes'] = {
  label: { table: { disable: true } },
  showLabel: { table: { disable: true } },
  defaultChecked: { table: { disable: true } },
  checked: { table: { disable: true } },
  disabled: { table: { disable: true } },
  state: { table: { disable: true } },
  value: { table: { disable: true } },
  onChange: { table: { disable: true } },
  className: { table: { disable: true } },
};

export const Disabled: Story = {
  render: () => (
    <div className="ds-radio-story-disabled">
      <DsRadio label="Radio button" disabled />
      <DsRadio label="Radio button" disabled checked />
    </div>
  ),
  argTypes: staticStoryArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22686-23894',
    },
    docs: {
      description: {
        story: 'Disabled radio — unchecked and checked (Figma State=Disabled).',
      },
    },
  },
};

type RadioGroupStory = StoryObj<DsRadioGroupProps>;

const radioGroupOnlyArgTypes: RadioGroupStory['argTypes'] = {
  buttonStyle: {
    control: 'select',
    options: DS_RADIO_GROUP_BUTTON_STYLES,
    description: 'Segment style (Figma Style=)',
  },
  size: {
    control: 'select',
    options: DS_RADIO_GROUP_SIZES,
    description: 'Segment size — Small (32px), Base (40px), X-Small (24px)',
  },
  options: { control: 'object' },
  defaultValue: { control: 'text' },
  className: { table: { disable: true } },
};

export const RadioGroup: RadioGroupStory = {
  render: (args) => <DsRadioGroup {...args} />,
  args: {
    buttonStyle: 'outline',
    size: 'small',
  },
  argTypes: radioGroupOnlyArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22686-23893',
    },
    docs: {
      description: {
        story:
          'Segmented radio group. Use **buttonStyle** and **size** in the Controls panel (default: outline, small).',
      },
    },
  },
};

type VerticalRadioGroupStory = StoryObj<DsRadioVerticalGroupProps>;

const verticalGroupArgTypes: VerticalRadioGroupStory['argTypes'] = {
  ...staticStoryArgTypes,
  options: { control: 'object' },
  defaultValue: { control: 'text' },
  disabled: { control: 'boolean' },
  className: { table: { disable: true } },
  onChange: { table: { disable: true } },
};

export const VerticalRadioGroup: VerticalRadioGroupStory = {
  render: (args) => <DsRadioVerticalGroup {...args} />,
  args: {
    options: ['Option A', 'Option B', 'Option C'],
    disabled: false,
  },
  argTypes: verticalGroupArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22688-24078',
    },
    docs: {
      description: {
        story:
          'Vertical radio group (Figma 22688:24078). Click an option to select — 24px spacing between items.',
      },
    },
  },
};
