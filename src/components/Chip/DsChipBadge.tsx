import type { DsChipSize } from './chipPanelMetrics';

export interface DsChipBadgeProps {
  size?: DsChipSize;
  count?: number | string;
  disabled?: boolean;
  className?: string;
}

/** Figma Badge / Basic inside Chip — count pill (base) or dot indicator (small). */
export function DsChipBadge({
  size = 'base',
  count = 24,
  disabled = false,
  className,
}: DsChipBadgeProps) {
  const isSmall = size === 'small';

  return (
    <span
      className={[
        'ds-chip-badge',
        isSmall ? 'ds-chip-badge--small' : 'ds-chip-badge--base',
        disabled ? 'ds-chip-badge--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={isSmall ? true : undefined}
    >
      {!isSmall ? (
        <span className="ds-chip-badge__count text-sm-normal">{count}</span>
      ) : null}
    </span>
  );
}
