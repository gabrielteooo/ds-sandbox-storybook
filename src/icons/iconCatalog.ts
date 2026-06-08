import type { FaIconName } from './DsIcon';

/** Semantic status mapped to `--color-system-*` tokens (Alert, Tag, Toast). */
export type IconStatus = 'info' | 'success' | 'warning' | 'error' | 'error-tag';

export const ICON_STATUS_TOKENS: Record<IconStatus, string> = {
  info: '--color-system-info-default',
  success: '--color-system-success-default',
  warning: '--color-system-warning-default',
  error: '--color-system-error-active',
  'error-tag': '--color-system-error-default',
};

export interface IconCatalogEntry {
  name: FaIconName;
  label: string;
  /** Former Ant Design icon name (migration reference). */
  antDesign?: string;
  usage?: string;
  /** Applies system status colour via `.ds-icon--status-*` (solid semantic icons). */
  status?: IconStatus;
}

export const FA_REGULAR_CATALOG: IconCatalogEntry[] = [
  { name: 'user', label: 'User', antDesign: 'UserOutlined', usage: 'Avatar icon type' },
  { name: 'magnifying-glass', label: 'Search', antDesign: 'SearchOutlined', usage: 'Input search, Button' },
  { name: 'calendar', label: 'Calendar', antDesign: 'CalendarOutlined', usage: 'DatePicker' },
  { name: 'clock', label: 'Clock', antDesign: 'ClockCircleOutlined', usage: 'TimePicker' },
  { name: 'chevron-down', label: 'Chevron down', antDesign: 'DownOutlined', usage: 'Select, Input tabs' },
  { name: 'chevron-left', label: 'Chevron left', antDesign: 'LeftOutlined', usage: 'Alert broadcast' },
  { name: 'chevron-right', label: 'Chevron right', antDesign: 'RightOutlined', usage: 'Alert broadcast' },
  {
    name: 'arrow-up-from-line',
    label: 'Upload',
    antDesign: 'UploadOutlined',
    usage: 'Upload button, drag-and-drop',
  },
  { name: 'gear', label: 'Settings', antDesign: 'SettingOutlined', usage: 'Input tab, App shell' },
  { name: 'xmark', label: 'Close', antDesign: 'CloseOutlined', usage: 'Alert dismiss' },
  { name: 'plus', label: 'Plus', antDesign: 'PlusOutlined', usage: 'Tag add' },
  { name: 'check', label: 'Check', antDesign: 'CheckOutlined', usage: 'Switch icon track' },
  { name: 'face-frown', label: 'Frown', antDesign: 'FrownOutlined', usage: 'Slider icon' },
  { name: 'face-smile', label: 'Smile', antDesign: 'SmileOutlined', usage: 'Slider icon' },
  { name: 'house', label: 'Home', antDesign: 'HomeOutlined', usage: 'App shell nav' },
  { name: 'file-lines', label: 'File', antDesign: 'FileTextOutlined', usage: 'App shell nav' },
  { name: 'table-cells', label: 'Grid', antDesign: 'AppstoreOutlined', usage: 'App shell nav' },
  {
    name: 'arrow-down-to-line',
    label: 'Download',
    usage: 'Container table header — export',
  },
  {
    name: 'up-right-and-down-left-from-center',
    label: 'Expand',
    usage: 'Container table header — fullscreen',
  },
  { name: 'arrows-rotate', label: 'Sync', antDesign: 'SyncOutlined', usage: 'Tag processing (spin)' },
];

export const FA_SOLID_CATALOG: IconCatalogEntry[] = [
  { name: 'table', label: 'Table', usage: 'Container table header — table view' },
  {
    name: 'circle-info',
    label: 'Info',
    antDesign: 'InfoCircleFilled',
    usage: 'Alert info',
    status: 'info',
  },
  {
    name: 'circle-check',
    label: 'Success',
    antDesign: 'CheckCircleFilled',
    usage: 'Alert success',
    status: 'success',
  },
  {
    name: 'triangle-exclamation',
    label: 'Warning',
    antDesign: 'WarningFilled',
    usage: 'Alert warning',
    status: 'warning',
  },
  {
    name: 'circle-exclamation',
    label: 'Error',
    antDesign: 'ExclamationCircleFilled',
    usage: 'Alert error',
    status: 'error',
  },
  { name: 'circle-minus', label: 'Minus', antDesign: 'MinusCircleOutlined', usage: 'Tag default' },
  {
    name: 'circle-xmark',
    label: 'Error',
    antDesign: 'CloseCircleOutlined',
    usage: 'Tag error',
    status: 'error-tag',
  },
];
