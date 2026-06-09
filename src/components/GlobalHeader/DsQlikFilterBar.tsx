import { DsQlikFilterActions } from './DsQlikFilterActions';
import { DsQlikFilterMultiRow } from './DsQlikFilterMultiRow';
import {
  DsQlikFilterSelectedItem,
  type DsQlikFilterSelectedScale,
} from './DsQlikFilterSelectedItem';

export interface DsQlikFilterChip {
  key: string;
  label: string;
  value: string;
  scale?: DsQlikFilterSelectedScale;
}

export interface DsQlikFilterBarProps {
  chips?: DsQlikFilterChip[];
  /** Figma >7 selected — shows Qlik Multi-row overflow badge */
  overflowCount?: number;
  onUndoClick?: () => void;
  onRedoClick?: () => void;
  onClearClick?: () => void;
  onChipRemove?: (key: string) => void;
  onOverflowClick?: () => void;
  className?: string;
}

/** Figma Qlik filter bar 4276:31326 */
export function DsQlikFilterBar({
  chips = [],
  overflowCount = 0,
  onUndoClick,
  onRedoClick,
  onClearClick,
  onChipRemove,
  onOverflowClick,
  className,
}: DsQlikFilterBarProps) {
  const actionsDisabled = chips.length === 0;

  return (
    <div className={['ds-qlik-filter-bar', className].filter(Boolean).join(' ')}>
      <DsQlikFilterActions
        disabled={actionsDisabled}
        onUndoClick={onUndoClick}
        onRedoClick={onRedoClick}
        onClearClick={onClearClick}
      />
      {chips.map((chip) => (
        <DsQlikFilterSelectedItem
          key={chip.key}
          label={chip.label}
          value={chip.value}
          scale={chip.scale}
          onRemove={() => onChipRemove?.(chip.key)}
        />
      ))}
      {overflowCount > 0 ? (
        <DsQlikFilterMultiRow count={overflowCount} onClick={onOverflowClick} />
      ) : null}
    </div>
  );
}
