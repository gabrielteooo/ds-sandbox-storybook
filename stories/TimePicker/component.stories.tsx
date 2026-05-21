import type { Meta, StoryObj } from '@storybook/react';
import type { DsTimePickerProps } from '../../src/components/TimePicker';
import {
  DsTimePicker,
  DS_TIMEPICKER_EXAMPLE_TIME,
  DS_TIMEPICKER_SIZES,
  DS_TIMEPICKER_STATUSES,
} from '../../src/components/TimePicker';
import './component.stories.css';

const FIGMA = {
  input: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=507-32759',
  menu: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-13603',
} as const;

const meta: Meta<DsTimePickerProps> = {
  title: 'Components/TimePicker',
  component: DsTimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **TimePicker** — Ant Design TimePicker with **HH:mm** format. Toggle **status** in Controls for warning/error.',
      },
    },
    design: { type: 'figma', url: FIGMA.input },
  },
  args: {
    size: 'small',
    status: 'default',
    range: false,
    disabled: false,
    allowClear: true,
  },
  argTypes: {
    size: { control: 'select', options: DS_TIMEPICKER_SIZES },
    status: {
      control: 'select',
      options: DS_TIMEPICKER_STATUSES,
      description: 'Warning/error border on the trigger',
    },
    range: {
      control: 'boolean',
      description: 'Use TimePicker.RangePicker (start–end)',
    },
    format: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    popupClassName: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsTimePickerProps>;

/** Single time picker at **small** size (Figma default). */
export const BasicUsage: Story = {
  args: {
    size: 'small',
    placeholder: 'HH:mm',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.input },
    docs: {
      description: {
        story: 'Default **small** time field with **HH:mm** placeholder and clock suffix.',
      },
    },
  },
};

/** Start–end time range at **small** size. */
export const TimeRange: Story = {
  args: {
    size: 'small',
    range: true,
    placeholder: ['HH:mm', 'HH:mm'],
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.input },
    docs: {
      description: {
        story: 'Range picker (**HH:mm → HH:mm**) at **small** size, 320px trigger width per Figma.',
      },
    },
  },
};

/** X-Small (24px), Small (32px), Base (40px). */
export const AllSizes: Story = {
  render: () => (
    <div className="ds-timepicker-stories-grid ds-timepicker-stories-grid--sizes">
      <div className="ds-timepicker-stories-field">
        <span className="ds-timepicker-stories-label">X-Small</span>
        <DsTimePicker size="x-small" defaultValue={DS_TIMEPICKER_EXAMPLE_TIME} />
      </div>
      <div className="ds-timepicker-stories-field">
        <span className="ds-timepicker-stories-label">Small</span>
        <DsTimePicker size="small" defaultValue={DS_TIMEPICKER_EXAMPLE_TIME} />
      </div>
      <div className="ds-timepicker-stories-field">
        <span className="ds-timepicker-stories-label">Base</span>
        <DsTimePicker size="base" defaultValue={DS_TIMEPICKER_EXAMPLE_TIME} />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.input },
  },
};
