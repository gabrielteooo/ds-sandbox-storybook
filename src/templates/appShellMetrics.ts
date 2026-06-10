import { DS_NAVIGATION_MENU_PANEL } from '../components/NavigationMenu/menuPanelMetrics';

/** Layout metrics for app shell templates (Figma library patterns). */
export const DS_APP_SHELL = {
  sidebarWidthExpandedPx: DS_NAVIGATION_MENU_PANEL.widthExpandedPx,
  sidebarWidthCollapsedPx: DS_NAVIGATION_MENU_PANEL.widthCollapsedPx,
  contentMinHeightPx: 900,
} as const;
