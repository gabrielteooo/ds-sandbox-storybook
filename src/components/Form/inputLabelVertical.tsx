import type { ReactNode } from 'react';
import { DsIconCircleQuestion, DsIconInfoCircle } from '../../icons';
import { DS_FORM_PANEL } from './formPanelMetrics';
import './component.css';

/** Figma Input Label Vertical 5004:6741 / 388:11598 */
export type InputLabelMark = 'none' | 'optional' | 'required';

export interface InputLabelVerticalProps {
  label: string;
  mark?: InputLabelMark;
  /** Figma Tooltip=True — info icon after label text. */
  showTooltip?: boolean;
  showHelpIcon?: boolean;
  className?: string;
}

function labelMarkClass(mark: InputLabelMark, showTooltip: boolean) {
  return [
    'ds-input-label-vertical',
    `ds-input-label-vertical--mark-${mark}`,
    showTooltip ? 'ds-input-label-vertical--tooltip' : 'ds-input-label-vertical--no-tooltip',
  ].join(' ');
}

export function InputLabelVertical({
  label,
  mark = 'none',
  showTooltip = false,
  showHelpIcon = false,
  className,
}: InputLabelVerticalProps) {
  const showOptionalSuffix = mark === 'optional';
  const showRequiredMark = mark === 'required';

  let content: ReactNode;

  if (showTooltip) {
    content = (
      <>
        {showRequiredMark ? (
          <span className="ds-input-label-vertical__required" aria-hidden>
            *
          </span>
        ) : null}
        <span className="ds-input-label-vertical__text">{label}</span>
        <span className="ds-input-label-vertical__info" aria-hidden>
          <DsIconInfoCircle size={DS_FORM_PANEL.labelInfoIconSizePx} />
        </span>
        {showOptionalSuffix ? (
          <span className="ds-input-label-vertical__optional">(optional)</span>
        ) : null}
        {showHelpIcon ? (
          <button
            type="button"
            className="ds-input-label-vertical__help-btn"
            aria-label="More information"
          >
            <DsIconCircleQuestion size={DS_FORM_PANEL.labelHelpIconSizePx} />
          </button>
        ) : null}
      </>
    );
  } else if (showRequiredMark) {
    content = (
      <>
        <span className="ds-input-label-vertical__required" aria-hidden>
          *
        </span>
        <span className="ds-input-label-vertical__text">{label}</span>
      </>
    );
  } else if (showOptionalSuffix) {
    content = (
      <>
        <span className="ds-input-label-vertical__text">{label}</span>
        <span className="ds-input-label-vertical__optional">(optional)</span>
      </>
    );
  } else {
    content = <span className="ds-input-label-vertical__text">{label}</span>;
  }

  return (
    <span className={[labelMarkClass(mark, showTooltip), className].filter(Boolean).join(' ')}>
      {content}
    </span>
  );
}

export function labelModeToMark(
  labelMode: 'default' | 'required' | 'optional',
): InputLabelMark {
  if (labelMode === 'required') return 'required';
  if (labelMode === 'optional') return 'optional';
  return 'none';
}
