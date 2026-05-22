import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_SLIDER_PANEL } from './sliderPanelMetrics';

/**
 * Slider track metrics — Figma 507:32553 (rail 4px, handle 14→12px hover).
 * Colors applied via component.css using `--component-slider-*` tokens.
 * @see https://ant.design/components/slider#design-token
 */
export const dsSliderTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Slider: {
      railSize: DS_SLIDER_PANEL.railHeightPx,
      handleSize: DS_SLIDER_PANEL.handleSizeDefaultPx,
      handleSizeHover: DS_SLIDER_PANEL.handleSizeHoverPx,
      handleLineWidth: DS_SLIDER_PANEL.handleLineWidthPx,
      handleLineWidthHover: DS_SLIDER_PANEL.handleLineWidthPx,
      // Fallback hex values — overridden by scoped CSS token vars where possible.
      railBg: 'rgba(0, 0, 0, 0.06)',
      trackBg: '#46B6B6',
      trackHoverBg: '#00636A',
      handleColor: '#46B6B6',
      handleActiveColor: '#00636A',
      trackBgDisabled: 'rgba(0, 0, 0, 0.25)',
      handleColorDisabled: 'rgba(0, 0, 0, 0.25)',
    },
  },
};
