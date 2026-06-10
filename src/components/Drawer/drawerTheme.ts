import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_DRAWER_PANEL } from './drawerPanelMetrics';

/** Ant Drawer metrics — colours applied via component.css using --component-drawer-* tokens. */
export const dsDrawerTheme: ThemeConfig = {
  ...antTheme,
  token: {
    ...antTheme.token,
    /* Maps to --color-bg-mask / --component-drawer-bg-overlay */
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
  },
  components: {
    ...antTheme.components,
    Drawer: {
      paddingLG: DS_DRAWER_PANEL.bodyPaddingPx,
      footerPaddingBlock: 0,
      footerPaddingInline: 0,
    },
  },
};
