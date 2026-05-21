import type { Meta, StoryObj } from '@storybook/react';
import type { DsTagProps } from '../../src/components/Tag';
import {
  DsTag,
  DS_TAG_COLOR_PRESETS,
  DsTagsAddRemove,
  DsTagsCheckable,
  DsTagsStatus,
} from '../../src/components/Tag';

const meta: Meta<DsTagProps> = {
  title: 'Components/Tag',
  component: DsTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox Tag (Ant Design + tokens). 24px height, 8px horizontal padding, 4px radius. Patterns follow [Ant Design Tag](https://ant.design/components/tag).',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=412-13377',
    },
  },
  argTypes: {
    children: { control: 'text' },
    closable: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'borderless'],
    },
    color: {
      control: 'select',
      options: [...DS_TAG_COLOR_PRESETS],
    },
    status: { table: { disable: true } },
    icon: { table: { disable: true } },
    onClose: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsTagProps>;

export const Basic: Story = {
  render: () => (
    <div className="ds-tag-story-basic">
      <DsTag>Tag 1</DsTag>
      <DsTag closable>Tag 2</DsTag>
      <DsTag variant="borderless">Tag 1</DsTag>
      <DsTag variant="borderless" closable>
        Tag 2
      </DsTag>
    </div>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=412-13525',
    },
    docs: {
      description: {
        story: 'Default bordered tags and borderless variants, with optional close icon.',
      },
    },
  },
};

export const AddRemove: Story = {
  render: () => <DsTagsAddRemove />,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22688-25027',
    },
    docs: {
      description: {
        story:
          'Interactive add/remove: close tags and click “+ New Tag” to add (Ant control demo pattern).',
      },
    },
  },
};

export const Colourful: Story = {
  render: () => (
    <div className="ds-tags-colourful">
      {DS_TAG_COLOR_PRESETS.map((preset) => (
        <DsTag key={preset} color={preset}>
          {preset}
        </DsTag>
      ))}
    </div>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=412-13524',
    },
    docs: {
      description: {
        story: 'Preset colourful tags mapped to Ant Design color names and DS primitives.',
      },
    },
  },
};

export const Status: Story = {
  render: () => <DsTagsStatus />,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=412-13527',
    },
    docs: {
      description: {
        story: 'Semantic status tags with icons (default, processing, success, warning, error).',
      },
    },
  },
};

export const Checkable: Story = {
  render: () => <DsTagsCheckable />,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=412-13526',
    },
    docs: {
      description: {
        story:
          'Checkable tag (412:13526) with centered label; single- and multi-select demo (22688:25069).',
      },
    },
  },
};
