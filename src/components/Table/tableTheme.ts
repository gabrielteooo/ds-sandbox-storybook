import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_TABLE_PANEL } from './tablePanelMetrics';

/**
 * Table theme — Figma 940:69332 / 940:83747.
 * Semantic colours applied via component.css; metrics drive Ant padding tokens.
 */
export const dsTableTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Table: {
      /* Maps to --component-table-bg-header */
      headerBg: '#FAFAFA',
      /* Maps to --component-table-bg-split */
      borderColor: '#E2E2E2',
      headerSplitColor: '#E2E2E2',
      /* Maps to --component-table-bg-row-split */
      rowHoverBg: '#FAFAFA',
      /* Maps to --color-system-control-bg-option-select */
      rowSelectedBg: '#C7EBEA',
      rowSelectedHoverBg: '#C7EBEA',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      cellPaddingBlock: DS_TABLE_PANEL.cellPaddingMiddleBlockPx,
      cellPaddingInline: DS_TABLE_PANEL.cellPaddingMiddleInlinePx,
      cellPaddingBlockSM: DS_TABLE_PANEL.cellPaddingSmallBlockPx,
      cellPaddingInlineSM: DS_TABLE_PANEL.cellPaddingSmallInlinePx,
      cellPaddingBlockMD: DS_TABLE_PANEL.cellPaddingMiddleBlockPx,
      cellPaddingInlineMD: DS_TABLE_PANEL.cellPaddingMiddleInlinePx,
      headerBorderRadius: 0,
      footerBg: '#FAFAFA',
    },
  },
};
