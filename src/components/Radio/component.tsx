import { Radio } from 'antd';
import type { RadioProps as AntRadioProps } from 'antd';
import type { ReactNode } from 'react';
import './component.css';

/** Figma interaction state (Radio 395:10973) */
export type DsRadioState = 'default' | 'hover' | 'disabled';

export const DS_RADIO_STATES: DsRadioState[] = ['default', 'hover', 'disabled'];

export interface DsRadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  showLabel?: boolean;
  value?: AntRadioProps['value'];
  /** Figma interaction state; `disabled` also sets the disabled attribute */
  state?: DsRadioState;
  className?: string;
  onChange?: AntRadioProps['onChange'];
}

function wrapperClass(state: DsRadioState, className?: string) {
  return [
    'ds-radio',
    state !== 'default' ? `ds-radio--state-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Standalone radio — use inside Radio.Group via options API for groups (see DsRadioVerticalGroup).
 * @see https://ant.design/components/radio
 */
export function DsRadio({
  checked,
  defaultChecked,
  disabled = false,
  label = 'Radio button',
  showLabel = true,
  value,
  state = 'default',
  className,
  onChange,
}: DsRadioProps) {
  const isDisabled = disabled || state === 'disabled';

  const radioProps: AntRadioProps = {
    disabled: isDisabled,
    value,
    onChange,
    className: wrapperClass(state, className),
  };

  // Controlled only when `checked` is explicitly passed (e.g. disabled demos).
  // Otherwise uncontrolled so click toggles selection per Ant Design.
  if (checked !== undefined) {
    radioProps.checked = checked;
  } else if (defaultChecked !== undefined) {
    radioProps.defaultChecked = defaultChecked;
  }

  return <Radio {...radioProps}>{showLabel ? label : null}</Radio>;
}

export default DsRadio;
