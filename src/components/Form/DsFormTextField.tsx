import { Form } from 'antd';
import { DsInput } from '../Input/component';
import { DsForm } from './component';
import { DS_FORM_PANEL, dsFormOuterWidthPx } from './formPanelMetrics';
import '../Input/component.css';
import './component.css';

/** Figma Input Label Vertical — default · required (*) · optional (22737:7451) */
export type DsFormLabelMode = 'default' | 'required' | 'optional';

export const DS_FORM_LABEL_MODES: DsFormLabelMode[] = [
  'default',
  'required',
  'optional',
];

export interface DsFormTextFieldProps {
  label?: string;
  labelMode?: DsFormLabelMode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DsFormFieldLabel({
  label,
  labelMode,
}: {
  label: string;
  labelMode: DsFormLabelMode;
}) {
  if (labelMode === 'required') {
    return (
      <span className="ds-form__label-inner">
        <span className="ds-form__label-required" aria-hidden>
          *
        </span>
        {label}
      </span>
    );
  }

  if (labelMode === 'optional') {
    return (
      <span className="ds-form__label-inner">
        {label}
        <span className="ds-form__label-optional"> (optional)</span>
      </span>
    );
  }

  return <span className="ds-form__label-inner">{label}</span>;
}

export function DsFormTextField({
  label = 'Input Label',
  labelMode = 'default',
  placeholder = 'Type here',
  disabled = false,
  className,
}: DsFormTextFieldProps) {
  const rules =
    labelMode === 'required'
      ? [{ required: true, message: `Please enter ${label.toLowerCase()}` }]
      : undefined;

  return (
    <DsForm
      name="ds-form-text-field"
      layout="vertical"
      className={['ds-form--labeled', 'ds-form--basic-text', className]
        .filter(Boolean)
        .join(' ')}
      style={{
        maxWidth: dsFormOuterWidthPx(
          DS_FORM_PANEL.fieldWidthPx,
          DS_FORM_PANEL.basicTextPaddingPx,
        ),
      }}
      requiredMark={false}
      disabled={disabled}
    >
      <Form.Item label={<DsFormFieldLabel label={label} labelMode={labelMode} />} name="text" rules={rules}>
        <DsInput kind="basic" size="base" placeholder={placeholder} disabled={disabled} />
      </Form.Item>
    </DsForm>
  );
}

export default DsFormTextField;
