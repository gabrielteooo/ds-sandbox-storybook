import type { ReactNode } from 'react';

export interface DsDrawerHeaderProps {
  title?: ReactNode;
  className?: string;
}

/** Figma Drawer_Header 7031:61723 — title styling for Ant Drawer header slot. */
export function DsDrawerHeader({
  title = 'Title',
  className,
}: DsDrawerHeaderProps) {
  return (
    <span
      className={['ds-drawer-header__title', 'text-base-strong', className]
        .filter(Boolean)
        .join(' ')}
    >
      {title}
    </span>
  );
}
