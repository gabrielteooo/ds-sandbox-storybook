/** Colourful tag presets (Figma 412:13524 / Ant Design Tag color prop) */
export const DS_TAG_COLOR_PRESETS = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'grey',
] as const;

export type DsTagColorPreset = (typeof DS_TAG_COLOR_PRESETS)[number];

export const DS_TAG_STATUSES = [
  'default',
  'success',
  'processing',
  'warning',
  'error',
] as const;

export type DsTagStatus = (typeof DS_TAG_STATUSES)[number];
