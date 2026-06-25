import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_CHIP_PANEL } from './chipPanelMetrics';

/** Ant Button metrics for Chip — colours applied via component.css using --component-chip-* tokens. */
export const dsChipTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Button: {
      ...antTheme.components?.Button,
      borderRadius: DS_CHIP_PANEL.borderRadiusPx,
      borderRadiusLG: DS_CHIP_PANEL.borderRadiusPx,
      borderRadiusSM: DS_CHIP_PANEL.borderRadiusPx,
      controlHeight: DS_CHIP_PANEL.size.base.heightPx,
      controlHeightSM: DS_CHIP_PANEL.size.small.heightPx,
    },
  },
};
