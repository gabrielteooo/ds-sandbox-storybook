import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_BADGE_PANEL } from './badgePanelMetrics';

/**
 * Badge metrics — Figma 399:66 / 399:67.
 * Colours applied via component.css semantic tokens.
 */
export const dsBadgeTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Badge: {
      dotSize: DS_BADGE_PANEL.basicDotSizePx,
      statusSize: DS_BADGE_PANEL.statusDotSizePx,
      indicatorHeight: DS_BADGE_PANEL.indicatorHeightPx,
      indicatorHeightSM: DS_BADGE_PANEL.indicatorHeightSmPx,
      textFontSize: 14,
      textFontSizeSM: 14,
      fontSize: 14,
      fontSizeSM: 8,
      /* Matches --color-system-error-default */
      colorError: '#A8071A',
    },
  },
};
