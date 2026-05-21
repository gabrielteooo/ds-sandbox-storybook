import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/** Figma placeholder / display format */
export const DS_TIME_FORMAT = 'HH:mm';

export const DS_TIMEPICKER_EXAMPLE_TIME = dayjs('14:09', DS_TIME_FORMAT);

export function getTimePickerPlaceholder(range?: boolean): string | [string, string] {
  return range ? [DS_TIME_FORMAT, DS_TIME_FORMAT] : DS_TIME_FORMAT;
}
