import { CardThemeProvider } from './CardThemeProvider';
import { DsCardExtraButton } from './component';
import { DsCardNotificationDot } from './DsCardNotificationDot';
import { DS_NOTIFICATION_CARD_DEFAULTS } from './cardNotificationPresets';
import './component.css';

export { DS_NOTIFICATION_CARD_DEFAULTS } from './cardNotificationPresets';

export interface DsNotificationCardProps {
  title?: string;
  message?: string;
  author?: string;
  timestamp?: string;
  /** Unread notification — shows dot indicator and active title colour. */
  isNew?: boolean;
  showExtra?: boolean;
  className?: string;
  onClick?: () => void;
  onExtraClick?: () => void;
}

function notificationCardClass(isNew: boolean, className?: string) {
  return [
    'ds-card',
    'ds-notification-card',
    isNew ? 'ds-notification-card--new' : 'ds-notification-card--read',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function DsNotificationCard({
  title = DS_NOTIFICATION_CARD_DEFAULTS.title,
  message = DS_NOTIFICATION_CARD_DEFAULTS.message,
  author = DS_NOTIFICATION_CARD_DEFAULTS.author,
  timestamp = DS_NOTIFICATION_CARD_DEFAULTS.timestamp,
  isNew = DS_NOTIFICATION_CARD_DEFAULTS.isNew,
  showExtra = DS_NOTIFICATION_CARD_DEFAULTS.showExtra,
  className,
  onClick,
  onExtraClick,
}: DsNotificationCardProps) {
  const showMeta = author || timestamp;

  return (
    <CardThemeProvider>
      <article
        className={notificationCardClass(isNew, className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
      >
        <header className="ds-notification-card__header">
          {isNew ? <DsCardNotificationDot /> : null}
          <h3 className="ds-notification-card__title text-sm-strong">{title}</h3>
          {showExtra ? (
            <span
              className="ds-notification-card__extra"
              onClick={(event) => event.stopPropagation()}
            >
              <DsCardExtraButton onClick={onExtraClick} />
            </span>
          ) : null}
        </header>

        <div className="ds-notification-card__body">
          <p className="ds-notification-card__message">{message}</p>
          {showMeta ? (
            <div className="ds-notification-card__meta text-xs-normal">
              {author ? <span>{author}</span> : null}
              {author && timestamp ? (
                <span className="ds-notification-card__meta-separator" aria-hidden>
                  |
                </span>
              ) : null}
              {timestamp ? <span>{timestamp}</span> : null}
            </div>
          ) : null}
        </div>
      </article>
    </CardThemeProvider>
  );
}
