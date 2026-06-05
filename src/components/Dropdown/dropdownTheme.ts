import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_DROPDOWN_PANEL } from './dropdownPanelMetrics';

/**
 * Dropdown menu metrics — Figma 375:2319 / 376:10633.
 * Item hover/selected/danger colours are applied via component.css
 * (Ant exposes limited colour tokens for dropdown status states).
 *
 * TOKEN GAP: Figma `dropdown/text/default`, `dropdown/text/selected`,
 *   `dropdown/text/danger`, `dropdown/bg/hover-danger` etc. have no
 *   matching --component-dropdown-* tokens in tokens.css.
 *   Nearest --color-* equivalents used throughout.
 */
export const dsDropdownTheme: ThemeConfig = {
  ...antTheme,
  token: {
    ...antTheme.token,
    /* Base/Normal — Figma size/base 16px, line-h/base 24px */
    fontSize: DS_DROPDOWN_PANEL.itemFontSizePx,
    lineHeight:
      DS_DROPDOWN_PANEL.itemLineHeightPx / DS_DROPDOWN_PANEL.itemFontSizePx,
    borderRadiusSM: DS_DROPDOWN_PANEL.itemBorderRadiusPx,
    /* Figma 375:2319 item states */
    controlItemBgHover: 'rgba(0, 0, 0, 0.06)',
    controlItemBgActive: '#C7EBEA',
    controlItemBgActiveHover: '#C7EBEA',
    colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
  },
  components: {
    ...antTheme.components,
    Dropdown: {
      /** item vertical padding → total height = 24px line-height + 2×8px = 40px */
      paddingBlock: DS_DROPDOWN_PANEL.itemPaddingBlockPx,
      /** Figma space/sm — 12px horizontal padding */
      controlPaddingHorizontal: DS_DROPDOWN_PANEL.itemPaddingInlinePx,
      /** menu popup border radius — radius/base */
      borderRadiusLG: DS_DROPDOWN_PANEL.itemBorderRadiusPx,
      /** danger item default text — dropdown/text/danger */
      colorError: '#A8071A',
    },
  },
};
