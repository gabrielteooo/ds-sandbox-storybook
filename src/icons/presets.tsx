import type { ReactElement } from 'react';
import { DsIcon, type DsIconProps } from './DsIcon';

/** Preset icons — drop-in replacements for former `@ant-design/icons` usage. */
function preset(
  props: Partial<DsIconProps> | undefined,
  defaults: DsIconProps,
): ReactElement {
  return <DsIcon {...defaults} {...props} />;
}

export const DsIconUser = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'user' });

export const DsIconSearch = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'magnifying-glass' });

export const DsIconCalendar = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'calendar' });

export const DsIconClock = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'clock' });

export const DsIconChevronDown = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'chevron-down' });

export const DsIconChevronLeft = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'chevron-left' });

export const DsIconChevronRight = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'chevron-right' });

export const DsIconUpload = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'arrow-up-from-line' });

export const DsIconGear = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'gear' });

export const DsIconClose = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'xmark' });

export const DsIconPlus = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'plus' });

export const DsIconCheck = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'check' });

export const DsIconFrown = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'face-frown' });

export const DsIconSmile = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'face-smile' });

export const DsIconHome = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'house' });

export const DsIconFileText = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'file-lines' });

export const DsIconAppstore = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'table-cells' });

export const DsIconSync = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'arrows-rotate', spin: true });

export const DsIconInfoCircle = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'circle-info', variant: 'solid' });

export const DsIconCheckCircle = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'circle-check', variant: 'solid' });

export const DsIconWarning = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'triangle-exclamation', variant: 'solid' });

export const DsIconExclamationCircle = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'circle-exclamation', variant: 'solid' });

export const DsIconMinusCircle = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'circle-minus', variant: 'solid' });

export const DsIconCloseCircle = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'circle-xmark', variant: 'solid' });

export const DsIconEllipsisVertical = (props?: Partial<DsIconProps>) =>
  preset(props, { name: 'ellipsis-vertical' });
