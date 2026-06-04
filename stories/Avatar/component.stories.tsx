import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import {
  DsAvatar,
  DS_AVATAR_SIZES,
  DS_AVATAR_TYPES,
  type DsAvatarProps,
} from '../../src/components/Avatar';
import '../../src/components/Avatar/component.css';

/** Figma Types story asset (22742:3504) — MCP asset URL; replace with stable CDN in production. */
const TYPES_STORY_IMAGE_SRC =
  'https://www.figma.com/api/mcp/asset/2a035b77-f390-4162-b98e-ec1e5e440750';

const FIGMA = {
  componentSet: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=398-11741',
  basicSizes: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22737-18584',
  types: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22742-3502',
} as const;

const meta: Meta<DsAvatarProps> = {
  title: 'Components/Avatar',
  component: DsAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Avatar** (Ant Design + tokens). Figma types: Icon (grey), Image, Text (primary). Sizes: 24 / 32 / 40 / 64px.',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    type: 'icon',
    size: 'default',
    text: 'JD',
    showBadge: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: DS_AVATAR_TYPES,
    },
    size: {
      control: 'select',
      options: DS_AVATAR_SIZES,
    },
    text: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    showBadge: { control: 'boolean' },
    icon: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsAvatarProps>;

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--primitive-space-lg, 24px)',
};

/** Figma 22737:18584 — Icon avatar at Large, Default, and Small. */
export const Basic: Story = {
  name: 'Basic / Icon sizes',
  render: () => (
    <div style={rowStyle}>
      <DsAvatar type="icon" size="large" />
      <DsAvatar type="icon" size="default" />
      <DsAvatar type="icon" size="small" />
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.basicSizes },
    docs: {
      description: {
        story: 'Icon type with grey background at **large** (40px), **default** (32px), and **small** (24px).',
      },
    },
  },
};

/** Figma 22742:3502 — Icon, Image, and Text at default size (32px). */
export const Types: Story = {
  name: 'Types / Default size',
  render: () => (
    <div style={rowStyle}>
      <DsAvatar type="icon" size="default" />
      <DsAvatar type="image" size="default" src={TYPES_STORY_IMAGE_SRC} alt="User portrait" />
      <DsAvatar type="text" size="default" text="JD" />
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.types },
    docs: {
      description: {
        story:
          'Three Figma types at **default** size — Icon (`--component-avatar-bg-grey`), Image, Text (`--component-avatar-bg-primary`).',
      },
    },
  },
};

/** Interactive playground — all props via Controls. */
export const Playground: Story = {
  args: {
    type: 'text',
    size: 'default',
    text: 'JD',
    showBadge: false,
  },
};

/** Full variant matrix (Figma 398:11741). */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: 'var(--primitive-space-lg, 24px)',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {(['icon', 'image', 'text'] as const).map((type) =>
        (['custom', 'large', 'default', 'small'] as const).map((size) => (
          <DsAvatar
            key={`${type}-${size}`}
            type={type}
            size={size}
            src={type === 'image' ? TYPES_STORY_IMAGE_SRC : undefined}
            text="JD"
            showBadge={type !== 'icon' && size !== 'small'}
          />
        )),
      )}
    </div>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.componentSet },
  },
};
