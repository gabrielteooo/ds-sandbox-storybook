import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_DROPDOWN_PANEL } from './dropdownPanelMetrics';

/**
 * Dropdown menu metrics — Figma 375:2319 / 22770:15500.
 * Item hover/selected/danger colours are applied via component.css
 * using --component-dropdown-* tokens.
 */
export const dsDropdownTheme: ThemeConfig = {
  ...antTheme,
  token: {
    ...antTheme.token,
    /* SM/Normal — Figma size/sm 14px, line-h/s 22px */
    fontSize: DS_DROPDOWN_PANEL.itemFontSizePx,
    lineHeight:
      DS_DROPDOWN_PANEL.itemLineHeightPx / DS_DROPDOWN_PANEL.itemFontSizePx,
    borderRadiusSM: DS_DROPDOWN_PANEL.itemBorderRadiusPx,
    controlItemBgHover: 'rgba(0, 0, 0, 0.06)',
    controlItemBgActive: '#C7EBEA',
    controlItemBgActiveHover: '#C7EBEA',
    colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
  },
  components: {
    ...antTheme.components,
    Dropdown: {
      /** item vertical padding → total height = 22px line-height + 2×5px = 32px */
      paddingBlock: DS_DROPDOWN_PANEL.itemPaddingBlockPx,
      controlPaddingHorizontal: DS_DROPDOWN_PANEL.itemPaddingInlinePx,
      borderRadiusLG: DS_DROPDOWN_PANEL.itemBorderRadiusPx,
      colorError: '#A8071A',
    },
  },
};
