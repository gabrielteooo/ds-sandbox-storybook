import type { Meta, StoryObj } from '@storybook/react';
import type { DsInputKind, DsInputProps, DsInputSize } from '../../src/components/Input';
import {
  DsInput,
  DS_INPUT_SIZES,
  DS_INPUT_STATES,
  DS_INPUT_STATUSES,
} from '../../src/components/Input';

const meta: Meta<DsInputProps> = {
  title: 'Components/Input',
  component: DsInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox Input. **Status**: Default, Error, Warning, Success. **State**: Default, Hover, Focused, Typing, Filled, Disabled. **Sizes**: X-Small (24px), Small (32px), Base (40px).',
      },
    },
  },
  argTypes: {
    kind: {
      control: 'select',
      options: [
        'basic',
        'textarea',
        'password',
        'pre-post-tab',
        'search',
        'number',
      ],
    },
    size: {
      control: 'select',
      options: DS_INPUT_SIZES,
    },
    status: {
      control: 'select',
      options: DS_INPUT_STATUSES,
      description: 'Figma Status=',
    },
    state: {
      control: 'select',
      options: DS_INPUT_STATES,
      description: 'Figma State=',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    prefixText: { control: 'text' },
    suffixText: { control: 'text' },
    preTab: { control: 'boolean' },
    postTab: { control: 'boolean' },
    preTabText: { control: 'text' },
    postTabText: { control: 'text' },
    tabVariant: {
      control: 'select',
      options: ['basic', 'icon', 'select'],
      description: 'Pre/post tab style (442:24)',
    },
    searchButtonType: {
      control: 'select',
      options: ['default', 'primary-icon', 'primary-text'],
    },
    searchPreTab: { control: 'boolean' },
    showCount: { control: 'boolean' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<DsInputProps>;

const SIZE_LABELS: Record<DsInputSize, string> = {
  'x-small': 'X-Small',
  small: 'Small',
  base: 'Base',
};

const sharedControls: Partial<DsInputProps> = {
  status: 'default',
  state: 'default',
  placeholder: 'Type here',
  disabled: false,
  allowClear: false,
};

function AllSizesShowcase({
  kind,
  size: _size,
  ...shared
}: DsInputProps & { kind: DsInputKind }) {
  return (
    <div className="ds-input-story-sizes">
      {DS_INPUT_SIZES.map((size) => (
        <div key={size} className="ds-input-story-size-row">
          <p className="ds-input-story-size-label">{SIZE_LABELS[size]}</p>
          <DsInput kind={kind} size={size} {...shared} />
        </div>
      ))}
    </div>
  );
}

const basicArgTypes: Story['argTypes'] = {
  kind: { table: { disable: true } },
  preTab: { table: { disable: true } },
  postTab: { table: { disable: true } },
  preTabText: { table: { disable: true } },
  postTabText: { table: { disable: true } },
  tabVariant: { table: { disable: true } },
  searchButtonType: { table: { disable: true } },
  searchPreTab: { table: { disable: true } },
  showCount: { table: { disable: true } },
  rows: { table: { disable: true } },
};

function singleKindArgTypes(
  extraHidden: (keyof DsInputProps)[] = [],
): Story['argTypes'] {
  const hidden = new Set<keyof DsInputProps>([
    'kind',
    'showCount',
    'rows',
    ...extraHidden,
  ]);
  const result: Story['argTypes'] = { kind: { table: { disable: true } } };
  for (const key of hidden) {
    if (key !== 'kind') {
      result[key] = { table: { disable: true } };
    }
  }
  return result;
}

const allSizesArgTypes: Story['argTypes'] = {
  kind: { table: { disable: true } },
  size: { table: { disable: true } },
  preTab: { table: { disable: true } },
  postTab: { table: { disable: true } },
  preTabText: { table: { disable: true } },
  postTabText: { table: { disable: true } },
  tabVariant: { table: { disable: true } },
  searchButtonType: { table: { disable: true } },
  searchPreTab: { table: { disable: true } },
  showCount: { table: { disable: true } },
  rows: { table: { disable: true } },
};

export const Basic: Story = {
  args: {
    kind: 'basic',
    size: 'base',
    ...sharedControls,
  },
  argTypes: basicArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-39978',
    },
  },
};

export const TextArea: Story = {
  render: (args) => <AllSizesShowcase kind="textarea" {...args} />,
  args: { kind: 'textarea', placeholder: 'Type here', ...sharedControls },
  argTypes: allSizesArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=389-12330',
    },
  },
};

export const Password: Story = {
  args: {
    kind: 'password',
    size: 'base',
    placeholder: 'Password',
    ...sharedControls,
  },
  argTypes: singleKindArgTypes([
    'preTab',
    'postTab',
    'preTabText',
    'postTabText',
    'tabVariant',
    'searchButtonType',
    'searchPreTab',
    'showCount',
    'rows',
  ]),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=432-23271',
    },
  },
};

export const PrePostTab: Story = {
  args: {
    kind: 'pre-post-tab',
    size: 'base',
    placeholder: 'Input',
    preTab: true,
    postTab: true,
    preTabText: 'http://',
    postTabText: '.com',
    tabVariant: 'basic',
    ...sharedControls,
  },
  argTypes: singleKindArgTypes(['searchButtonType', 'searchPreTab', 'showCount', 'rows']),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-41432',
    },
    docs: {
      description: {
        story:
          'Toggle **tabVariant** for Basic, Icon, or Select tabs.',
      },
    },
  },
};

export const Search: Story = {
  args: {
    kind: 'search',
    size: 'base',
    placeholder: 'Search',
    searchButtonType: 'default',
    searchPreTab: false,
    preTabText: 'http://',
    ...sharedControls,
  },
  argTypes: singleKindArgTypes([
    'postTab',
    'postTabText',
    'tabVariant',
    'showCount',
    'rows',
  ]),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-41352',
    },
  },
};

export const InputNumber: Story = {
  render: (args) => <AllSizesShowcase kind="number" {...args} />,
  args: { kind: 'number', placeholder: '0', ...sharedControls },
  argTypes: allSizesArgTypes,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=393-1232',
    },
  },
};

const DISABLED_VARIANTS: {
  kind: DsInputKind;
  label: string;
  props?: Partial<DsInputProps>;
}[] = [
  { kind: 'basic', label: 'Basic' },
  { kind: 'textarea', label: 'Text Area' },
  { kind: 'password', label: 'Password', props: { placeholder: 'Password' } },
  {
    kind: 'pre-post-tab',
    label: 'Pre Post Tab',
    props: { placeholder: 'Input', preTab: true, postTab: true },
  },
  {
    kind: 'search',
    label: 'Search',
    props: { placeholder: 'Search', searchPreTab: true, searchButtonType: 'default' },
  },
  { kind: 'number', label: 'Input Number', props: { placeholder: '0' } },
];

export const Disabled: Story = {
  render: () => (
    <div className="ds-input-story-sizes ds-input-story-disabled">
      {DISABLED_VARIANTS.map(({ kind, label, props }) => (
        <div key={kind} className="ds-input-story-size-row">
          <p className="ds-input-story-size-label">{label}</p>
          <DsInput
            kind={kind}
            size="base"
            state="disabled"
            disabled
            {...props}
          />
        </div>
      ))}
    </div>
  ),
  argTypes: {
    kind: { table: { disable: true } },
    size: { table: { disable: true } },
    status: { table: { disable: true } },
    state: { table: { disable: true } },
    disabled: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    allowClear: { table: { disable: true } },
    prefixText: { table: { disable: true } },
    suffixText: { table: { disable: true } },
    preTab: { table: { disable: true } },
    postTab: { table: { disable: true } },
    preTabText: { table: { disable: true } },
    postTabText: { table: { disable: true } },
    tabVariant: { table: { disable: true } },
    searchButtonType: { table: { disable: true } },
    searchPreTab: { table: { disable: true } },
    showCount: { table: { disable: true } },
    rows: { table: { disable: true } },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-39978',
    },
    docs: {
      description: {
        story: 'All input variants at **Base** size in the disabled state (Figma State=Disabled).',
      },
    },
  },
};
