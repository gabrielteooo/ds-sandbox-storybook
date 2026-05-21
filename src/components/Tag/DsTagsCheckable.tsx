import { useState } from 'react';
import { DsCheckableTag } from './DsCheckableTag';

const OPTIONS = ['Apple', 'Banana', 'Carrot'] as const;

export interface DsTagsCheckableProps {
  className?: string;
}

/** Figma 22688:25069 — single-select and multi-select checkable tag rows */
export function DsTagsCheckable({ className }: DsTagsCheckableProps) {
  const [singleSelected, setSingleSelected] = useState<string>('Apple');
  const [multiSelected, setMultiSelected] = useState<string[]>(['Apple', 'Banana']);

  const toggleMulti = (tag: string, checked: boolean) => {
    setMultiSelected((prev) =>
      checked ? [...prev, tag] : prev.filter((item) => item !== tag),
    );
  };

  return (
    <div className={['ds-tags-checkable', className].filter(Boolean).join(' ')}>
      <div className="ds-tags-checkable__row">
        <span className="ds-tags-checkable__label">Single:</span>
        {OPTIONS.map((tag) => (
          <DsCheckableTag
            key={`single-${tag}`}
            checked={singleSelected === tag}
            onChange={(checked) => {
              if (checked) {
                setSingleSelected(tag);
              }
            }}
          >
            {tag}
          </DsCheckableTag>
        ))}
      </div>
      <div className="ds-tags-checkable__row">
        <span className="ds-tags-checkable__label">Multiple:</span>
        {OPTIONS.map((tag) => (
          <DsCheckableTag
            key={`multi-${tag}`}
            checked={multiSelected.includes(tag)}
            onChange={(checked) => toggleMulti(tag, checked)}
          >
            {tag}
          </DsCheckableTag>
        ))}
      </div>
    </div>
  );
}

export default DsTagsCheckable;
