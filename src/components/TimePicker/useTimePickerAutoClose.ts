import type { TimePickerProps } from 'antd';
import type { BaseInfo } from 'rc-picker/es/interface';
import type { Dayjs } from 'dayjs';
import { useCallback, useRef, useState, type FocusEvent } from 'react';
import { DS_TIME_FORMAT } from './timePickerConfig';

type CalendarChangeHandler = (
  dates: Dayjs | Dayjs[] | [Dayjs | null, Dayjs | null] | null,
  dateStrings: string | string[] | [string, string],
  info: BaseInfo,
) => void;

function toPair(
  value: Dayjs | Dayjs[] | [Dayjs | null, Dayjs | null] | null | undefined,
): [Dayjs | null, Dayjs | null] {
  if (value === null || value === undefined) {
    return [null, null];
  }
  if (Array.isArray(value)) {
    return [value[0] ?? null, value[1] ?? null];
  }
  return [value, null];
}

/** True when the last required time unit changed (minute for HH:mm, second if present). */
function isLastUnitChange(format: string, prev: Dayjs, next: Dayjs): boolean {
  if (format.includes('s') && prev.second() !== next.second()) {
    return true;
  }
  if (format.includes('m') && !format.includes('s') && prev.minute() !== next.minute()) {
    return true;
  }
  if (!format.includes('m') && prev.hour() !== next.hour()) {
    return true;
  }
  return false;
}

function findChangedIndex(
  format: string,
  prev: [Dayjs | null, Dayjs | null],
  next: [Dayjs | null, Dayjs | null],
): number | null {
  for (let i = 0; i < 2; i += 1) {
    const prevDate = prev[i];
    const nextDate = next[i];
    if (!nextDate?.isValid() || !prevDate?.isValid()) {
      continue;
    }
    if (isLastUnitChange(format, prevDate, nextDate)) {
      return i;
    }
  }
  return null;
}

/**
 * Range end field: close when minute (or last unit) is committed.
 * First end panel change after focus is often hour-only — keep open.
 * Minute-only click (prev end null) closes when minute differs from start.
 */
function shouldCloseOnEndChange(
  format: string,
  start: Dayjs,
  prevEnd: Dayjs | null,
  nextEnd: Dayjs,
): boolean {
  if (prevEnd?.isValid()) {
    return isLastUnitChange(format, prevEnd, nextEnd);
  }

  if (!start?.isValid() || !nextEnd?.isValid()) {
    return false;
  }

  if (format.includes('m') && !format.includes('s')) {
    return nextEnd.minute() !== start.minute();
  }
  if (format.includes('s')) {
    return nextEnd.second() !== start.second();
  }
  return nextEnd.hour() !== start.hour();
}

function shouldCloseRange(
  format: string,
  info: BaseInfo,
  prev: [Dayjs | null, Dayjs | null],
  next: [Dayjs | null, Dayjs | null],
): boolean {
  const start = next[0];
  const end = next[1];

  if (!start?.isValid()) {
    return false;
  }

  if (info.range === 'start') {
    return false;
  }

  if (info.range === 'end' && end?.isValid()) {
    return shouldCloseOnEndChange(format, start, prev[1], end);
  }

  const changedIndex = findChangedIndex(format, prev, next);
  if (changedIndex === 1 && end?.isValid()) {
    return shouldCloseOnEndChange(format, start, prev[1], end);
  }

  return false;
}

export function useTimePickerAutoClose(options: {
  format?: string;
  needConfirm?: boolean;
  range?: boolean;
  seedValue?: Dayjs | [Dayjs | null, Dayjs | null] | null;
  onOpenChange?: TimePickerProps['onOpenChange'];
  onCalendarChange?: CalendarChangeHandler;
  onFocus?: TimePickerProps['onFocus'];
}) {
  const {
    format = DS_TIME_FORMAT,
    needConfirm = false,
    range = false,
    seedValue,
    onOpenChange,
    onCalendarChange,
    onFocus,
  } = options;

  const [open, setOpen] = useState(false);
  const prevValuesRef = useRef<[Dayjs | null, Dayjs | null]>([null, null]);

  const resetSnapshot = useCallback(() => {
    prevValuesRef.current = [null, null];
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
    resetSnapshot();
  }, [onOpenChange, resetSnapshot]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        prevValuesRef.current = toPair(seedValue ?? null);
      } else {
        resetSnapshot();
      }
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, resetSnapshot, seedValue],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLElement>, info: BaseInfo) => {
      if (range && info.range === 'end') {
        prevValuesRef.current[1] = null;
      }
      onFocus?.(event, info);
    },
    [onFocus, range],
  );

  const handleCalendarChange = useCallback<CalendarChangeHandler>(
    (dates, dateStrings, info) => {
      onCalendarChange?.(dates, dateStrings, info);

      if (needConfirm) {
        return;
      }

      const nextPair = toPair(dates);

      if (range) {
        if (shouldCloseRange(format, info, prevValuesRef.current, nextPair)) {
          closePanel();
          return;
        }
        prevValuesRef.current = nextPair;
        return;
      }

      const changedIndex = findChangedIndex(format, prevValuesRef.current, nextPair);
      if (changedIndex !== null) {
        closePanel();
        return;
      }

      prevValuesRef.current = nextPair;
    },
    [closePanel, format, needConfirm, onCalendarChange, range],
  );

  const popupOpenProps = needConfirm
    ? {}
    : {
        open,
        onOpenChange: handleOpenChange,
        onCalendarChange: handleCalendarChange,
        ...(range ? { onFocus: handleFocus } : {}),
      };

  return popupOpenProps;
}
