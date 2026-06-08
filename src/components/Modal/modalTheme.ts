import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_MODAL_PANEL } from './modalPanelMetrics';

/**
 * Modal theme — Figma 2914:74905 / 422:13514.
 * Colours, typography, and spacing applied via component.css semantic tokens.
 */
export const dsModalTheme: ThemeConfig = {
  ...antTheme,
  token: {
    ...antTheme.token,
    /* Maps to --color-bg-mask */
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    borderRadiusLG: DS_MODAL_PANEL.borderRadiusPx,
  },
  components: {
    ...antTheme.components,
    Modal: {
      borderRadiusLG: DS_MODAL_PANEL.borderRadiusPx,
      titleFontSize: 16,
      titleLineHeight: 1.5,
      /* Maps to --component-card-bg-default */
      headerBg: '#FFFFFF',
      contentBg: '#FFFFFF',
      footerBg: 'transparent',
      paddingContentHorizontalLG: DS_MODAL_PANEL.headerPaddingInlinePx,
      marginXS: 8,
      marginSM: 12,
    },
  },
};
