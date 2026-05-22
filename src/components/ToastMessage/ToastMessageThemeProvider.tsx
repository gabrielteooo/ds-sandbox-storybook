import { App, ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import './component.css';
import { DS_TOAST_MESSAGE_PANEL } from './toastPanelMetrics';
import { dsToastTheme } from './toastTheme';

/**
 * Provides scoped theme + Ant `App` message holder (required for toasts to render).
 */
export function ToastMessageThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={dsToastTheme}>
      <App
        message={{
          top: DS_TOAST_MESSAGE_PANEL.topOffsetPx,
          duration: 3,
          maxCount: DS_TOAST_MESSAGE_PANEL.maxCount,
        }}
      >
        {children}
      </App>
    </ConfigProvider>
  );
}
