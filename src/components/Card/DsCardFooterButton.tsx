import { DsIconChevronRight } from '../../icons';
import { DS_CARD_PANEL } from './cardPanelMetrics';

export interface DsCardFooterButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function DsCardFooterButton({
  label = 'View detailed insights',
  disabled = false,
  onClick,
}: DsCardFooterButtonProps) {
  return (
    <button
      type="button"
      className="ds-card-footer-button"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="ds-card-footer-button__label">{label}</span>
      <DsIconChevronRight
        size={DS_CARD_PANEL.footerButtonIconSizePx}
        className="ds-card-footer-button__icon"
      />
    </button>
  );
}
