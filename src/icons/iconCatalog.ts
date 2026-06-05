import type { FaIconName } from './DsIcon';

export interface IconCatalogEntry {
  name: FaIconName;
  label: string;
  /** Former Ant Design icon name (migration reference). */
  antDesign?: string;
  usage?: string;
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
  { name: 'arrows-rotate', label: 'Sync', antDesign: 'SyncOutlined', usage: 'Tag processing (spin)' },
];

export const FA_SOLID_CATALOG: IconCatalogEntry[] = [
  { name: 'circle-info', label: 'Info', antDesign: 'InfoCircleFilled', usage: 'Alert info' },
  { name: 'circle-check', label: 'Success', antDesign: 'CheckCircleFilled', usage: 'Alert success' },
  { name: 'triangle-exclamation', label: 'Warning', antDesign: 'WarningFilled', usage: 'Alert warning' },
  { name: 'circle-exclamation', label: 'Error', antDesign: 'ExclamationCircleFilled', usage: 'Alert error' },
  { name: 'circle-minus', label: 'Minus', antDesign: 'MinusCircleOutlined', usage: 'Tag default' },
  { name: 'circle-xmark', label: 'Error', antDesign: 'CloseCircleOutlined', usage: 'Tag error' },
];
