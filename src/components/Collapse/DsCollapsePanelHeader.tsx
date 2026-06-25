import type { ReactNode } from 'react';
import type { DsCollapseSize } from './collapsePanelMetrics';

export interface DsCollapsePanelHeaderProps {
  label: ReactNode;
  size?: DsCollapseSize;
  disabled?: boolean;
  className?: string;
}

/** Figma collapse-item header 407:46 — label for Ant Collapse header. */
export function DsCollapsePanelHeader({
  label,
  size = 'default',
  disabled = false,
  className,
}: DsCollapsePanelHeaderProps) {
  return (
    <span
      className={[
        'ds-collapse-panel-header',
        `ds-collapse-panel-header--${size}`,
        disabled ? 'ds-collapse-panel-header--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className={[
          'ds-collapse-panel-header__label',
          size === 'large' ? 'text-base-medium' : 'text-sm-medium',
        ].join(' ')}
      >
        {label}
      </span>
    </span>
  );
}
