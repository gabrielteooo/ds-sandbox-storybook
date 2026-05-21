import { Radio } from 'antd';

export type DsRadioGroupButtonStyle = 'outline' | 'solid';
export type DsRadioGroupSize = 'x-small' | 'small' | 'base';

export const DS_RADIO_GROUP_BUTTON_STYLES: DsRadioGroupButtonStyle[] = [
  'outline',
  'solid',
];

export const DS_RADIO_GROUP_SIZES: DsRadioGroupSize[] = ['x-small', 'small', 'base'];

export interface DsRadioGroupProps {
  buttonStyle?: DsRadioGroupButtonStyle;
  size?: DsRadioGroupSize;
  options?: string[];
  defaultValue?: string;
  className?: string;
}

const DEFAULT_OPTIONS = ['Button', 'Button', 'Button', 'Button'];

function mapSizeToAnt(size: DsRadioGroupSize): 'small' | 'middle' | 'large' | undefined {
  switch (size) {
    case 'x-small':
      return 'small';
    case 'small':
      return undefined;
    case 'base':
      return 'large';
  }
}

function groupClass(
  buttonStyle: DsRadioGroupButtonStyle,
  size: DsRadioGroupSize,
  className?: string,
) {
  return [
    'ds-radio-group',
    `ds-radio-group--${buttonStyle}`,
    `ds-radio-group--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function DsRadioGroup({
  buttonStyle = 'outline',
  size = 'small',
  options = DEFAULT_OPTIONS,
  defaultValue,
  className,
}: DsRadioGroupProps) {
  const values = options.map((_, index) => `option-${index}`);
  const initial = defaultValue ?? values[0];

  return (
    <Radio.Group
      optionType="button"
      buttonStyle={buttonStyle}
      size={mapSizeToAnt(size)}
      defaultValue={initial}
      className={groupClass(buttonStyle, size, className)}
    >
      {options.map((label, index) => (
        <Radio.Button key={values[index]} value={values[index]}>
          {label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

export default DsRadioGroup;
