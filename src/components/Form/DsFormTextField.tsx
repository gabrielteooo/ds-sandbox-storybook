import { Form } from 'antd';
import { DsInput } from '../Input/component';
import { DsForm } from './component';
import { InputCaption, type InputCaptionStatus } from './inputCaption';
import { InputLabelVertical, labelModeToMark } from './inputLabelVertical';
import { DS_FORM_PANEL, dsFormOuterWidthPx } from './formPanelMetrics';
import '../Input/component.css';
import './component.css';

/** @deprecated Use InputLabelMark via InputLabelVertical — kept for mockups. */
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
  caption?: string;
  captionStatus?: InputCaptionStatus;
  showTooltip?: boolean;
  showHelpIcon?: boolean;
  disabled?: boolean;
  className?: string;
}

/** @deprecated Use InputLabelVertical — thin alias for existing imports. */
export function DsFormFieldLabel({
  label,
  labelMode,
}: {
  label: string;
  labelMode: DsFormLabelMode;
}) {
  return (
    <InputLabelVertical label={label} mark={labelModeToMark(labelMode)} />
  );
}

export function DsFormTextField({
  label = 'Input Label',
  labelMode = 'default',
  placeholder = 'Type here',
  caption,
  captionStatus = 'default',
  showTooltip = false,
  showHelpIcon = false,
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
      <Form.Item
        className="ds-form__field"
        label={
          <InputLabelVertical
            label={label}
            mark={labelModeToMark(labelMode)}
            showTooltip={showTooltip}
            showHelpIcon={showHelpIcon}
          />
        }
        name="text"
        rules={rules}
        extra={
          caption ? (
            <InputCaption text={caption} status={captionStatus} />
          ) : undefined
        }
      >
        <DsInput kind="basic" size="base" placeholder={placeholder} disabled={disabled} />
      </Form.Item>
    </DsForm>
  );
}

export default DsFormTextField;
