import { Checkbox } from 'antd';
import type { CheckboxProps as AntCheckboxProps } from 'antd';
import type { ReactNode } from 'react';
import './component.css';

/** Figma interaction state (Checkbox 388:11396) */
export type DsCheckboxState = 'default' | 'hover' | 'focused' | 'disabled';

export const DS_CHECKBOX_STATES: DsCheckboxState[] = [
  'default',
  'hover',
  'focused',
  'disabled',
];

export interface DsCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  showLabel?: boolean;
  /** Figma interaction state; `disabled` also sets the disabled attribute */
  state?: DsCheckboxState;
  className?: string;
  onChange?: AntCheckboxProps['onChange'];
}

function wrapperClass(state: DsCheckboxState, className?: string) {
  return [
    'ds-checkbox',
    state !== 'default' ? `ds-checkbox--state-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function DsCheckbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  label = 'Checkbox',
  showLabel = true,
  state = 'default',
  className,
  onChange,
}: DsCheckboxProps) {
  const isDisabled = disabled || state === 'disabled';

  return (
    <Checkbox
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      disabled={isDisabled}
      onChange={onChange}
      className={wrapperClass(state, className)}
    >
      {showLabel ? label : null}
    </Checkbox>
  );
}

export default DsCheckbox;
