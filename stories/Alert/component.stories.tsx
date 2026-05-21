import type { Meta, StoryObj } from '@storybook/react';
import type { DsAlertProps } from '../../src/components/Alert';
import { DsAlert } from '../../src/components/Alert';

const meta: Meta<DsAlertProps> = {
  title: 'Components/Alert',
  component: DsAlert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox Alert (Ant Design + tokens). Figma spec: 800×86 basic/with-button, 800×48 broadcast.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=413-15306',
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['basic', 'with-button', 'broadcast'],
    },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    message: { control: 'text' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    closable: { control: 'boolean' },
    showActions: { control: 'boolean' },
    secondaryActionLabel: { control: 'text' },
    primaryActionLabel: { control: 'text' },
    showCarousel: { control: 'boolean' },
    carouselLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DsAlertProps>;

const basicControls: Story['argTypes'] = {
  layout: { table: { disable: true } },
  showActions: { table: { disable: true } },
  secondaryActionLabel: { table: { disable: true } },
  primaryActionLabel: { table: { disable: true } },
  showCarousel: { table: { disable: true } },
  carouselLabel: { table: { disable: true } },
};

const withButtonControls: Story['argTypes'] = {
  layout: { table: { disable: true } },
  showCarousel: { table: { disable: true } },
  carouselLabel: { table: { disable: true } },
};

const broadcastControls: Story['argTypes'] = {
  layout: { table: { disable: true } },
  showDescription: { table: { disable: true } },
  description: { table: { disable: true } },
  showActions: { table: { disable: true } },
  secondaryActionLabel: { table: { disable: true } },
  primaryActionLabel: { table: { disable: true } },
};

export const Basic: Story = {
  args: {
    layout: 'basic',
    type: 'info',
    showIcon: true,
    closable: true,
    showDescription: true,
  },
  argTypes: basicControls,
};

export const WithButton: Story = {
  args: {
    layout: 'with-button',
    type: 'info',
    showIcon: true,
    closable: true,
    showDescription: true,
    showActions: true,
    secondaryActionLabel: 'Learn more',
    primaryActionLabel: 'Try again',
  },
  argTypes: withButtonControls,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22677-23424',
    },
  },
};

export const Broadcast: Story = {
  args: {
    layout: 'broadcast',
    type: 'info',
    showIcon: true,
    closable: true,
    showCarousel: true,
    carouselLabel: '1 / 3',
  },
  argTypes: broadcastControls,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22677-23610',
    },
  },
};
