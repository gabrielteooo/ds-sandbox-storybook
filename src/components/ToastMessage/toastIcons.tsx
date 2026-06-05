import type { ReactNode } from 'react';
import {
  DsIconCheckCircle,
  DsIconExclamationCircle,
  DsIconInfoCircle,
  DsIconSync,
  DsIconWarning,
} from '../../icons';
import type { DsToastMessageType } from './component';

/** Figma 421:14564 — semantic FA icons per toast type. */
export const DS_TOAST_MESSAGE_ICONS: Record<DsToastMessageType, ReactNode> = {
  normal: <DsIconInfoCircle />,
  success: <DsIconCheckCircle />,
  error: <DsIconExclamationCircle />,
  warning: <DsIconWarning />,
  loading: <DsIconSync />,
};
