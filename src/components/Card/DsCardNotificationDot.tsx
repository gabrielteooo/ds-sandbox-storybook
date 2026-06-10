import { DS_CARD_PANEL } from './cardPanelMetrics';

/** Figma Badge / Basic — Type=Dot (8px) for unread notification cards. */
export function DsCardNotificationDot() {
  return (
    <span
      className="ds-card-notification-dot"
      aria-hidden
      style={{
        width: DS_CARD_PANEL.notificationDotSizePx,
        height: DS_CARD_PANEL.notificationDotSizePx,
      }}
    />
  );
}
