import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import type { ReactNode } from 'react';
import { DsIconClose, DsIconCloseCircle } from '../../icons';
import { DsButton } from '../Button/component';
import { ModalThemeProvider } from './ModalThemeProvider';
import { DS_MODAL_PANEL } from './modalPanelMetrics';
import {
  DS_MODAL_INFORMATION_STATUSES,
  DS_MODAL_RESULT_STATUSES,
  DS_MODAL_STATUSES,
  DS_MODAL_VARIANTS,
  getModalResultConfig,
  getModalStatusConfig,
  type DsModalInformationStatus,
  type DsModalResultStatus,
  type DsModalStatus,
  type DsModalVariant,
} from './modalPresets';
import './component.css';

export { DS_MODAL_PANEL } from './modalPanelMetrics';
export { ModalThemeProvider } from './ModalThemeProvider';
export {
  DS_MODAL_INFORMATION_STATUSES,
  DS_MODAL_RESULT_STATUSES,
  DS_MODAL_STATUSES,
  DS_MODAL_VARIANTS,
  getModalResultConfig,
  getModalStatusConfig,
  type DsModalInformationStatus,
  type DsModalResultStatus,
  type DsModalStatus,
  type DsModalVariant,
} from './modalPresets';

const DEFAULT_BASIC_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum hendrerit ex vitae sodales.';
const DEFAULT_INFO_BODY =
  'Interactively monetize corporate alignments and fully tested niche markets.';
const DEFAULT_TITLE = 'Modal title';

export interface DsModalProps {
  /** `basic` | `information` | `results` (Figma 423:364). */
  variant?: DsModalVariant;
  /** Status for `information` or `results` variants. */
  status?: DsModalStatus;
  open: boolean;
  title?: ReactNode;
  children?: ReactNode;
  /** Body copy; alias for `children`. */
  content?: ReactNode;
  /** Secondary caption below body — used by results/success. */
  caption?: ReactNode;
  /** Error detail list — used by results/error. */
  errorItems?: string[];
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  width?: number;
  centered?: boolean;
  closable?: boolean;
  className?: string;
  destroyOnClose?: boolean;
}

function isInformationStatus(status: DsModalStatus): status is DsModalInformationStatus {
  return (DS_MODAL_INFORMATION_STATUSES as readonly string[]).includes(status);
}

function isResultStatus(status: DsModalStatus): status is DsModalResultStatus {
  return (DS_MODAL_RESULT_STATUSES as readonly string[]).includes(status);
}

function modalClass(
  variant: DsModalVariant,
  status: DsModalStatus,
  className?: string,
) {
  const statusClass =
    variant === 'information' || variant === 'results' ? `ds-modal--${status}` : '';

  return ['ds-modal', `ds-modal--${variant}`, statusClass, className]
    .filter(Boolean)
    .join(' ');
}

function renderDefaultFooter(
  onCancel?: () => void,
  onOk?: () => void,
  cancelText = 'Cancel',
  okText = 'OK',
) {
  return (
    <div className="ds-modal__footer">
      <DsButton variant="secondary" size="small" label={cancelText} onClick={onCancel} />
      <DsButton variant="primary" size="small" label={okText} onClick={onOk} />
    </div>
  );
}

function renderResultFooter(
  layout: 'single-center' | 'dual-center' | 'dual-end',
  onCancel: (() => void) | undefined,
  onOk: (() => void) | undefined,
  cancelText: string | undefined,
  okText: string,
  okButtonVariant: 'primary' | 'danger',
) {
  const actionsClass = [
    'ds-modal__results-actions',
    layout === 'single-center' ? 'ds-modal__results-actions--single' : '',
    layout === 'dual-center' ? 'ds-modal__results-actions--dual-center' : '',
    layout === 'dual-end' ? 'ds-modal__results-actions--dual-end' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (layout === 'single-center') {
    return (
      <div className={actionsClass}>
        <DsButton variant={okButtonVariant} size="base" label={okText} onClick={onOk} />
      </div>
    );
  }

  return (
    <div className={actionsClass}>
      {cancelText ? (
        <DsButton variant="secondary" size="base" label={cancelText} onClick={onCancel} />
      ) : null}
      <DsButton variant={okButtonVariant} size="base" label={okText} onClick={onOk} />
    </div>
  );
}

function renderResultsBody({
  status,
  title,
  content,
  caption,
  errorItems,
  onCancel,
  onOk,
  cancelText,
  okText,
}: {
  status: DsModalResultStatus;
  title?: ReactNode;
  content?: ReactNode;
  caption?: ReactNode;
  errorItems?: string[];
  onCancel?: () => void;
  onOk?: () => void;
  cancelText?: string;
  okText?: string;
}) {
  const config = getModalResultConfig(status);
  const resolvedTitle = title ?? config.defaultTitle;
  const resolvedContent = content ?? config.defaultContent;
  const resolvedCaption = caption ?? config.defaultCaption;
  const resolvedErrorItems = errorItems ?? config.defaultErrorItems;
  const resolvedCancelText = cancelText ?? config.defaultCancelText;
  const resolvedOkText = okText ?? config.defaultOkText;

  return (
    <div className="ds-modal__results">
      <div className="ds-modal__results-icon" aria-hidden="true">
        {config.icon}
      </div>

      <div className="ds-modal__results-text">
        <h3 className="ds-modal__results-title text-heading-3">{resolvedTitle}</h3>
        <p className="ds-modal__results-subtitle text-sm-normal">{resolvedContent}</p>
        {resolvedCaption ? (
          <p className="ds-modal__results-caption text-xs-normal">{resolvedCaption}</p>
        ) : null}
      </div>

      {status === 'error' && resolvedErrorItems && resolvedErrorItems.length > 0 ? (
        <div className="ds-modal__results-error-details">
          <p className="ds-modal__results-error-heading text-base-strong">
            The content you submitted has the following error:
          </p>
          <ul className="ds-modal__results-error-list">
            {resolvedErrorItems.map((item, index) => (
              <li key={`${item}-${index}`} className="ds-modal__results-error-item">
                <span className="ds-modal__results-error-item-icon" aria-hidden="true">
                  <DsIconCloseCircle size={16} />
                </span>
                <span className="ds-modal__results-error-item-text text-sm-normal">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {renderResultFooter(
        config.footerLayout,
        onCancel,
        onOk,
        resolvedCancelText,
        resolvedOkText,
        config.okButtonVariant,
      )}
    </div>
  );
}

export function DsModal({
  variant = 'basic',
  status = 'info',
  open,
  title = DEFAULT_TITLE,
  children,
  content,
  caption,
  errorItems,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  width,
  centered = false,
  closable,
  className,
  destroyOnClose = true,
}: DsModalProps) {
  const isInformation = variant === 'information';
  const isResults = variant === 'results';
  const resultStatus = isResultStatus(status) ? status : 'success';
  const informationStatus = isInformationStatus(status) ? status : 'info';

  const resolvedWidth =
    width ??
    (isResults
      ? DS_MODAL_PANEL.resultsWidthPx
      : isInformation
        ? DS_MODAL_PANEL.informationWidthPx
        : DS_MODAL_PANEL.basicWidthPx);

  const resultConfig = isResults ? getModalResultConfig(resultStatus) : null;
  const resolvedClosable =
    closable ?? (isResults ? (resultConfig?.showClose ?? false) : !isInformation);

  let bodyContent: ReactNode;
  let modalFooter: ModalProps['footer'] = renderDefaultFooter(onCancel, onOk, cancelText, okText);
  let modalTitle: ModalProps['title'] = (
    <span className="ds-modal__title text-base-strong">{title}</span>
  );

  if (isResults) {
    bodyContent = renderResultsBody({
      status: resultStatus,
      title,
      content: content ?? children,
      caption,
      errorItems,
      onCancel,
      onOk,
      cancelText,
      okText,
    });
    modalFooter = null;
    modalTitle = null;
  } else if (isInformation) {
    bodyContent = (
      <div className="ds-modal__information-body">
        <div className="ds-modal__information-icon" aria-hidden="true">
          {getModalStatusConfig(informationStatus).icon}
        </div>
        <div className="ds-modal__information-content">
          <p className="ds-modal__information-title text-base-strong">{title}</p>
          <p className="ds-modal__information-text text-sm-normal">
            {content ?? children ?? DEFAULT_INFO_BODY}
          </p>
        </div>
      </div>
    );
    modalFooter = renderDefaultFooter(onCancel, onOk, cancelText, okText);
    modalTitle = null;
  } else {
    bodyContent = (
      <div className="ds-modal__basic-body text-sm-normal">
        {children ?? content ?? DEFAULT_BASIC_BODY}
      </div>
    );
  }

  const modalProps: ModalProps = {
    className: modalClass(variant, isResults ? resultStatus : informationStatus, className),
    open,
    centered,
    style: centered
      ? undefined
      : {
          top: `${DS_MODAL_PANEL.positionTopPercent}%`,
          paddingBottom: 0,
        },
    width: resolvedWidth,
    closable: resolvedClosable,
    onCancel,
    onOk,
    destroyOnClose,
    footer: modalFooter,
    title: modalTitle,
    closeIcon: (
      <span className="ds-modal__close">
        <DsIconClose size={16} />
      </span>
    ),
    children: bodyContent,
  };

  return (
    <ModalThemeProvider>
      <Modal {...modalProps} />
    </ModalThemeProvider>
  );
}

export default DsModal;
