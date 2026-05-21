import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { forwardRef, useMemo, type ComponentRef, type ReactElement } from 'react';
import {
  getDatePickerFormat,
  getDatePickerPlaceholder,
  getShowTimeConfig,
  type DsDatePickerPicker,
} from './datePickerConfig';
import { DatePickerThemeProvider } from './DatePickerThemeProvider';
import './component.css';

export type { DsDatePickerPicker } from './datePickerConfig';

/** Matches Input / Select field sizes (Figma 415:795). */
export type DsDatePickerSize = 'x-small' | 'small' | 'base';

export type DsDatePickerStatus = 'default' | 'warning' | 'error';

export const DS_DATEPICKER_SIZES: DsDatePickerSize[] = ['x-small', 'small', 'base'];
export const DS_DATEPICKER_PICKERS: DsDatePickerPicker[] = ['date', 'month', 'year'];
export const DS_DATEPICKER_STATUSES: DsDatePickerStatus[] = ['default', 'warning', 'error'];

export function mapDatePickerSizeToAnt(
  size: DsDatePickerSize,
): NonNullable<DatePickerProps['size']> {
  switch (size) {
    case 'x-small':
      return 'small';
    case 'small':
      return 'middle';
    case 'base':
      return 'large';
  }
}

export function mapDatePickerStatusToAnt(
  status: DsDatePickerStatus,
): DatePickerProps['status'] | undefined {
  switch (status) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return undefined;
  }
}

function rootClass(
  size: DsDatePickerSize,
  status: DsDatePickerStatus,
  range: boolean,
  showTime: boolean,
  className?: string,
) {
  return [
    'ds-datepicker',
    `ds-datepicker--${size}`,
    status !== 'default' ? `ds-datepicker--status-${status}` : '',
    range ? 'ds-datepicker--range' : 'ds-datepicker--single',
    showTime ? 'ds-datepicker--datetime' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type AntPicker = DatePickerProps['picker'];

function mapPickerToAnt(picker: DsDatePickerPicker): AntPicker {
  return picker === 'date' ? 'date' : picker;
}

export interface DsDatePickerProps
  extends Omit<
    DatePickerProps,
    'size' | 'picker' | 'status' | 'format' | 'showTime' | 'placeholder' | 'suffixIcon'
  > {
  size?: DsDatePickerSize;
  status?: DsDatePickerStatus;
  picker?: DsDatePickerPicker;
  /** Range selection (start–end). */
  range?: boolean;
  showTime?: boolean | DatePickerProps['showTime'];
  format?: string;
  placeholder?: string | [string, string];
  popupClassName?: string;
}

export interface DsDatePickerRangeProps
  extends Omit<
    RangePickerProps,
    'size' | 'picker' | 'status' | 'format' | 'showTime' | 'placeholder' | 'suffixIcon'
  > {
  size?: DsDatePickerSize;
  status?: DsDatePickerStatus;
  picker?: DsDatePickerPicker;
  range: true;
  showTime?: boolean | RangePickerProps['showTime'];
  format?: string;
  placeholder?: string | [string, string];
  popupClassName?: string;
}

export type DsDatePickerAllProps = DsDatePickerProps | DsDatePickerRangeProps;

function usePickerConfig(props: {
  picker?: DsDatePickerPicker;
  showTime?: boolean | DatePickerProps['showTime'];
  format?: string;
  placeholder?: string | [string, string];
  range?: boolean;
}) {
  const picker = props.picker ?? 'date';
  const showTime = Boolean(props.showTime);
  return useMemo(
    () => ({
      picker,
      antPicker: mapPickerToAnt(picker),
      format: props.format ?? getDatePickerFormat(picker, showTime),
      placeholder:
        props.placeholder ?? getDatePickerPlaceholder(picker, props.range),
      showTime: getShowTimeConfig(props.showTime),
      showTimeFlag: showTime,
    }),
    [picker, props.format, props.placeholder, props.range, props.showTime, showTime],
  );
}

type DsDatePickerRef = ComponentRef<typeof DatePicker>;

export const DsDatePicker = forwardRef<DsDatePickerRef, DsDatePickerAllProps>(function DsDatePicker(
  props,
  ref,
): ReactElement {
  const {
    size = 'small',
    status = 'default',
    picker: pickerProp,
    range = false,
    showTime,
    format: formatProp,
    placeholder: placeholderProp,
    className,
    popupClassName,
    ...rest
  } = props as DsDatePickerProps & { range?: boolean };

  const config = usePickerConfig({
    picker: pickerProp,
    showTime,
    format: formatProp,
    placeholder: placeholderProp,
    range,
  });

  const antSize = mapDatePickerSizeToAnt(size);
  const antStatus = mapDatePickerStatusToAnt(status);
  const mergedClass = rootClass(size, status, range, config.showTimeFlag, className);
  const mergedPopup = ['ds-datepicker__popup', popupClassName].filter(Boolean).join(' ');
  const suffixIcon = <CalendarOutlined aria-hidden />;

  const defaultShowToday = config.antPicker === 'date' && !config.showTimeFlag;
  const showToday =
    rest.showToday !== undefined ? rest.showToday : defaultShowToday;

  const sharedProps = {
    className: mergedClass,
    popupClassName: mergedPopup,
    size: antSize,
    picker: config.antPicker,
    status: antStatus,
    format: config.format,
    showToday,
    suffixIcon,
  };

  if (range) {
    const { RangePicker } = DatePicker;
    const rangeRest = rest as RangePickerProps;
    return (
      <DatePickerThemeProvider>
        <RangePicker
          ref={ref}
          {...rangeRest}
          {...sharedProps}
          showTime={config.showTime as RangePickerProps['showTime']}
          placeholder={config.placeholder as [string, string]}
        />
      </DatePickerThemeProvider>
    );
  }

  const singleRest = rest as DatePickerProps;
  return (
    <DatePickerThemeProvider>
      <DatePicker
        ref={ref}
        {...singleRest}
        {...sharedProps}
        showTime={config.showTime}
        placeholder={config.placeholder as string}
      />
    </DatePickerThemeProvider>
  );
});

DsDatePicker.displayName = 'DsDatePicker';
