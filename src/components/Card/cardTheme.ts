import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_CARD_PANEL } from './cardPanelMetrics';

/**
 * Card metrics — Figma 406:74.
 * Colours and typography applied via component.css semantic tokens.
 */
export const dsCardTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Card: {
      borderRadiusLG: 8,
      headerHeight: DS_CARD_PANEL.headerHeightDefaultPx,
      headerHeightSM: DS_CARD_PANEL.headerHeightSmallPx,
      headerPadding: DS_CARD_PANEL.headerPaddingDefaultHorizontalPx,
      headerPaddingSM: DS_CARD_PANEL.headerPaddingSmallPx,
      bodyPadding: DS_CARD_PANEL.bodyPaddingDefaultHorizontalPx,
      bodyPaddingSM: DS_CARD_PANEL.bodyPaddingSmallPx,
      headerFontSize: 16,
      headerFontSizeSM: 14,
      headerBg: 'transparent',
      /* Matches --component-card-border-default */
      colorBorderSecondary: '#F0F0F0',
    },
  },
};
