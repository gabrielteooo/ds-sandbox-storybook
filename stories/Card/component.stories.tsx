import type { Meta, StoryObj } from '@storybook/react';
import {
  DsCard,
  DsNotificationCard,
  DsStatisticCard,
  DS_CARD_SIZES,
  type DsCardProps,
  type DsNotificationCardProps,
  type DsStatisticCardProps,
} from '../../src/components/Card';
import '../../src/components/Card/component.css';
import './component.stories.css';

const FIGMA = {
  componentSet: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=406-74',
  basic: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22753-7871',
  statistic: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22458-10002',
  statisticTag: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=1053-77186',
  footerButton: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=4493-805',
  notification: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22460-1701',
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

export const Statistic: StoryObj<DsStatisticCardProps> = {
  render: (args) => (
    <div className="ds-card-story-statistic">
      <DsStatisticCard {...args} />
    </div>
  ),
  args: {
    tone: 'default',
    showStatisticTag: true,
    showFooter: true,
    showInfoIcon: true,
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Body background tone.',
    },
    showStatisticTag: {
      control: 'boolean',
      description: 'Show the Statistics Tag trend indicator.',
    },
    showFooter: {
      control: 'boolean',
      description: 'Show the Card Footer Button.',
    },
    showInfoIcon: { control: 'boolean' },
    title: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    trendColour: {
      control: 'select',
      options: ['green', 'red', 'grey'],
    },
    trendLabel: { control: 'text' },
    trendPeriod: { control: 'text' },
    benchmark: { control: 'text' },
    footerLabel: { control: 'text' },
    footerDisabled: { control: 'boolean' },
    size: { table: { disable: true } },
    showExtra: { table: { disable: true } },
    bordered: { table: { disable: true } },
    className: { table: { disable: true } },
    onFooterClick: { table: { disable: true } },
    onInfoClick: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.statistic },
    docs: {
      description: {
        story:
          'Default statistic card with value, trend tag, benchmark, and footer CTA. Toggle **showStatisticTag** and **showFooter** to hide subcomponents.',
      },
    },
  },
};

export const Notification: StoryObj<DsNotificationCardProps> = {
  render: (args) => (
    <div className="ds-card-story-statistic">
      <DsNotificationCard {...args} />
    </div>
  ),
  args: {
    isNew: true,
    showExtra: true,
  },
  argTypes: {
    isNew: {
      control: 'boolean',
      description: 'Unread notification — dot indicator and active title colour.',
    },
    showExtra: {
      control: 'boolean',
      description: 'Show header ellipsis actions.',
    },
    title: { control: 'text' },
    message: { control: 'text' },
    author: { control: 'text' },
    timestamp: { control: 'text' },
    size: { table: { disable: true } },
    showStatisticTag: { table: { disable: true } },
    showFooter: { table: { disable: true } },
    bordered: { table: { disable: true } },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
    onExtraClick: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.notification },
    docs: {
      description: {
        story:
          'Default **new** notification card with unread dot, message body, and author/timestamp metadata.',
      },
    },
  },
};
