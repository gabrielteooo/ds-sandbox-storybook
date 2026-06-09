import {
  DsIconArrowRotateLeft,
  DsIconArrowRotateRight,
  DsIconCloseCircle,
} from '../../icons';
import { DS_DASHBOARD_HEADER_PANEL } from './dashboardHeaderPanelMetrics';

export interface DsQlikFilterActionsProps {
  disabled?: boolean;
  onUndoClick?: () => void;
  onRedoClick?: () => void;
  onClearClick?: () => void;
  className?: string;
}

/** Figma Qlik Filter-Actions 4212:86915 */
export function DsQlikFilterActions({
  disabled = false,
  onUndoClick,
  onRedoClick,
  onClearClick,
  className,
}: DsQlikFilterActionsProps) {
  return (
    <div
      className={['ds-qlik-filter-actions', className].filter(Boolean).join(' ')}
      style={{ minHeight: DS_DASHBOARD_HEADER_PANEL.qlikBarHeightPx }}
    >
      <div className="ds-qlik-filter-actions__undo">
        <button
          type="button"
          className="ds-qlik-filter-actions__btn"
          aria-label="Undo filter"
          disabled={disabled}
          onClick={onUndoClick}
        >
          <DsIconArrowRotateLeft
            size={16}
            className={disabled ? 'ds-qlik-filter-actions__icon--disabled' : undefined}
          />
        </button>
      </div>
      <div className="ds-qlik-filter-actions__redo">
        <button
          type="button"
          className="ds-qlik-filter-actions__btn"
          aria-label="Redo filter"
          disabled={disabled}
          onClick={onRedoClick}
        >
          <DsIconArrowRotateRight
            size={16}
            className={disabled ? 'ds-qlik-filter-actions__icon--disabled' : undefined}
          />
        </button>
      </div>
      <div className="ds-qlik-filter-actions__clear">
        <button
          type="button"
          className="ds-qlik-filter-actions__btn"
          aria-label="Clear all filters"
          disabled={disabled}
          onClick={onClearClick}
        >
          <DsIconCloseCircle
            size={16}
            className={disabled ? 'ds-qlik-filter-actions__icon--disabled' : undefined}
          />
        </button>
      </div>
    </div>
  );
}
