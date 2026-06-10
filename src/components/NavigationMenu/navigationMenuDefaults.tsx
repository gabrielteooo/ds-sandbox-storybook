import {
  DsIconEnvelope,
  DsIconGear,
  DsIconHome,
  DsIconWarehouse,
} from '../../icons';
import type { DsNavigationMenuItem } from './component';

/** Figma Sidemenu 218:15636 — default navigation structure. */
export const DS_NAVIGATION_MENU_DEFAULT_ITEMS: DsNavigationMenuItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <DsIconHome size={16} />,
    activeIcon: <DsIconHome size={16} variant="solid" />,
  },
  {
    key: 'sub1',
    label: 'Submenu',
    icon: <DsIconEnvelope size={16} />,
    activeIcon: <DsIconEnvelope size={16} variant="solid" />,
    children: [
      { key: 'sub1-1', label: 'Navigation Item' },
      { key: 'sub1-2', label: 'Navigation Item' },
      { key: 'sub1-3', label: 'Navigation Item' },
    ],
  },
  {
    key: 'sub2',
    label: 'Submenu',
    icon: <DsIconWarehouse size={16} />,
    activeIcon: <DsIconWarehouse size={16} variant="solid" />,
    children: [
      { key: 'sub2-1', label: 'Navigation Item' },
      { key: 'sub2-2', label: 'Navigation Item' },
    ],
  },
  {
    key: 'sub3',
    label: 'Submenu',
    icon: <DsIconWarehouse size={16} />,
    activeIcon: <DsIconWarehouse size={16} variant="solid" />,
  },
  {
    key: 'sub4',
    label: 'Submenu',
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
