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

/** Figma Alert/Broadcast (22677:23610) — error uses triangle-exclamation, info uses circle-info. */
const BROADCAST_TYPE_ICONS: Partial<Record<DsAlertType, ReactNode>> = {
  info: <DsIconInfoCircle />,
  error: <DsIconWarning />,
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
  onCarouselPrevious?: () => void;
  onCarouselNext?: () => void;
  carouselPreviousDisabled?: boolean;
  carouselNextDisabled?: boolean;
  className?: string;
}

function BroadcastPagination({
  label,
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}: {
  label: string;
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  return (
    <div className="ds-alert-broadcast__carousel" role="group" aria-label="Alert pagination">
      <span className="ds-alert-broadcast__pagination">{label}</span>
      <Button
        type="text"
        size="small"
        className="ds-alert-broadcast__nav-btn"
        icon={<DsIconChevronLeft />}
        aria-label="Previous"
        onClick={onPrevious}
        disabled={previousDisabled}
      />
      <Button
        type="text"
        size="small"
        className="ds-alert-broadcast__nav-btn"
        icon={<DsIconChevronRight />}
        aria-label="Next"
        onClick={onNext}
        disabled={nextDisabled}
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
  onCarouselPrevious,
  onCarouselNext,
  carouselPreviousDisabled,
  carouselNextDisabled,
  onClose,
  className,
}: DsAlertProps) {
  const resolvedType = type ?? 'info';
  const isInfo = resolvedType === 'info';
  const resolvedMessage = message ?? BROADCAST_MESSAGES[resolvedType];
  const statusIcon =
    BROADCAST_TYPE_ICONS[resolvedType] ?? TYPE_ICONS[resolvedType];

  return (
    <div
      className={['ds-alert-broadcast', `ds-alert-broadcast--${resolvedType}`, className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
    >
      {!isInfo && showIcon && (
        <span className="ds-alert-broadcast__icon" aria-hidden>
          {statusIcon}
        </span>
      )}
      <div className="ds-alert-broadcast__content">
        <div className="ds-alert-broadcast__main">
          {isInfo && showIcon && (
            <span className="ds-alert-broadcast__icon" aria-hidden>
              {statusIcon}
            </span>
          )}
          <div className="ds-alert-broadcast__message-row">
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
        </div>
        {showCarousel && (
          <BroadcastPagination
            label={carouselLabel}
            onPrevious={onCarouselPrevious}
            onNext={onCarouselNext}
            previousDisabled={carouselPreviousDisabled}
            nextDisabled={carouselNextDisabled}
          />
        )}
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
  onCarouselPrevious,
  onCarouselNext,
  carouselPreviousDisabled,
  carouselNextDisabled,
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
        onCarouselPrevious={onCarouselPrevious}
        onCarouselNext={onCarouselNext}
        carouselPreviousDisabled={carouselPreviousDisabled}
        carouselNextDisabled={carouselNextDisabled}
        onClose={onClose}
        className={className}
      />
    );
  }

  const resolvedMessage = message ?? TITLES[type ?? 'info'];

  const resolvedType = type ?? 'info';

  return (
    <div className={['ds-alert-basic', className].filter(Boolean).join(' ')}>
      <Alert
        type={resolvedType}
        message={resolvedMessage}
        description={showDescription ? description : undefined}
        showIcon={showIcon}
        icon={showIcon ? TYPE_ICONS[resolvedType] : false}
        closable={closable}
        closeIcon={closable ? <DsIconClose /> : undefined}
        onClose={onClose}
      />
    </div>
  );
}

export default DsAlert;
