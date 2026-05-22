import { message } from 'antd';
import type { ArgsProps, ConfigOptions } from 'antd/es/message/interface';
import type { ReactNode } from 'react';
import { DS_TOAST_MESSAGE_CLASS } from './constants';

/** Figma Toast Message types — Normal maps to Ant `info`. */
export type DsToastMessageType = 'normal' | 'success' | 'error' | 'warning' | 'loading';

export const DS_TOAST_MESSAGE_TYPES: DsToastMessageType[] = [
  'normal',
  'success',
  'error',
  'warning',
  'loading',
];

export interface DsToastMessageShowOptions
  extends Omit<ArgsProps, 'content' | 'type' | 'className'> {}

const TYPE_TO_ANT: Record<
  DsToastMessageType,
  Exclude<ArgsProps['type'], undefined>
> = {
  normal: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
  loading: 'loading',
};

function show(
  type: DsToastMessageType,
  content: ReactNode,
  options?: DsToastMessageShowOptions,
) {
  const antType = TYPE_TO_ANT[type];
  return message[antType]({
    content,
    className: DS_TOAST_MESSAGE_CLASS,
    ...options,
  });
}

export function configureDsToastMessage(config: ConfigOptions = {}) {
  message.config(config);
}

/**
 * Static toast API — prefer `useDsToastMessage()` inside `ToastMessageThemeProvider`
 * so the message holder mounts correctly (Ant Design hooks pattern).
 */
export const DsToastMessage = {
  show,
  normal: (content: ReactNode, options?: DsToastMessageShowOptions) =>
    show('normal', content, options),
  success: (content: ReactNode, options?: DsToastMessageShowOptions) =>
    show('success', content, options),
  error: (content: ReactNode, options?: DsToastMessageShowOptions) =>
    show('error', content, options),
  warning: (content: ReactNode, options?: DsToastMessageShowOptions) =>
    show('warning', content, options),
  loading: (content: ReactNode, options?: DsToastMessageShowOptions) =>
    show('loading', content, options),
  destroy: message.destroy,
  configure: configureDsToastMessage,
};
