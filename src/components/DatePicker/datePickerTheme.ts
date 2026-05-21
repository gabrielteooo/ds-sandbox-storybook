import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';

/**
 * DatePicker popup theme — aligns with Ant Design panel metrics (cell 24×36, textHeight 32)
 * and MCP DS datepicker / primary tokens.
 * @see https://ant.design/components/date-picker#design-token
 */
export const dsDatePickerPopupTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    DatePicker: {
      colorPrimary: '#005055',
      activeBorderColor: '#00636A',
      hoverBorderColor: '#008585',
      cellHeight: 24,
      cellWidth: 34,
      /** Header nav — match text-sm line (22px) + compact hit area */
      textHeight: 22,
      /** Month/year: ~286px grid / 4 rows (Figma 326px panel, no footer) */
      withoutTimeCellHeight: 71,
      cellHoverBg: 'rgba(0, 0, 0, 0.06)',
      cellActiveWithRangeBg: '#C7EBEA',
      cellHoverWithRangeBg: '#C7EBEA',
      cellRangeBorderColor: '#C7EBEA',
      cellBgDisabled: 'rgba(0, 0, 0, 0.04)',
      timeCellHeight: 28,
      timeColumnHeight: 224,
      timeColumnWidth: 56,
    },
  },
};
