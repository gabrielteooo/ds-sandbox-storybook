import type { ReactNode } from 'react';
import type { DsTableBodyAlignment } from './tablePresets';

export interface DsTableBodyTextProps {
  text: ReactNode;
  description?: ReactNode;
  align?: DsTableBodyAlignment;
  className?: string;
}

/** Figma 940:83747 — primary row text with optional description. */
export function DsTableBodyText({
  text,
  description,
  align = 'left',
  className,
}: DsTableBodyTextProps) {
  return (
    <div
      className={[
        'ds-table__body-text',
        `ds-table__body-text--${align}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="ds-table__body-text-primary text-sm-normal">{text}</span>
      {description ? (
        <span className="ds-table__body-text-description text-xs-normal">
          {description}
        </span>
      ) : null}
    </div>
  );
}
