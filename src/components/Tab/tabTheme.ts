import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_TAB_PANEL } from './tabPanelMetrics';

/**
 * Tabs metrics — Figma 512:65398.
 * Colours and typography applied via component.css semantic tokens.
 */
export const dsTabTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Tabs: {
      horizontalItemGutter: DS_TAB_PANEL.horizontalItemGutterPx,
      horizontalItemPadding: `${DS_TAB_PANEL.horizontalPaddingDefaultPx}px 0`,
      horizontalItemPaddingSM: `${DS_TAB_PANEL.horizontalPaddingSmallPx}px 0`,
      horizontalItemPaddingLG: `${DS_TAB_PANEL.horizontalPaddingLargePx}px 0`,
      verticalItemPadding: `${DS_TAB_PANEL.verticalPaddingBlockDefaultPx}px ${DS_TAB_PANEL.verticalPaddingInlinePx}px`,
      verticalItemMargin: `${DS_TAB_PANEL.verticalItemGapPx}px 0 0 0`,
      inkBarColor: '#00636A',
      itemColor: 'rgba(0, 0, 0, 0.88)',
      itemSelectedColor: '#00636A',
      itemHoverColor: '#00636A',
      itemActiveColor: '#00636A',
      /* Figma Default/Small use 14px; Large uses 16px */
      titleFontSize: 14,
      titleFontSizeSM: 14,
      titleFontSizeLG: 16,
      /* Container variant — Figma 1819:69698 */
      cardGutter: DS_TAB_PANEL.containerCardGutterPx,
      cardHeight: DS_TAB_PANEL.containerTabHeightSmallPx,
      cardHeightLG: DS_TAB_PANEL.containerTabHeightBasePx,
      cardPadding: `${DS_TAB_PANEL.containerTabPaddingBlockPx}px ${DS_TAB_PANEL.containerTabPaddingInlinePx}px`,
      cardPaddingSM: `${DS_TAB_PANEL.containerTabPaddingBlockPx}px ${DS_TAB_PANEL.containerTabPaddingInlinePx}px`,
      cardPaddingLG: `${DS_TAB_PANEL.containerTabPaddingBlockPx}px ${DS_TAB_PANEL.containerTabPaddingInlinePx}px`,
      /* Inactive card tab bg — tab/bg/default */
      cardBg: '#F5F5F5',
    },
  },
};
