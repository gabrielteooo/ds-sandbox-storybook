import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_SWITCH_PANEL } from './switchPanelMetrics';

/**
 * Switch track metrics — Figma 396:13324 (Base 44×22, Small 28×16).
 * @see https://ant.design/components/switch#design-token
 */
export const dsSwitchTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Switch: {
      colorPrimary: '#00636A',
      trackHeight: DS_SWITCH_PANEL.trackHeightBasePx,
      trackHeightSM: DS_SWITCH_PANEL.trackHeightSmallPx,
      trackMinWidth: DS_SWITCH_PANEL.trackWidthBasePx,
      trackMinWidthSM: DS_SWITCH_PANEL.trackWidthSmallPx,
      trackPadding: DS_SWITCH_PANEL.trackPaddingPx,
      handleSize: DS_SWITCH_PANEL.handleSizeBasePx,
      handleSizeSM: DS_SWITCH_PANEL.handleSizeSmallPx,
      handleBg: '#FFFFFF',
      /* Tighter inner gutters so 1/0 and icon fit in 44×22 / 28×16 tracks. */
      innerMinMargin: 4,
      innerMaxMargin: DS_SWITCH_PANEL.handleSizeBasePx + DS_SWITCH_PANEL.trackPaddingPx,
      innerMinMarginSM: 3,
      innerMaxMarginSM: DS_SWITCH_PANEL.handleSizeSmallPx + DS_SWITCH_PANEL.trackPaddingPx,
    },
  },
};
