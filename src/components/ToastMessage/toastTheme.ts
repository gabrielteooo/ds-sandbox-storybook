import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_TOAST_MESSAGE_PANEL } from './toastPanelMetrics';

/**
 * Message toast metrics — Figma 421:14564 (48px dark bar, system icon colours).
 * Surface colours applied via component.css using semantic tokens.
 */
export const dsToastTheme: ThemeConfig = {
  ...antTheme,
  token: {
    ...antTheme.token,
    colorInfo: '#4096FF',
    colorSuccess: '#83CF55',
    colorError: '#FF7875',
    colorWarning: '#FFA940',
    colorBgElevated: '#191B1E',
  },
  components: {
    ...antTheme.components,
    Message: {
      contentBg: '#191B1E',
      contentPadding: `${DS_TOAST_MESSAGE_PANEL.paddingVerticalPx}px ${DS_TOAST_MESSAGE_PANEL.paddingHorizontalPx}px`,
    },
  },
};
