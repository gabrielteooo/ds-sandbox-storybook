import { Checkbox, Form, Radio } from 'antd';
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
import { DsForm } from './component';
import { InputCaption } from './inputCaption';
import { InputLabelVertical } from './inputLabelVertical';
import {
  DS_FORM_PANEL,
  DS_FORM_VARIANTS_SLIDER_MARKS,
  dsFormOuterWidthPx,
} from './formPanelMetrics';
import '../Button/component.css';
import '../Checkbox/component.css';
import '../DatePicker/component.css';
import '../Input/component.css';
import '../Radio/component.css';
import '../Select/component.css';
import '../Slider/component.css';
import '../Switch/component.css';
import '../TimePicker/component.css';
import '../Upload/component.css';
import './component.css';

function fieldLabel(text: string) {
  return <InputLabelVertical label={text} />;
}

const RADIO_GROUP_OPTIONS = ['Apple', 'Banana', 'Carrot'];

const CHOICE_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'carrot', label: 'Carrot' },
] as const;

export interface DsVerticalInputVariantsProps {
  className?: string;
  disabled?: boolean;
}

export function DsVerticalInputVariants({
  className,
  disabled = false,
}: DsVerticalInputVariantsProps) {
  return (
    <DsForm
      name="ds-vertical-input-variants"
      layout="vertical"
      className={['ds-form--labeled', 'ds-form--variants', className]
        .filter(Boolean)
        .join(' ')}
      style={{
        maxWidth: dsFormOuterWidthPx(
          DS_FORM_PANEL.variantsWidthPx,
          DS_FORM_PANEL.variantsPaddingPx,
        ),
      }}
      requiredMark={false}
      disabled={disabled}
      initialValues={{
        text: undefined,
        select: undefined,
        password: undefined,
        textArea: undefined,
        date: undefined,
        dateRange: undefined,
        time: undefined,
        inputNumber: undefined,
        radioGroup: 'option-0',
        radioButtons: 'apple',
        checkboxes: ['apple'],
        rememberSwitch: true,
        slider: 100,
      }}
    >
      <Form.Item
        className="ds-form__field"
        label={fieldLabel('Text')}
        name="text"
        extra={
          <InputCaption text="This is a caption under a text input." status="default" />
        }
      >
        <DsInput kind="basic" size="base" placeholder="Type here" disabled={disabled} />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Select')} name="select">
        <DsSelect
          variant="basic"
          size="base"
          placeholder="Select"
          options={[...DS_SELECT_DEFAULT_OPTIONS]}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Password')} name="password">
        <DsInput
          kind="password"
          size="base"
          placeholder="Password"
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Text Area')} name="textArea">
        <DsInput
          kind="textarea"
          size="base"
          placeholder="Provide details here"
          rows={3}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Date Picker')} name="date">
        <DsDatePicker
          size="base"
          picker="date"
          placeholder="DD/MM/YYYY"
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Date Range Picker')} name="dateRange">
        <DsDatePicker
          size="base"
          picker="date"
          range
          placeholder={['DD/MM/YYYY', 'DD/MM/YYYY']}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Time Picker')} name="time">
        <DsTimePicker size="base" disabled={disabled} />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Input Number')} name="inputNumber">
        <DsInput kind="number" size="base" disabled={disabled} />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Radio Groups')} name="radioGroup">
        <DsRadioGroup
          buttonStyle="outline"
          size="base"
          options={RADIO_GROUP_OPTIONS}
        />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Radio Buttons')} name="radioButtons">
        <Radio.Group disabled={disabled} className="ds-form__choice-row">
          {CHOICE_OPTIONS.map((option) => (
            <DsRadio
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Checkbox')} name="checkboxes">
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
      </Form.Item>

      <Form.Item
        className="ds-form__field"
        label={fieldLabel('Switch')}
        name="rememberSwitch"
        valuePropName="checked"
      >
        <DsSwitch size="base" disabled={disabled} />
      </Form.Item>

      <Form.Item className="ds-form__field" label={fieldLabel('Button')}>
        <DsButton variant="secondary" size="base" label="Button" disabled={disabled} />
      </Form.Item>

      <Form.Item className="ds-form__field ds-form__field--upload" label={fieldLabel('Upload')}>
        <DsUpload variant="dragger" disabled={disabled} showUploadList={false} />
      </Form.Item>

      <Form.Item
        className="ds-form__field ds-form__field--slider"
        label={fieldLabel('Slider')}
        name="slider"
      >
        <DsSlider
          min={0}
          max={600}
          step={1}
          marks={DS_FORM_VARIANTS_SLIDER_MARKS}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        className="ds-form__field ds-form__field--readonly"
        label={fieldLabel('Read only')}
      >
        <span className="ds-form__readonly text-base-normal">Read-only text</span>
      </Form.Item>
    </DsForm>
  );
}

export default DsVerticalInputVariants;
