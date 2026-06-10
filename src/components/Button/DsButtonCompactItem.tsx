import type { ReactNode } from 'react';

export interface DsButtonCompactItemProps {
  children: ReactNode;
  className?: string;
}

/** Figma Button Compact Item 3126:25864 — wrapper for a single compact group button. */
export function DsButtonCompactItem({
  children,
  className,
}: DsButtonCompactItemProps) {
  return (
    <div
      className={['ds-button-compact-item', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
