import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_FORM_PANEL } from './formPanelMetrics';

/**
 * Form — Figma 22726:4626 (Basic: Login).
 * Vertical gaps use flex `row-gap` in component.css (not itemMarginBottom) to avoid
 * stacking with Ant’s default form-item margins.
 * Input lineHeight must be unitless — global token 24px × fontSize 16 → 384px height.
 */
export const dsFormTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Form: {
      itemMarginBottom: 0,
      verticalLabelPadding: 0,
      labelHeight: 0,
    },
    Input: {
      fontSize: DS_FORM_PANEL.inputFontSizePx,
      lineHeight:
        DS_FORM_PANEL.inputLineHeightPx / DS_FORM_PANEL.inputFontSizePx,
      controlHeight: DS_FORM_PANEL.inputHeightPx,
      controlHeightLG: DS_FORM_PANEL.inputHeightPx,
    },
    Select: {
      fontSize: DS_FORM_PANEL.inputFontSizePx,
      lineHeight:
        DS_FORM_PANEL.inputLineHeightPx / DS_FORM_PANEL.inputFontSizePx,
      controlHeight: DS_FORM_PANEL.inputHeightPx,
      controlHeightLG: DS_FORM_PANEL.inputHeightPx,
    },
    DatePicker: {
      fontSize: DS_FORM_PANEL.inputFontSizePx,
      lineHeight:
        DS_FORM_PANEL.inputLineHeightPx / DS_FORM_PANEL.inputFontSizePx,
      controlHeight: DS_FORM_PANEL.inputHeightPx,
      controlHeightLG: DS_FORM_PANEL.inputHeightPx,
    },
  },
};
