import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, type InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DsTag } from './component';

export interface DsTagsAddRemoveProps {
  initialTags?: string[];
  className?: string;
}

/** Figma 22688:25027 — closable tags + dashed “New Tag” (Ant control demo pattern) */
export function DsTagsAddRemove({
  initialTags = ['Tag 1', 'Tag 2', 'Tag 3'],
  className,
}: DsTagsAddRemoveProps) {
  const [tags, setTags] = useState(initialTags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== removedTag));
  };

  const handleInputConfirm = () => {
    const value = inputValue.trim();
    if (value && !tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={['ds-tags-add-remove', className].filter(Boolean).join(' ')}>
      {tags.map((tag) => (
        <DsTag key={tag} closable onClose={() => handleClose(tag)}>
          {tag}
        </DsTag>
      ))}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="ds-tags-add-remove__input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag className="ds-tag-add" onClick={() => setInputVisible(true)}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
}

export default DsTagsAddRemove;
