import { DsButton, type DsButtonSize } from '../Button/component';
import { DsIconEllipsisVertical } from '../../icons';
import type { DsTableSize } from './tablePresets';

export interface DsTableColumnActionsProps {
  /** Number of text action buttons before the overflow icon (Figma: 1–3). */
  count?: 1 | 2 | 3;
  /** Matches parent `DsTable` size — controls button scale (Figma 961:61536). */
  size?: DsTableSize;
  className?: string;
}

function mapTableSizeToButtonSize(size: DsTableSize): DsButtonSize {
  return size === 'small' ? 'small' : 'base';
}

/** Figma 961:61536 — row action buttons (tertiary) + optional overflow icon. */
export function DsTableColumnActions({
  count = 3,
  size = 'small',
  className,
}: DsTableColumnActionsProps) {
  const textActions = Math.min(count, 2);
  const buttonSize = mapTableSizeToButtonSize(size);

  return (
    <div
      className={[
        'ds-table__column-actions',
        `ds-table__column-actions--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Array.from({ length: textActions }, (_, index) => (
        <DsButton key={`action-${index}`} variant="tertiary" size={buttonSize} label="Action" />
      ))}
      {count >= 3 ? (
        <DsButton
          variant="tertiary"
          size={buttonSize}
          iconOnly
          icon={<DsIconEllipsisVertical size={16} />}
          label="More actions"
        />
      ) : null}
    </div>
  );
}
