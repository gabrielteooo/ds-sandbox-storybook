import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_COLLAPSE_PANEL } from './collapsePanelMetrics';

/** Ant Collapse metrics — colours applied via component.css using --component-collapse-* tokens. */
export const dsCollapseTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Collapse: {
      headerBg: 'var(--component-collapse-bg-header)',
      contentBg: 'var(--component-collapse-bg-content)',
      borderRadiusLG: DS_COLLAPSE_PANEL.borderRadiusPx,
    },
  },
};
