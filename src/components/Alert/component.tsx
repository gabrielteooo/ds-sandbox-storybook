import { Alert, Button, Space } from 'antd';
import {
  DsIconCheckCircle,
  DsIconChevronLeft,
  DsIconChevronRight,
  DsIconClose,
  DsIconExclamationCircle,
  DsIconInfoCircle,
  DsIconWarning,
} from '../../icons';
import type { AlertProps } from 'antd';
import type { ReactNode } from 'react';
import { DsButton } from '../Button/component';
import './component.css';

export type DsAlertLayout = 'basic' | 'with-button' | 'broadcast';
export type DsAlertType = NonNullable<AlertProps['type']>;

const DEFAULT_DESCRIPTION =
  'Interactively monetize corporate alignments and fully tested niche markets.';

const TITLES: Record<DsAlertType, string> = {
  error: 'Alert title',
  info: 'Information title',
  success: 'Success title',
  warning: 'Warning title',
};

const BROADCAST_MESSAGES: Record<DsAlertType, string> = {
  error: 'ESLM Interface connection is currently offline.',
  info: 'Maintenance work this afternoon (11:00-18:00) at Carpark 23.',
  success: 'System update completed successfully.',
  warning: 'Scheduled maintenance may affect availability.',
};

const TYPE_ICONS: Record<DsAlertType, ReactNode> = {
  info: <DsIconInfoCircle />,
  success: <DsIconCheckCircle />,
  warning: <DsIconWarning />,
  error: <DsIconExclamationCircle />,
};

export interface DsAlertProps {
  layout?: DsAlertLayout;
  type?: DsAlertType;
  message?: string;
  description?: string;
  showDescription?: boolean;
  showIcon?: boolean;
  closable?: boolean;
  showActions?: boolean;
  secondaryActionLabel?: string;
  primaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
  onClose?: () => void;
  showCarousel?: boolean;
  carouselLabel?: string;
  className?: string;
}

function BroadcastPagination({ label }: { label: string }) {
  return (
    <div className="ds-alert-broadcast__carousel" role="group" aria-label="Alert pagination">
      <span className="ds-alert-broadcast__pagination">{label}</span>
      <Button
        type="text"
        size="small"
        className="ds-alert-broadcast__nav-btn"
        icon={<DsIconChevronLeft />}
        aria-label="Previous"
      />
      <Button
        type="text"
        size="small"
        className="ds-alert-broadcast__nav-btn"
        icon={<DsIconChevronRight />}
        aria-label="Next"
      />
    </div>
  );
}

function WithButtonActions({
  secondaryActionLabel,
  primaryActionLabel,
  onSecondaryAction,
  onPrimaryAction,
}: Pick<
  DsAlertProps,
  'secondaryActionLabel' | 'primaryActionLabel' | 'onSecondaryAction' | 'onPrimaryAction'
>) {
  return (
    <Space size={8} className="ds-alert-with-button__buttons">
      <DsButton
        variant="secondary"
        size="x-small"
        label={secondaryActionLabel}
        onClick={onSecondaryAction}
      />
      <DsButton
        variant="primary"
        size="x-small"
        label={primaryActionLabel}
        onClick={onPrimaryAction}
      />
    </Space>
  );
}

function DsAlertWithButton({
  type = 'info',
  message,
  description = DEFAULT_DESCRIPTION,
  showDescription = true,
  showIcon = true,
  closable = true,
  showActions = true,
  secondaryActionLabel,
  primaryActionLabel,
  onSecondaryAction,
  onPrimaryAction,
  onClose,
  className,
}: DsAlertProps) {
  const resolvedMessage = message ?? TITLES[type ?? 'info'];

  return (
    <div
      className={['ds-alert-with-button', `ds-alert-with-button--${type}`, className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
    >
      {showIcon && (
        <span className="ds-alert-with-button__icon" aria-hidden>
          {TYPE_ICONS[type ?? 'info']}
        </span>
      )}
      <div className="ds-alert-with-button__content">
        <div className="ds-alert-with-button__header">
          <p className="ds-alert-with-button__title">{resolvedMessage}</p>
          <div className="ds-alert-with-button__actions">
            {showActions && (
              <WithButtonActions
                secondaryActionLabel={secondaryActionLabel}
                primaryActionLabel={primaryActionLabel}
                onSecondaryAction={onSecondaryAction}
                onPrimaryAction={onPrimaryAction}
              />
            )}
            {closable && (
              <button
                type="button"
                className="ds-alert-with-button__close"
                onClick={onClose}
                aria-label="Close"
              >
                <DsIconClose />
              </button>
            )}
          </div>
        </div>
        {showDescription && (
          <p className="ds-alert-with-button__description">{description}</p>
        )}
      </div>
    </div>
  );
}

function DsAlertBroadcast({
  type = 'info',
  message,
  showIcon = true,
  closable = true,
  showCarousel = false,
  carouselLabel = '1 / 3',
  onClose,
  className,
}: DsAlertProps) {
  const resolvedMessage = message ?? BROADCAST_MESSAGES[type ?? 'info'];

  return (
    <div
      className={['ds-alert-broadcast', `ds-alert-broadcast--${type}`, className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
    >
      {showIcon && (
        <span className="ds-alert-broadcast__icon" aria-hidden>
          {TYPE_ICONS[type ?? 'info']}
        </span>
      )}
      <div className="ds-alert-broadcast__content">
        <div className="ds-alert-broadcast__main">
          <p className="ds-alert-broadcast__message">{resolvedMessage}</p>
          {closable && (
            <button
              type="button"
              className="ds-alert-broadcast__close"
              onClick={onClose}
              aria-label="Close"
            >
              <DsIconClose />
            </button>
          )}
        </div>
        {showCarousel && <BroadcastPagination label={carouselLabel} />}
      </div>
    </div>
  );
}

export function DsAlert({
  layout = 'basic',
  type = 'info',
  message,
  description = DEFAULT_DESCRIPTION,
  showDescription = true,
  showIcon = true,
  closable = true,
  showActions = true,
  secondaryActionLabel = 'Learn more',
  primaryActionLabel = 'Try again',
  onSecondaryAction,
  onPrimaryAction,
  onClose,
  showCarousel = false,
  carouselLabel = '1 / 3',
  className,
}: DsAlertProps) {
  if (layout === 'with-button') {
    return (
      <DsAlertWithButton
        type={type}
        message={message}
        description={description}
        showDescription={showDescription}
        showIcon={showIcon}
        closable={closable}
        showActions={showActions}
        secondaryActionLabel={secondaryActionLabel}
        primaryActionLabel={primaryActionLabel}
        onSecondaryAction={onSecondaryAction}
        onPrimaryAction={onPrimaryAction}
        onClose={onClose}
        className={className}
      />
    );
  }

  if (layout === 'broadcast') {
    return (
      <DsAlertBroadcast
        type={type}
        message={message}
        showIcon={showIcon}
        closable={closable}
        showCarousel={showCarousel}
        carouselLabel={carouselLabel}
        onClose={onClose}
        className={className}
      />
    );
  }

  const resolvedMessage = message ?? TITLES[type ?? 'info'];

  return (
    <div className={['ds-alert-basic', className].filter(Boolean).join(' ')}>
      <Alert
        type={type}
        message={resolvedMessage}
        description={showDescription ? description : undefined}
        showIcon={showIcon}
        closable={closable}
        onClose={onClose}
      />
    </div>
  );
}

export default DsAlert;
