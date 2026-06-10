import type { ReactNode } from 'react';
import './component.css';

/** Figma Input Caption 388:11597 */
export type InputCaptionStatus = 'default' | 'error' | 'warning';

export interface InputCaptionProps {
  text?: string;
  children?: ReactNode;
  status?: InputCaptionStatus;
  className?: string;
}

export function InputCaption({
  text,
  children,
  status = 'default',
  className,
}: InputCaptionProps) {
  const content = children ?? text;
  if (content == null || content === '') return null;

  return (
    <span
      className={[
        'ds-input-caption',
        'text-xs-normal',
        `ds-input-caption--${status}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {content}
    </span>
  );
}
