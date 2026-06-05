import type { ThemeConfig } from 'antd';
import { antTheme } from '../../ant-theme';
import { DS_BREADCRUMB_PANEL } from './breadcrumbPanelMetrics';

/**
 * Breadcrumb metrics — Figma 446:26123.
 * Colours applied via component.css semantic tokens.
 *
 * Figma Breadcrumb link colours:
 *   Default / Hover text:  --color-text-default (rgba(0,0,0,0.88))
 *   Current (last) text:   --color-text-tertiary (rgba(0,0,0,0.55))
 *   Separator + divider:   --color-text-tertiary (rgba(0,0,0,0.55))
 *   Hover bg:              --color-bg-text-hover (rgba(0,0,0,0.06))
 *
 * TOKEN GAP: Figma has `breadcrumb/text/default`, `breadcrumb/text/current`,
 *   `breadcrumb/divider`, `breadcrumb/bg/hover` — no matching --component-breadcrumb-*
 *   semantic tokens in tokens.css; nearest --color-* equivalents used.
 */
export const dsBreadcrumbTheme: ThemeConfig = {
  ...antTheme,
  components: {
    ...antTheme.components,
    Breadcrumb: {
      /* item / link default colour */
      itemColor: 'rgba(0, 0, 0, 0.88)',
      linkColor: 'rgba(0, 0, 0, 0.88)',
      linkHoverColor: 'rgba(0, 0, 0, 0.88)',
      /* last (current) item */
      lastItemColor: 'rgba(0, 0, 0, 0.55)',
      /* separator `/` */
      separatorColor: 'rgba(0, 0, 0, 0.55)',
      separatorMargin: DS_BREADCRUMB_PANEL.separatorMarginPx,
      /* icon alongside label */
      iconFontSize: DS_BREADCRUMB_PANEL.homeIconSizePx,
      /* item padding / radius */
      borderRadiusSM: DS_BREADCRUMB_PANEL.borderRadiusPx,
      paddingXXS: DS_BREADCRUMB_PANEL.itemPaddingPx,
      marginXXS: DS_BREADCRUMB_PANEL.iconLabelGapPx,
      /* hover background from global Ant token */
      colorBgTextHover: 'rgba(0, 0, 0, 0.06)',
    },
  },
};
