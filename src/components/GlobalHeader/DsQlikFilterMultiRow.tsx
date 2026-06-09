import { DsIconChevronDown } from '../../icons';
import { DS_DASHBOARD_HEADER_PANEL } from './dashboardHeaderPanelMetrics';

export interface DsQlikFilterMultiRowProps {
  count: number;
  onClick?: () => void;
  className?: string;
}

/** Figma Qlik Multi-row 4639:86556 — overflow badge when >7 filters */
export function DsQlikFilterMultiRow({
  count,
  onClick,
  className,
}: DsQlikFilterMultiRowProps) {
  return (
    <button
      type="button"
      className={['ds-qlik-filter-multi-row', className].filter(Boolean).join(' ')}
      style={{ minHeight: DS_DASHBOARD_HEADER_PANEL.qlikBarHeightPx }}
      aria-label={`${count} more filters`}
      onClick={onClick}
    >
      <span className="ds-qlik-filter-multi-row__badge text-sm-strong">{count}</span>
      <DsIconChevronDown size={14} />
    </button>
  );
}
