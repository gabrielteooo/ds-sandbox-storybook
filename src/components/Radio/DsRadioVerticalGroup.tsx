import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd';

export interface DsRadioVerticalGroupProps {
  options?: string[];
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  onChange?: RadioGroupProps['onChange'];
}

const DEFAULT_OPTIONS = ['Option A', 'Option B', 'Option C'];

/** Figma 22688:24078 — vertical group using Ant Radio.Group options API */
export function DsRadioVerticalGroup({
  options = DEFAULT_OPTIONS,
  defaultValue,
  disabled = false,
  className,
  onChange,
}: DsRadioVerticalGroupProps) {
  const values = options.map((_, index) => `option-${index}`);

  return (
    <Radio.Group
      disabled={disabled}
      defaultValue={defaultValue ?? values[0]}
      onChange={onChange}
      className={['ds-radio-vertical-group', className].filter(Boolean).join(' ')}
      options={options.map((label, index) => ({
        label,
        value: values[index],
        className: 'ds-radio',
      }))}
    />
  );
}

export default DsRadioVerticalGroup;
