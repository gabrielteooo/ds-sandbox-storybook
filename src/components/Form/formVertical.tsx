import { Checkbox, Form, Radio } from 'antd';
import type { Rule } from 'antd/es/form';
import type { ReactNode } from 'react';
import { DsButton } from '../Button/component';
import { DsCheckbox } from '../Checkbox/component';
import { DsDatePicker } from '../DatePicker/component';
import { DsInput } from '../Input/component';
import { DsRadio } from '../Radio/component';
import { DsRadioGroup } from '../Radio/DsRadioGroupShowcase';
import { DsSelect } from '../Select/component';
import { DS_SELECT_DEFAULT_OPTIONS } from '../Select/selectConstants';
import { DsSlider } from '../Slider/component';
import { DsSwitch } from '../Switch/component';
import { DsTimePicker } from '../TimePicker/component';
import { DsUpload } from '../Upload/component';
import { InputCaption, type InputCaptionStatus } from './inputCaption';
import {
  InputLabelVertical,
  type InputLabelMark,
} from './inputLabelVertical';
import {
  DS_FORM_PANEL,
  DS_FORM_VARIANTS_SLIDER_MARKS,
} from './formPanelMetrics';
import './component.css';

/** Figma Form / Vertical component set (515:43856). */
export type FormVerticalType =
  | 'Text'
  | 'Read-only'
  | 'Password'
  | 'Phone'
  | 'Textarea'
  | 'Select'
  | 'DatePicker'
  | 'TimePicker'
  | 'InputNumber'
  | 'Switch'
  | 'Button'
  | 'Currency'
  | 'Slider'
  | 'Drag and Drop'
  | 'Radio Buttons'
  | 'Radio Group'
  | 'Checkbox Group';

export const FORM_VERTICAL_TYPES: FormVerticalType[] = [
  'Read-only',
  'Text',
  'Button',
  'DatePicker',
  'InputNumber',
  'Password',
  'Phone',
  'Select',
  'Switch',
  'Textarea',
  'Currency',
  'Slider',
  'Drag and Drop',
  'Radio Buttons',
  'Radio Group',
  'Checkbox Group',
  'TimePicker',
];

const DEFAULT_CAPTION = 'This is a caption under a text input.';

const CHOICE_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'carrot', label: 'Carrot' },
  { value: 'date', label: 'Date' },
] as const;

const RADIO_GROUP_SEGMENT_OPTIONS = CHOICE_OPTIONS.map((option) => option.label);

function typeSlug(type: FormVerticalType) {
  return type
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function fieldClassName(type: FormVerticalType, className?: string) {
  const classes = ['ds-form__field', `ds-form-vertical--${typeSlug(type)}`];
  if (type === 'Slider') classes.push('ds-form__field--slider');
  if (type === 'Drag and Drop') classes.push('ds-form__field--upload');
  if (type === 'Read-only') classes.push('ds-form__field--readonly');
  if (className) classes.push(className);
  return classes.join(' ');
}

function valuePropNameForType(type: FormVerticalType): string | undefined {
  if (type === 'Switch') return 'checked';
  if (type === 'Checkbox Group') return 'value';
  return undefined;
}

export interface FormVerticalProps {
  type?: FormVerticalType;
  name?: string;
  rules?: Rule[];
  label?: string;
  mark?: InputLabelMark;
  showTooltip?: boolean;
  showHelpIcon?: boolean;
  /** Figma `caption` — when true, shows default caption copy. */
  caption?: boolean | string;
  captionStatus?: InputCaptionStatus;
  showLabel?: boolean;
  disabled?: boolean;
  readonlyText?: string;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
}

function renderCaption(
  caption: boolean | string | undefined,
  status: InputCaptionStatus,
) {
  if (!caption) return undefined;
  const text = typeof caption === 'string' ? caption : DEFAULT_CAPTION;
  return <InputCaption text={text} status={status} />;
}

function renderControl(
  type: FormVerticalType,
  disabled: boolean,
  readonlyText: string,
  placeholder?: string,
) {
  switch (type) {
    case 'Read-only':
      return (
        <span className="ds-form__readonly text-base-normal">{readonlyText}</span>
      );
    case 'Text':
      return (
        <DsInput
          kind="basic"
          size="base"
          placeholder={placeholder ?? 'Type here'}
          disabled={disabled}
        />
      );
    case 'Button':
      return (
        <DsButton variant="secondary" size="base" label="Button" disabled={disabled} />
      );
    case 'DatePicker':
      return (
        <DsDatePicker
          size="base"
          picker="date"
          placeholder="DD/MM/YYYY"
          disabled={disabled}
        />
      );
    case 'InputNumber':
      return <DsInput kind="number" size="base" disabled={disabled} />;
    case 'Password':
      return (
        <DsInput
          kind="password"
          size="base"
          placeholder="Password"
          disabled={disabled}
        />
      );
    case 'Phone':
      return (
        <DsInput
          kind="basic"
          size="base"
          preTab
          postTab={false}
          preTabText="+65"
          placeholder="8765 4321"
          disabled={disabled}
        />
      );
    case 'Select':
      return (
        <DsSelect
          variant="basic"
          size="base"
          placeholder="Select"
          options={[...DS_SELECT_DEFAULT_OPTIONS]}
          disabled={disabled}
        />
      );
    case 'Switch':
      return <DsSwitch size="base" disabled={disabled} />;
    case 'Textarea':
      return (
        <DsInput
          kind="textarea"
          size="base"
          placeholder="Provide details here"
          rows={3}
          disabled={disabled}
        />
      );
    case 'Currency':
      return (
        <DsInput
          kind="basic"
          size="base"
          preTab={false}
          postTab
          postTabText="$"
          defaultValue="1,234,567"
          disabled={disabled}
        />
      );
    case 'Slider':
      return (
        <DsSlider
          min={0}
          max={600}
          step={1}
          marks={DS_FORM_VARIANTS_SLIDER_MARKS}
          disabled={disabled}
        />
      );
    case 'Drag and Drop':
      return <DsUpload variant="dragger" disabled={disabled} showUploadList={false} />;
    case 'Radio Buttons':
      return (
        <DsRadioGroup
          buttonStyle="outline"
          size="base"
          options={RADIO_GROUP_SEGMENT_OPTIONS}
        />
      );
    case 'Radio Group':
      return (
        <Radio.Group disabled={disabled} className="ds-form__choice-row">
          {CHOICE_OPTIONS.map((option) => (
            <DsRadio
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Radio.Group>
      );
    case 'Checkbox Group':
      return (
        <div className="ds-form__choice-row">
          <Checkbox.Group disabled={disabled} className="ds-form__checkbox-group">
            {CHOICE_OPTIONS.map((option) => (
              <DsCheckbox
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Checkbox.Group>
        </div>
      );
    case 'TimePicker':
      return <DsTimePicker size="base" disabled={disabled} />;
    default:
      return null;
  }
}

/** Figma Form / Vertical (515:43856) — label, control, and optional caption. */
export function FormVertical({
  type = 'Text',
  name,
  rules,
  label = 'Input Label',
  mark = 'none',
  showTooltip = false,
  showHelpIcon = false,
  caption,
  captionStatus = 'default',
  showLabel = true,
  disabled = false,
  readonlyText = 'Read-only text',
  placeholder,
  className,
  children,
}: FormVerticalProps) {
  const control = children ?? renderControl(type, disabled, readonlyText, placeholder);
  const extra = renderCaption(caption, captionStatus);
  const labelNode = showLabel ? (
    <InputLabelVertical
      label={label}
      mark={mark}
      showTooltip={showTooltip}
      showHelpIcon={showHelpIcon}
    />
  ) : undefined;

  const useFormItem =
    Boolean(name) || type === 'Read-only' || type === 'Button' || type === 'Drag and Drop';

  if (useFormItem) {
    return (
      <Form.Item
        className={fieldClassName(type, className)}
        name={name}
        rules={rules}
        valuePropName={valuePropNameForType(type)}
        label={labelNode}
        extra={extra}
      >
        {control}
      </Form.Item>
    );
  }

  return (
    <div
      className={['ds-form-vertical', `ds-form-vertical--${typeSlug(type)}`, className]
        .filter(Boolean)
        .join(' ')}
      style={{ width: DS_FORM_PANEL.fieldWidthPx }}
    >
      {labelNode}
      <div className="ds-form-vertical__control">{control}</div>
      {extra}
    </div>
  );
}
