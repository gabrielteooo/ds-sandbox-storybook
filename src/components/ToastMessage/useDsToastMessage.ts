import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import { useMemo, type ReactNode } from 'react';
import type { DsToastMessageShowOptions, DsToastMessageType } from './component';
import { getToastMessageArgs } from './toastMessageArgs';

const TYPE_TO_ANT = {
  normal: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
  loading: 'loading',
} as const satisfies Record<DsToastMessageType, string>;

function buildToastApi(messageApi: MessageInstance) {
  const show = (
    type: DsToastMessageType,
    content: ReactNode,
    options?: DsToastMessageShowOptions,
  ) => {
    const antType = TYPE_TO_ANT[type];
    return messageApi[antType](getToastMessageArgs(type, content, options));
  };

  return {
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
    destroy: messageApi.destroy,
  };
}

/**
 * Toast API bound to Ant `App` context — use inside `ToastMessageThemeProvider`.
 * @see https://ant.design/components/message#hooks-demo
 */
export function useDsToastMessage() {
  const { message: messageApi } = App.useApp();
  return useMemo(() => buildToastApi(messageApi), [messageApi]);
}
