import type { Meta, StoryObj } from '@storybook/react';
import {
  createBreadcrumbEllipsisItem,
  DsBreadcrumb,
  type DsBreadcrumbProps,
} from '../../src/components/Breadcrumb';
import '../../src/components/Breadcrumb/component.css';

const FIGMA = {
  componentSet:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=446-26123',
  basic:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=446-26123',
  link:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=376-10769',
  ellipsisMenu:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22770-15528',
} as const;

const meta: Meta<DsBreadcrumbProps> = {
  title: 'Components/Breadcrumb',
  component: DsBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Breadcrumb** (Ant Design + tokens). Shows navigation hierarchy — Home icon, hover ellipsis menu (small dropdown), intermediate links, and an unclickable current item.',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    showHomeIcon: true,
    separator: '/',
  },
  argTypes: {
    showHomeIcon: {
      control: 'boolean',
      description: 'Replace first item with a house icon (Figma Home item).',
    },
    separator: {
      control: 'text',
      description: 'Separator between items.',
    },
    items: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsBreadcrumbProps>;

/**
 * Figma 446:26123 — Home icon, truncated `…`, Breadcrumb Link (clickable),
 * and a final non-clickable current item.
 */
export const Basic: Story = {
  render: (args) => (
    <DsBreadcrumb
      {...args}
      items={[
        { title: 'Home', href: '#' },
        createBreadcrumbEllipsisItem([
          { key: '1', label: 'Breadcrumb 1' },
          { key: '2', label: 'Breadcrumb 2' },
          { key: '3', label: 'Breadcrumb 3' },
        ]),
        { title: 'Breadcrumb Link', href: '#' },
        { title: 'Breadcrumb Link' },
      ]}
    />
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story:
          'Basic breadcrumb — home icon, hover ellipsis menu (Figma 22770:15528), intermediate links, and current page. Matches Figma 446:26123.',
      },
    },
  },
};

/** First item shows as text "Home" without icon. */
export const WithoutHomeIcon: Story = {
  render: (args) => (
    <DsBreadcrumb
      {...args}
      showHomeIcon={false}
      items={[
        { title: 'Home', href: '#' },
        { title: 'Section', href: '#' },
        { title: 'Current Page' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'All items rendered as plain text — no house icon on first item.',
      },
    },
  },
};

/** Two-level path — minimal hierarchy. */
export const ShortPath: Story = {
  render: (args) => (
    <DsBreadcrumb
      {...args}
      items={[{ title: 'Home', href: '#' }, { title: 'Current Page' }]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal two-level breadcrumb.',
      },
    },
  },
};
