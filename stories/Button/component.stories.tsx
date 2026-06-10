import type { Meta, StoryObj } from '@storybook/react';
import {
  DsButton,
  DsButtonGroup,
  DS_BUTTON_SIZES,
  DS_BUTTON_VARIANTS,
  type DsButtonGroupProps,
  type DsButtonProps,
  type DsButtonSize,
  type DsButtonVariant,
} from '../../src/components/Button';

const meta: Meta<DsButtonProps> = {
  title: 'Components/Button',
  component: DsButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox Button (Ant Design + tokens). Figma sizes: X-Small 24px, Small 32px, Base 40px.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=368-430',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: DS_BUTTON_VARIANTS,
    },
    size: {
      control: 'select',
      options: DS_BUTTON_SIZES,
    },
    label: { control: 'text' },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DsButtonProps>;

const basicArgTypes: Story['argTypes'] = {
  iconOnly: { table: { disable: true } },
};

const showcaseArgTypes: Story['argTypes'] = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  label: { table: { disable: true } },
  iconOnly: { table: { disable: true } },
  disabled: { table: { disable: true } },
};

export const Basic: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    label: 'Button',
    disabled: false,
  },
  argTypes: basicArgTypes,
};

function VariantRow({
  size = 'base',
  iconOnly = false,
  disabled = false,
  variants = ['primary', 'secondary', 'tertiary'],
}: {
  size?: DsButtonSize;
  iconOnly?: boolean;
  disabled?: boolean;
  variants?: DsButtonVariant[];
}) {
  return (
    <div className="ds-button-story-row">
      {variants.map((variant) => (
        <DsButton
          key={variant}
          variant={variant}
          size={size}
          iconOnly={iconOnly}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export const Variants: Story = {
  render: () => <VariantRow variants={['primary', 'secondary', 'tertiary']} />,
  argTypes: showcaseArgTypes,
};

export const IconOnly: Story = {
  render: () => (
    <VariantRow iconOnly variants={DS_BUTTON_VARIANTS} />
  ),
  argTypes: showcaseArgTypes,
};

export const Disabled: Story = {
  render: () => (
    <VariantRow disabled variants={DS_BUTTON_VARIANTS} />
  ),
  argTypes: showcaseArgTypes,
};

type GroupStory = StoryObj<DsButtonGroupProps>;

export const ButtonGroups: GroupStory = {
  render: (args) => <DsButtonGroup {...args} />,
  args: {
    variant: 'secondary',
    size: 'default',
    direction: 'horizontal',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Composed from **Button Compact Item** and **Button Compact Separator** subcomponents (Figma 3129:14060).',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=3126-27820',
    },
  },
};
