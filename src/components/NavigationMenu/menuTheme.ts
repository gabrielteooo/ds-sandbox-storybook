import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_NAVIGATION_MENU_PANEL } from './menuPanelMetrics';

/** Ant Menu metrics — colours applied via component.css using --component-menu-* tokens. */
export const dsMenuTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Menu: {
      itemHeight: DS_NAVIGATION_MENU_PANEL.itemHeightPx,
      collapsedWidth: DS_NAVIGATION_MENU_PANEL.widthCollapsedPx,
      iconSize: DS_NAVIGATION_MENU_PANEL.iconSizePx,
      itemMarginInline: 0,
      itemMarginBlock: DS_NAVIGATION_MENU_PANEL.itemGapPx,
      itemBorderRadius: 0,
      subMenuItemBorderRadius: 0,
    },
  },
};
