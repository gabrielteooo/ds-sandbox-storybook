import { DsForm } from './component';
import { FormVertical } from './formVertical';
import {
  DS_FORM_PANEL,
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

export interface DsVerticalInputVariantsProps {
  className?: string;
  disabled?: boolean;
}

/** Figma Form / Vertical gallery (515:43856) — one field per Type variant. */
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
        phone: undefined,
        time: undefined,
        inputNumber: 3,
        currency: '1,234,567',
        radioButtons: 'option-0',
        radioGroup: 'apple',
        checkboxes: ['apple'],
        rememberSwitch: true,
        slider: 100,
      }}
    >
      <FormVertical type="Read-only" disabled={disabled} />
      <FormVertical type="Text" name="text" disabled={disabled} />
      <FormVertical type="Button" disabled={disabled} />
      <FormVertical type="DatePicker" name="date" disabled={disabled} />
      <FormVertical type="InputNumber" name="inputNumber" disabled={disabled} />
      <FormVertical type="Password" name="password" disabled={disabled} />
      <FormVertical type="Phone" name="phone" disabled={disabled} />
      <FormVertical type="Select" name="select" disabled={disabled} />
      <FormVertical type="Switch" name="rememberSwitch" disabled={disabled} />
      <FormVertical type="Textarea" name="textArea" disabled={disabled} />
      <FormVertical type="Currency" name="currency" disabled={disabled} />
      <FormVertical type="Slider" name="slider" disabled={disabled} />
      <FormVertical type="Drag and Drop" disabled={disabled} />
      <FormVertical type="Radio Buttons" name="radioButtons" disabled={disabled} />
      <FormVertical type="Radio Group" name="radioGroup" disabled={disabled} />
      <FormVertical type="Checkbox Group" name="checkboxes" disabled={disabled} />
      <FormVertical type="TimePicker" name="time" disabled={disabled} />
    </DsForm>
  );
}

export default DsVerticalInputVariants;
