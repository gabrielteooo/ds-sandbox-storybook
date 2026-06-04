/** Operational status for asset / service configuration mockup. */
export type AssetOperationalStatus = 'serviceable' | 'maintenance' | 'decommissioned';

export interface AssetStatusOption {
  value: AssetOperationalStatus;
  title: string;
  description: string;
}

export interface DependencyOption {
  id: string;
  title: string;
  description: string;
}

export const ASSET_STATUS_OPTIONS: AssetStatusOption[] = [
  {
    value: 'serviceable',
    title: 'Serviceable',
    description: 'Asset is operational and available for scheduling.',
  },
  {
    value: 'maintenance',
    title: 'Under maintenance',
    description: 'Limited availability; maintenance window applies.',
  },
  {
    value: 'decommissioned',
    title: 'Decommissioned',
    description: 'Retired from active service; read-only records only.',
  },
];

export const DEPENDENCY_OPTIONS: DependencyOption[] = [
  {
    id: 'backup-power',
    title: 'Backup power supply',
    description: 'Requires redundant UPS or generator linkage before activation.',
  },
  {
    id: 'network-segment',
    title: 'Isolated network segment',
    description: 'Deploy on VLAN restricted to operations tooling only.',
  },
  {
    id: 'compliance-scan',
    title: 'Compliance scan',
    description: 'Run automated policy scan within 24 hours of go-live.',
  },
  {
    id: 'owner-approval',
    title: 'Service owner approval',
    description: 'Notify asset owner and capture sign-off in the ticket system.',
  },
];

export function createInitialDependencyState(): Record<string, boolean> {
  return Object.fromEntries(DEPENDENCY_OPTIONS.map((option) => [option.id, false]));
}

/** JSON-friendly payload logged on successful submit. */
export interface ServiceAssetConfigPayload {
  assetId: string;
  status: AssetOperationalStatus;
  dateRange: { start: string; end: string };
  dependencies: string[];
}
