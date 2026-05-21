import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_TIMEPICKER_PANEL } from './timePickerPanelMetrics';

/**
 * TimePicker popup — Figma 396:13603 column metrics.
 * @see https://ant.design/components/time-picker#design-token
 */
export const dsTimePickerPopupTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    DatePicker: {
      colorPrimary: '#005055',
      activeBorderColor: '#00636A',
      hoverBorderColor: '#008585',
      timeCellHeight: DS_TIMEPICKER_PANEL.cellHeightPx,
      timeColumnHeight: DS_TIMEPICKER_PANEL.columnHeightPx,
      timeColumnWidth: Math.floor((DS_TIMEPICKER_PANEL.panelWidthPx - 1) / 2),
      cellHoverBg: 'rgba(0, 0, 0, 0.06)',
      cellActiveWithRangeBg: '#C7EBEA',
    },
  },
};
