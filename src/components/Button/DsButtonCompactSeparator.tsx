import type { DsButtonGroupSize, DsButtonGroupVariant } from './component';

export type DsButtonCompactSeparatorOrientation = 'vertical' | 'horizontal';

export interface DsButtonCompactSeparatorProps {
  /** Primary or Secondary (Figma Default) group variant. */
  variant?: DsButtonGroupVariant;
  /** Vertical line between horizontal buttons; horizontal line between vertical buttons. */
  orientation?: DsButtonCompactSeparatorOrientation;
  size?: DsButtonGroupSize;
  className?: string;
}

function separatorClass(
  variant: DsButtonGroupVariant,
  orientation: DsButtonCompactSeparatorOrientation,
  size: DsButtonGroupSize,
  className?: string,
) {
  return [
    'ds-button-compact-separator',
    `ds-button-compact-separator--${variant}`,
    `ds-button-compact-separator--${orientation}`,
    `ds-button-compact-separator--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

/** Figma Button Compact Separator 3126:27635 — divider between compact items. */
export function DsButtonCompactSeparator({
  variant = 'primary',
  orientation = 'vertical',
  size = 'default',
  className,
}: DsButtonCompactSeparatorProps) {
  return (
    <span
      className={separatorClass(variant, orientation, size, className)}
      aria-hidden
    >
      <span className="ds-button-compact-separator__line" />
    </span>
  );
}
