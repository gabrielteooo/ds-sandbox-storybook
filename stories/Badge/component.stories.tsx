import type { Meta, StoryObj } from '@storybook/react';
import {
  DsBadge,
  DS_BADGE_RIBBON_COLORS,
  DS_BADGE_RIBBON_FIGMA_LABELS,
  DS_BADGE_SIZES,
  DS_BADGE_STATUSES,
  DS_BADGE_STATUS_LABELS,
  type DsBadgeProps,
  type DsBadgeRibbonProps,
} from '../../src/components/Badge';
import '../../src/components/Badge/component.css';
import './component.stories.css';

const FIGMA = {
  componentSet: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=399-66',
  basic: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22748-5926',
  status: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22748-6030',
  ribbon: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22748-6074',
} as const;

const meta: Meta<DsBadgeProps> = {
  title: 'Components/Badge',
  component: DsBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Badge** (Ant Design + tokens). Patterns: Basic dot/count on anchors, Status label rows, and Ribbon on cards.',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    size: 'small',
    dot: false,
    count: 10,
    overflowCount: 99,
    showZero: false,
    status: undefined,
    text: undefined,
  },
  argTypes: {
    size: {
      control: 'select',
      options: DS_BADGE_SIZES,
      description: 'Figma Badge / Basic — Small (16px) or Base (20px).',
    },
    dot: { control: 'boolean' },
    count: { control: 'number' },
    overflowCount: { control: 'number' },
    showZero: { control: 'boolean' },
    status: {
      control: 'select',
      options: [undefined, ...DS_BADGE_STATUSES],
    },
    text: { control: 'text' },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    offset: { table: { disable: true } },
    title: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsBadgeProps>;

function BadgeStoryAvatar() {
  return <span className="ds-badge-story-avatar" aria-hidden />;
}

export const Basic: Story = {
  args: {
    size: 'small',
  },
  render: ({ size }) => (
    <div className="ds-badge-story-basic">
      <DsBadge size={size} dot>
        <BadgeStoryAvatar />
      </DsBadge>
      <DsBadge size={size} count={10}>
        <BadgeStoryAvatar />
      </DsBadge>
      <DsBadge size={size} count={100} overflowCount={99}>
        <BadgeStoryAvatar />
      </DsBadge>
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story:
          'Dot and count indicators on empty grey avatar anchors. Toggle **size** for Figma Small vs Base count metrics.',
      },
    },
  },
};

export const Status: Story = {
  render: () => (
    <div className="ds-badge-story-status">
      {DS_BADGE_STATUSES.map((status) => (
        <DsBadge key={status} status={status} text={DS_BADGE_STATUS_LABELS[status]} />
      ))}
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.status },
    docs: {
      description: {
        story: 'Status dot with label — success, default, error, processing, and warning.',
      },
    },
  },
};

type RibbonStoryProps = DsBadgeRibbonProps;

export const Ribbon: StoryObj<RibbonStoryProps> = {
  render: () => (
    <div className="ds-badge-story-ribbon">
      {DS_BADGE_RIBBON_COLORS.map((color) => (
        <DsBadge.Ribbon key={color} text="Ribbon" color={color}>
          <div className="ds-badge-story-card">
            <p className="ds-badge-story-card__title">
              Card with Custom Ribbon
            </p>
            <p className="ds-badge-story-card__body">
              {DS_BADGE_RIBBON_FIGMA_LABELS[color]} — This card has a customised
              ribbon with semantic class.
            </p>
          </div>
        </DsBadge.Ribbon>
      ))}
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.ribbon },
    docs: {
      description: {
        story: 'Corner ribbons in seven preset colours on card anchors.',
      },
    },
  },
};
