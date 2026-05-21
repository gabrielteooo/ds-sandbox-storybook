import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
export type DsDatePickerPicker = 'date' | 'month' | 'year';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(advancedFormat);

export const DS_DATE_FORMAT_DATE = 'DD/MM/YYYY';
export const DS_DATE_FORMAT_MONTH = 'MM/YYYY';
export const DS_DATE_FORMAT_YEAR = 'YYYY';
export const DS_DATE_FORMAT_DATETIME = 'DD/MM/YYYY, HH:mm';
export const DS_DATE_FORMAT_TIME = 'HH:mm';

/** Example value for docs: 21/05/2026 15:00 */
export const DS_DATEPICKER_EXAMPLE_DATETIME = dayjs('2026-05-21 15:00');

export function getDatePickerFormat(
  picker: DsDatePickerPicker,
  showTime?: boolean,
): string {
  if (showTime) {
    return DS_DATE_FORMAT_DATETIME;
  }
  switch (picker) {
    case 'month':
      return DS_DATE_FORMAT_MONTH;
    case 'year':
      return DS_DATE_FORMAT_YEAR;
    default:
      return DS_DATE_FORMAT_DATE;
  }
}

export function getDatePickerPlaceholder(
  picker: DsDatePickerPicker,
  range?: boolean,
): string | [string, string] {
  const single =
    picker === 'month'
      ? 'MM/YYYY'
      : picker === 'year'
        ? 'YYYY'
        : DS_DATE_FORMAT_DATE;
  return range ? [single, single] : single;
}

export function getShowTimeConfig(
  showTime?: boolean | DatePickerProps['showTime'],
): DatePickerProps['showTime'] {
  if (!showTime) {
    return undefined;
  }
  if (showTime === true) {
    return {
      format: DS_DATE_FORMAT_TIME,
      defaultValue: dayjs('00:00', DS_DATE_FORMAT_TIME),
    };
  }
  return showTime;
}
