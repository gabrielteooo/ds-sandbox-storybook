import type { ArgsProps } from 'antd/es/message/interface';
import type { ReactNode } from 'react';
import type { DsToastMessageShowOptions, DsToastMessageType } from './component';
import { DS_TOAST_MESSAGE_CLASS } from './constants';
import { DS_TOAST_MESSAGE_ICONS } from './toastIcons';

export function getToastMessageArgs(
  type: DsToastMessageType,
  content: ReactNode,
  options?: DsToastMessageShowOptions,
): Omit<ArgsProps, 'type'> {
  const { icon: iconOverride, ...rest } = options ?? {};

  return {
    content,
    className: DS_TOAST_MESSAGE_CLASS,
    icon: iconOverride ?? DS_TOAST_MESSAGE_ICONS[type],
    ...rest,
  };
}
