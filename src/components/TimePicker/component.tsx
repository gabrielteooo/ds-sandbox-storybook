import { TimePicker } from 'antd';
import { DsIconClock } from '../../icons';
import type { TimePickerProps } from 'antd';
import type { TimeRangePickerProps } from 'antd/es/time-picker';
import type { Dayjs } from 'dayjs';
import { forwardRef, type ComponentRef, type ReactElement } from 'react';
import {
  mapDatePickerSizeToAnt,
  mapDatePickerStatusToAnt,
} from '../DatePicker/component';
import { DS_TIME_FORMAT, getTimePickerPlaceholder } from './timePickerConfig';
import { TimePickerThemeProvider } from './TimePickerThemeProvider';
import { useTimePickerAutoClose } from './useTimePickerAutoClose';
import './component.css';

/** Matches Input / Select / DatePicker field sizes (Figma 507:32759). */
export type DsTimePickerSize = 'x-small' | 'small' | 'base';

export type DsTimePickerStatus = 'default' | 'warning' | 'error';

export const DS_TIMEPICKER_SIZES: DsTimePickerSize[] = ['x-small', 'small', 'base'];
export const DS_TIMEPICKER_STATUSES: DsTimePickerStatus[] = ['default', 'warning', 'error'];

function rootClass(
  size: DsTimePickerSize,
  status: DsTimePickerStatus,
  range: boolean,
  className?: string,
) {
  return [
    'ds-timepicker',
    `ds-timepicker--${size}`,
    status !== 'default' ? `ds-timepicker--status-${status}` : '',
    range ? 'ds-timepicker--range' : 'ds-timepicker--single',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export interface DsTimePickerProps
  extends Omit<
    TimePickerProps,
    'size' | 'status' | 'format' | 'placeholder' | 'suffixIcon' | 'picker'
  > {
  size?: DsTimePickerSize;
  status?: DsTimePickerStatus;
  /** Range selection (start–end). */
  range?: boolean;
  format?: string;
  placeholder?: string | [string, string];
  popupClassName?: string;
}

export interface DsTimePickerRangeProps
  extends Omit<
    TimeRangePickerProps,
    'size' | 'status' | 'format' | 'placeholder' | 'suffixIcon' | 'picker'
  > {
  size?: DsTimePickerSize;
  status?: DsTimePickerStatus;
  range: true;
  format?: string;
  placeholder?: string | [string, string];
  popupClassName?: string;
}

export type DsTimePickerAllProps = DsTimePickerProps | DsTimePickerRangeProps;

type DsTimePickerRef = ComponentRef<typeof TimePicker>;

export const DsTimePicker = forwardRef<DsTimePickerRef, DsTimePickerAllProps>(function DsTimePicker(
  props,
  ref,
): ReactElement {
  const {
    size = 'small',
    status = 'default',
    range = false,
    format: formatProp,
    placeholder: placeholderProp,
    className,
    popupClassName,
    needConfirm = false,
    showNow = false,
    onOpenChange,
    onCalendarChange,
    onFocus,
    ...rest
  } = props as DsTimePickerProps & { range?: boolean };

  const antSize = mapDatePickerSizeToAnt(size);
  const antStatus = mapDatePickerStatusToAnt(status);
  const mergedClass = rootClass(size, status, range, className);
  const mergedPopup = ['ds-timepicker__popup', popupClassName].filter(Boolean).join(' ');
  const suffixIcon = <DsIconClock />;
  const format = formatProp ?? DS_TIME_FORMAT;
  const placeholder = placeholderProp ?? getTimePickerPlaceholder(range);

  const seedValue =
    'value' in rest
      ? (rest.value as Dayjs | [Dayjs | null, Dayjs | null] | null | undefined)
      : (rest as TimePickerProps).defaultValue;

  const autoCloseProps = useTimePickerAutoClose({
    format,
    needConfirm,
    range,
    seedValue: seedValue ?? null,
    onOpenChange,
    onFocus,
    onCalendarChange: onCalendarChange
      ? (dates, dateStrings, info) =>
          onCalendarChange(
            dates as Dayjs | Dayjs[],
            dateStrings as string | string[],
            info,
          )
      : undefined,
  });

  const sharedProps = {
    className: mergedClass,
    popupClassName: mergedPopup,
    size: antSize,
    status: antStatus,
    format,
    suffixIcon,
    needConfirm,
    showNow,
  };

  if (range) {
    const { RangePicker } = TimePicker;
    const rangeRest = rest as TimeRangePickerProps;
    return (
      <TimePickerThemeProvider>
        <RangePicker
          ref={ref}
          {...rangeRest}
          {...sharedProps}
          {...autoCloseProps}
          placeholder={placeholder as [string, string]}
        />
      </TimePickerThemeProvider>
    );
  }

  const singleRest = rest as TimePickerProps;
  return (
    <TimePickerThemeProvider>
      <TimePicker
        ref={ref}
        {...singleRest}
        {...sharedProps}
        {...autoCloseProps}
        placeholder={placeholder as string}
      />
    </TimePickerThemeProvider>
  );
});

DsTimePicker.displayName = 'DsTimePicker';
