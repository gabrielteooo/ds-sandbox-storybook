import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';

/**
 * Tooltip spotlight colours — Figma 413:13162.
 * Container radius, padding, and shadow applied in component.css via tokens.
 */
export const dsTooltipTheme: ThemeConfig = {
  ...antTheme,
  token: {
    ...antTheme.token,
    colorBgSpotlight: '#535353',
    colorTextLightSolid: '#FFFFFF',
  },
};
