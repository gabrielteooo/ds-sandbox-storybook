import {
  DsIconEnvelope,
  DsIconGear,
  DsIconHome,
  DsIconWarehouse,
} from '../icons';
import type { DsNavigationMenuItem } from '../components/NavigationMenu';

/** Figma App shell sidemenu — Home · Module 1–4 · System Configurations. */
export const DS_APP_SHELL_NAV_ITEMS: DsNavigationMenuItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <DsIconHome size={16} />,
    activeIcon: <DsIconHome size={16} variant="solid" />,
  },
  {
    key: 'module1',
    label: 'Module 1',
    icon: <DsIconEnvelope size={16} />,
    activeIcon: <DsIconEnvelope size={16} variant="solid" />,
    children: [
      { key: 'module1-1', label: 'Navigation Item' },
      { key: 'module1-2', label: 'Navigation Item' },
      { key: 'module1-3', label: 'Navigation Item' },
    ],
  },
  {
    key: 'module2',
    label: 'Module 2',
    icon: <DsIconWarehouse size={16} />,
    activeIcon: <DsIconWarehouse size={16} variant="solid" />,
  },
  {
    key: 'module3',
    label: 'Module 3',
    icon: <DsIconWarehouse size={16} />,
    activeIcon: <DsIconWarehouse size={16} variant="solid" />,
  },
  {
    key: 'module4',
    label: 'Module 4',
    icon: <DsIconWarehouse size={16} />,
    activeIcon: <DsIconWarehouse size={16} variant="solid" />,
  },
  {
    key: 'system',
    label: 'System Configurations',
    icon: <DsIconGear size={16} />,
    activeIcon: <DsIconGear size={16} variant="solid" />,
  },
];
