import { useMemo, useState } from 'react';
import { DsCheckbox } from './component';

export interface DsCheckboxCheckAllProps {
  items?: string[];
  checkAllLabel?: string;
  className?: string;
}

/** Figma 22686:23778 — parent checkbox controls children; indeterminate when partially selected */
export function DsCheckboxCheckAll({
  items = ['Apple', 'Banana', 'Carrot'],
  checkAllLabel = 'Check all',
  className,
}: DsCheckboxCheckAllProps) {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item, false])),
  );

  const checkedCount = useMemo(
    () => items.filter((item) => checkedMap[item]).length,
    [items, checkedMap],
  );

  const allChecked = checkedCount === items.length && items.length > 0;
  const checkAllIndeterminate = checkedCount > 0 && !allChecked;

  const setAll = (checked: boolean) => {
    setCheckedMap(Object.fromEntries(items.map((item) => [item, checked])));
  };

  return (
    <div className={['ds-checkbox-check-all', className].filter(Boolean).join(' ')}>
      <DsCheckbox
        checked={allChecked}
        indeterminate={checkAllIndeterminate}
        label={checkAllLabel}
        onChange={(e) => setAll(e.target.checked)}
      />
      <hr className="ds-checkbox-check-all__divider" />
      <div className="ds-checkbox-check-all__items">
        {items.map((item) => (
          <DsCheckbox
            key={item}
            checked={checkedMap[item]}
            label={item}
            onChange={(e) =>
              setCheckedMap((prev) => ({ ...prev, [item]: e.target.checked }))
            }
          />
        ))}
      </div>
    </div>
  );
}

export default DsCheckboxCheckAll;
