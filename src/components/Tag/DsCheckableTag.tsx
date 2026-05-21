import { Tag } from 'antd';
import type { ReactNode } from 'react';
import './component.css';

const { CheckableTag } = Tag;

export interface DsCheckableTagProps {
  children?: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

/** Figma 412:13526 — checkable tag; label centered in pill */
export function DsCheckableTag({
  children = 'Tag',
  checked = false,
  onChange,
  className,
}: DsCheckableTagProps) {
  return (
    <CheckableTag
      className={[
        'ds-tag-checkable',
        checked ? 'ds-tag-checkable--checked' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      checked={checked}
      onChange={onChange}
    >
      {children}
    </CheckableTag>
  );
}

export default DsCheckableTag;
