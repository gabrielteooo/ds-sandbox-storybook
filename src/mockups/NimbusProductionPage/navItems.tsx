import {
  DsIconEnvelope,
  DsIconGear,
  DsIconHome,
  DsIconWarehouse,
} from '../../icons';
import type { DsNavigationMenuItem } from '../../components/NavigationMenu';

/** Figma FMS Airforce NIMBUS sidemenu — node 15817:119327 */
export const NIMBUS_NAV_ITEMS: DsNavigationMenuItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <DsIconHome size={16} />,
    activeIcon: <DsIconHome size={16} variant="solid" />,
  },
  {
    key: 'nimbus',
    label: 'NIMBUS',
    icon: <DsIconEnvelope size={16} />,
    activeIcon: <DsIconEnvelope size={16} variant="solid" />,
    children: [
      { key: 'fleet-overview', label: 'Fleet Overview' },
      { key: 'aircraft-status', label: 'Aircraft Status' },
      { key: 'production-management', label: 'Production Management' },
      { key: 'reports-brief', label: 'Reports & Brief' },
      { key: 'programme-planner', label: 'Programme Planner' },
      { key: 'active-programme', label: 'Active Programme' },
      { key: 'activity-log', label: 'Activity Log' },
    ],
  },
  {
    key: 'system',
    label: 'System Configurations',
    icon: <DsIconGear size={16} />,
    activeIcon: <DsIconGear size={16} variant="solid" />,
  },
];
