import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

type BroadcastSlide = {
  id: string;
  type: 'error' | 'info';
  message?: string;
};

const INITIAL_BROADCAST_SLIDES: BroadcastSlide[] = [
  { id: 'error', type: 'error' },
  {
    id: 'info-1',
    type: 'info',
    message: 'Maintenance work this afternoon (11:00-18:00) at Carpark 23.',
  },
  {
    id: 'info-2',
    type: 'info',
    message: 'System update scheduled tonight (22:00-23:00).',
  },
];

function BroadcastCarouselDemo() {
  const [slides, setSlides] = useState(INITIAL_BROADCAST_SLIDES);
  const [page, setPage] = useState(0);

  const total = slides.length;
  const current = slides[page];
  const isError = current.type === 'error';

  const removeCurrentSlide = () => {
    if (isError) return;

    const nextSlides = slides.filter((_, index) => index !== page);
    setSlides(nextSlides);
    setPage(Math.min(page, nextSlides.length - 1));
  };

  return (
    <DsAlert
      layout="broadcast"
      type={current.type}
      message={current.message}
      showIcon
      closable={!isError}
      showCarousel
      carouselLabel={`${page + 1} / ${total}`}
      onCarouselPrevious={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
      onCarouselNext={() =>
        setPage((currentPage) => Math.min(total - 1, currentPage + 1))
      }
      carouselPreviousDisabled={page === 0}
      carouselNextDisabled={page === total - 1}
      onClose={removeCurrentSlide}
    />
  );
}

export const Broadcast: Story = {
  render: () => <BroadcastCarouselDemo />,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22677-23610',
    },
    docs: {
      description: {
        story:
          'Single carousel banner: **1 / 3** is error (no close); **2 / 3** and **3 / 3** are info (close beside message). Closing an info slide removes it from the group (**3 / 3 → 2 / 2**). Use chevrons to switch slides.',
      },
    },
  },
};
