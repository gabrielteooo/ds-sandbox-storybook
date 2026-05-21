import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import type { DsDatePickerProps } from '../../src/components/DatePicker';
import {
  DsDatePicker,
  DS_DATEPICKER_EXAMPLE_DATETIME,
  DS_DATEPICKER_PICKERS,
  DS_DATEPICKER_SIZES,
  DS_DATEPICKER_STATUSES,
} from '../../src/components/DatePicker';
import './component.stories.css';

const FIGMA = {
  input: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=415-795',
  menu: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=432-17357',
} as const;

const meta: Meta<DsDatePickerProps> = {
  title: 'Components/DatePicker',
  component: DsDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **DatePicker** — Ant Design DatePicker/RangePicker with **DD/MM/YYYY** (and **DD/MM/YYYY, HH:mm** for date-time). Toggle **status** in Controls for warning/error.',
      },
    },
    design: { type: 'figma', url: FIGMA.input },
  },
  args: {
    size: 'small',
    status: 'default',
    picker: 'date',
    range: false,
    showTime: false,
    disabled: false,
    allowClear: true,
  },
  argTypes: {
    size: { control: 'select', options: DS_DATEPICKER_SIZES },
    status: {
      control: 'select',
      options: DS_DATEPICKER_STATUSES,
      description: 'Warning/error border on the trigger',
    },
    picker: {
      control: 'select',
      options: DS_DATEPICKER_PICKERS,
      description: 'date · month · year',
    },
    range: {
      control: 'boolean',
      description: 'Use RangePicker (start–end)',
    },
    showTime: {
      control: 'boolean',
      description: 'Date + time panel (datetime format)',
    },
    format: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    popupClassName: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsDatePickerProps>;

/** Select date, month, and year (small). */
export const BasicUsage: Story = {
  render: () => (
    <div className="ds-datepicker-stories-grid ds-datepicker-stories-grid--3">
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Select date</span>
        <DsDatePicker size="small" picker="date" placeholder="DD/MM/YYYY" showToday />
      </div>
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Select month</span>
        <DsDatePicker size="small" picker="month" />
      </div>
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Select year</span>
        <DsDatePicker size="small" picker="year" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.input },
    docs: {
      description: {
        story: 'Single pickers at **small** size: date (**DD/MM/YYYY**), month (**MM/YYYY**), year (**YYYY**).',
      },
    },
  },
};

/** Start–end for date, month, and year (small). */
export const RangePicker: Story = {
  render: () => (
    <div className="ds-datepicker-stories-grid ds-datepicker-stories-grid--3">
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Start–end date</span>
        <DsDatePicker size="small" picker="date" range showToday />
      </div>
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Start–end month</span>
        <DsDatePicker size="small" picker="month" range />
      </div>
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Start–end year</span>
        <DsDatePicker size="small" picker="year" range />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.menu },
    docs: {
      description: {
        story:
          'Range pickers at **small** size with in-range highlight (**--component-datepicker-bg-range**) and selected endpoints.',
      },
    },
  },
};

/** Date and time — example 21/05/2026, 15:00 (Ant time-picker demo pattern). */
export const DateTime: Story = {
  args: {
    showTime: true,
    defaultValue: DS_DATEPICKER_EXAMPLE_DATETIME,
    size: 'small',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.menu },
    docs: {
      description: {
        story:
          'Combined date + time panel. Display format **DD/MM/YYYY, HH:mm** (e.g. **21/05/2026, 15:00**).',
      },
    },
  },
};

/** X-Small (24px), Small (32px), Base (40px). */
export const AllSizes: Story = {
  render: () => (
    <div className="ds-datepicker-stories-grid ds-datepicker-stories-grid--sizes">
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">X-Small</span>
        <DsDatePicker size="x-small" defaultValue={dayjs('2026-05-21')} />
      </div>
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Small</span>
        <DsDatePicker size="small" defaultValue={dayjs('2026-05-21')} />
      </div>
      <div className="ds-datepicker-stories-field">
        <span className="ds-datepicker-stories-label">Base</span>
        <DsDatePicker size="base" defaultValue={dayjs('2026-05-21')} />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.input },
  },
};
