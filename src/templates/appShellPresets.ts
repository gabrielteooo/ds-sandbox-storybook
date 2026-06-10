import type { DsDashboardHeaderProps } from '../components/GlobalHeader/DsDashboardHeader';
import type { DsGlobalHeaderProps } from '../components/GlobalHeader';

const APP_SHELL_BREADCRUMBS: DsGlobalHeaderProps['breadcrumbItems'] = [
  { title: 'Home', href: '#' },
  { title: 'Current page title' },
];

/** Figma App shell/Application page 22552:74306 */
export const DS_APP_SHELL_APPLICATION_HEADER: Partial<DsGlobalHeaderProps> = {
  title: 'Current page title',
  breadcrumbItems: APP_SHELL_BREADCRUMBS,
  showBreadcrumbs: true,
  showDataSync: true,
  dataSyncLabel: 'Data last retrieved on',
  dataSyncTimestamp: '01 Oct 2024, 09:15 SGT',
  showPrimaryAction: false,
  showCollapseFilters: false,
  showNotifications: true,
  showHelp: true,
  showAvatar: true,
  avatarText: 'JD',
};

/** Figma App shell/Dashboard page 22552:74949 */
export const DS_APP_SHELL_DASHBOARD_HEADER: Partial<DsDashboardHeaderProps> = {
  title: 'Dashboard page title',
  breadcrumbItems: APP_SHELL_BREADCRUMBS,
  showBreadcrumbs: true,
  showDataSync: true,
  dataSyncLabel: 'Data last retrieved on',
  dataSyncTimestamp: '01 Oct 2024, 09:15 SGT',
  showPrimaryAction: true,
  primaryActionLabel: 'View in Qlik',
  showCollapseFilters: true,
  showNotifications: true,
  showHelp: true,
  showAvatar: false,
};
