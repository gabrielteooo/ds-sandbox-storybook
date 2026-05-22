import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_UPLOAD_PANEL } from './uploadPanelMetrics';

/**
 * Upload — Figma 396:13801. Surface colours applied via component.css tokens.
 * List item height uses Ant `lineHeight × fontSize` — global lineHeight is 24px,
 * which incorrectly yields 336px (24×14); use unitless 22/14 instead.
 */
export const dsUploadTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Upload: {
      colorPrimary: '#00636A',
      fontSize: 14,
      lineHeight: DS_UPLOAD_PANEL.listItemHeightPx / 14,
    },
  },
};
