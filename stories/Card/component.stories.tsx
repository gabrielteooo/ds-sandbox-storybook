import type { Meta, StoryObj } from '@storybook/react';
import { DsCard, DS_CARD_SIZES, type DsCardProps } from '../../src/components/Card';
import '../../src/components/Card/component.css';
import './component.stories.css';

const FIGMA = {
  componentSet: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=406-74',
  basic: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22753-7871',
} as const;

const CARD_CONTENT = (
  <div className="ds-card__content">
    <p>Card content here</p>
    <p>Card content here</p>
    <p>Card content here</p>
  </div>
);

const meta: Meta<DsCardProps> = {
  title: 'Components/Card',
  component: DsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Card** (Ant Design + tokens). A card displays content related to a single subject — header, body slot, and optional extra actions.',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    size: 'default',
    title: 'Card title',
    showExtra: true,
    bordered: true,
  },
  argTypes: {
    size: {
      control: 'select',
      options: DS_CARD_SIZES,
      description: 'Figma Small (38px header) or Default (56px header).',
    },
    title: { control: 'text' },
    showExtra: { control: 'boolean' },
    bordered: { control: 'boolean' },
    extra: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    loading: { table: { disable: true } },
    cover: { table: { disable: true } },
    actions: { table: { disable: true } },
    tabList: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsCardProps>;

export const Basic: Story = {
  render: () => (
    <div className="ds-card-story-basic">
      <DsCard size="small" title="Basic Card (small)">
        {CARD_CONTENT}
      </DsCard>
      <DsCard size="default" title="Basic Card (default)">
        {CARD_CONTENT}
      </DsCard>
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story:
          'Small and Default basic cards with title, ellipsis extra, and body copy — matches Figma 22753:7871.',
      },
    },
  },
};
