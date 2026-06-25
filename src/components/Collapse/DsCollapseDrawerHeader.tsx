import type { ReactNode } from 'react';

export interface DsCollapseDrawerHeaderProps {
  /** Header label — Figma collapse-drawer-header 10647:1971. */
  children?: ReactNode;
  /** When true, shows expanded styling (fill background, top radius only). */
  expanded?: boolean;
  className?: string;
}

/** Figma collapse-drawer-header 10647:1971 — drawer / filter panel section title. */
export function DsCollapseDrawerHeader({
  children = 'Header',
  expanded = false,
  className,
}: DsCollapseDrawerHeaderProps) {
  return (
    <div
      className={[
        'ds-collapse-drawer-header',
        'text-heading-5',
        expanded ? 'ds-collapse-drawer-header--expanded' : 'ds-collapse-drawer-header--collapsed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
