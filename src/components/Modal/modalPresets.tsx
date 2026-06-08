import type { ReactNode } from 'react';
import {
  DsIconCheckCircle,
  DsIconCloseCircle,
  DsIconExclamationCircle,
  DsIconInfoCircle,
  DsIconWarning,
} from '../../icons';
import { DS_MODAL_PANEL } from './modalPanelMetrics';

export const DS_MODAL_VARIANTS = ['basic', 'information', 'results'] as const;
export type DsModalVariant = (typeof DS_MODAL_VARIANTS)[number];

export const DS_MODAL_INFORMATION_STATUSES = ['info', 'error', 'success', 'warning'] as const;
export type DsModalInformationStatus = (typeof DS_MODAL_INFORMATION_STATUSES)[number];

export const DS_MODAL_RESULT_STATUSES = ['success', 'info', 'warning', 'delete', 'error'] as const;
export type DsModalResultStatus = (typeof DS_MODAL_RESULT_STATUSES)[number];

/** @deprecated Use DS_MODAL_INFORMATION_STATUSES or DS_MODAL_RESULT_STATUSES */
export const DS_MODAL_STATUSES = DS_MODAL_INFORMATION_STATUSES;
export type DsModalStatus = DsModalInformationStatus | DsModalResultStatus;

export interface DsModalStatusConfig {
  icon: ReactNode;
}

export interface DsModalResultConfig {
  icon: ReactNode;
  defaultTitle: string;
  defaultContent: ReactNode;
  defaultCaption?: string;
  showClose: boolean;
  footerLayout: 'single-center' | 'dual-center' | 'dual-end';
  defaultCancelText?: string;
  defaultOkText: string;
  okButtonVariant: 'primary' | 'danger';
  defaultErrorItems?: string[];
}

const INFORMATION_ICON_SIZE = DS_MODAL_PANEL.informationIconSizePx;
const RESULT_ICON_SIZE = DS_MODAL_PANEL.resultsIconSizePx;

const DEFAULT_ERROR_ITEMS = [
  'Objectively scale orthogonal collaboration and idea. Action >',
  'Objectively scale orthogonal collaboration and idea. Action >',
];

export function getModalStatusConfig(status: DsModalInformationStatus): DsModalStatusConfig {
  switch (status) {
    case 'info':
      return { icon: <DsIconInfoCircle size={INFORMATION_ICON_SIZE} /> };
    case 'error':
      return { icon: <DsIconCloseCircle size={INFORMATION_ICON_SIZE} /> };
    case 'success':
      return { icon: <DsIconCheckCircle size={INFORMATION_ICON_SIZE} /> };
    case 'warning':
      return { icon: <DsIconExclamationCircle size={INFORMATION_ICON_SIZE} /> };
  }
}

export function getModalResultConfig(status: DsModalResultStatus): DsModalResultConfig {
  switch (status) {
    case 'success':
      return {
        icon: <DsIconCheckCircle size={RESULT_ICON_SIZE} />,
        defaultTitle: 'Successfully submitted!',
        defaultContent:
          'Your application has been submitted on 1 Apr 2024, 11:45AM and is pending approval. You will be notified on the outcome of your application via email.',
        defaultCaption: 'Transaction ID 137370531, 1 Apr 2024 11:45AM',
        showClose: true,
        footerLayout: 'single-center',
        defaultOkText: 'Back to page',
        okButtonVariant: 'primary',
      };
    case 'info':
      return {
        icon: <DsIconInfoCircle size={RESULT_ICON_SIZE} />,
        defaultTitle: 'This is an information modal',
        defaultContent:
          'Objectively scale orthogonal collaboration and idea-sharing after enterprise-wide manufactured products. Compellingly strategize high-quality niche markets through sustainable.',
        showClose: true,
        footerLayout: 'single-center',
        defaultOkText: 'OK',
        okButtonVariant: 'primary',
      };
    case 'warning':
      return {
        icon: <DsIconWarning size={RESULT_ICON_SIZE} />,
        defaultTitle: 'Discard changes?',
        defaultContent: (
          <>
            All unsaved changes will be discarded.
            <br />
            Are you sure you want to proceed?
          </>
        ),
        showClose: false,
        footerLayout: 'dual-center',
        defaultCancelText: 'Continue editing',
        defaultOkText: 'Discard changes',
        okButtonVariant: 'primary',
      };
    case 'delete':
      return {
        icon: <DsIconWarning size={RESULT_ICON_SIZE} />,
        defaultTitle: 'Delete?',
        defaultContent: (
          <>
            <strong>XXX</strong> will be deleted
            <br />
            Are you sure you want to delete?
          </>
        ),
        showClose: false,
        footerLayout: 'dual-center',
        defaultCancelText: 'Back to page',
        defaultOkText: 'Delete',
        okButtonVariant: 'danger',
      };
    case 'error':
      return {
        icon: <DsIconCloseCircle size={RESULT_ICON_SIZE} />,
        defaultTitle: 'Error Message',
        defaultContent:
          'Objectively scale orthogonal collaboration and idea-sharing after enterprise-wide manufactured products. Compellingly strategize high-quality niche markets through sustainable.',
        showClose: false,
        footerLayout: 'dual-end',
        defaultCancelText: 'Cancel',
        defaultOkText: 'Edit submission',
        okButtonVariant: 'primary',
        defaultErrorItems: DEFAULT_ERROR_ITEMS,
      };
  }
}
