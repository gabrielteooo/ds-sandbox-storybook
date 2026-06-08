import { Input } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useMemo, useState, type Key } from 'react';
import { DsCheckbox } from '../Checkbox';
import '../Input/component.css';
import { DS_TABLE_PANEL } from './tablePanelMetrics';

export interface DsTableFilterOption {
  label: string;
  value: string;
}

export interface DsTableFilterDropdownProps extends FilterDropdownProps {
  options?: DsTableFilterOption[];
}

/** Figma 22764:14768 — search, select all / clear all, checkbox list. */
export const DEFAULT_TABLE_FILTER_OPTIONS: DsTableFilterOption[] = Array.from(
  { length: 5 },
  (_, index) => ({
    label: 'Row cell text',
    value: String(index + 1),
  }),
);

export function DsTableFilterDropdown({
  options = DEFAULT_TABLE_FILTER_OPTIONS,
  selectedKeys,
  setSelectedKeys,
  confirm,
}: DsTableFilterDropdownProps) {
  const [search, setSearch] = useState('');
  const selected = (selectedKeys ?? []) as string[];

  const visibleOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [options, search]);

  const hasSelection = selected.length > 0;
  const canSelectAll = visibleOptions.length > 0;

  const applyKeys = (keys: Key[]) => {
    setSelectedKeys?.(keys);
    confirm?.({ closeDropdown: false });
  };

  const handleSelectAll = () => {
    const visibleValues = visibleOptions.map((option) => option.value);
    const merged = Array.from(new Set([...selected, ...visibleValues]));
    applyKeys(merged);
  };

  const handleClearAll = () => {
    if (!hasSelection) {
      return;
    }
    applyKeys([]);
  };

  const handleToggle = (value: string, checked: boolean) => {
    const next = checked
      ? [...selected, value]
      : selected.filter((key) => key !== value);
    applyKeys(next);
  };

  return (
    <div
      className="ds-table-filter-dropdown"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="ds-table-filter-dropdown__search">
        <div className="ds-input ds-input--basic ds-input--small">
          <Input
            size="middle"
            placeholder="Search"
            value={search}
            className="ds-input__control"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="ds-table-filter-dropdown__actions">
        <button
          type="button"
          className="ds-table-filter-dropdown__action"
          disabled={!canSelectAll}
          onClick={handleSelectAll}
        >
          Select all
        </button>
        <button
          type="button"
          className={[
            'ds-table-filter-dropdown__action',
            !hasSelection ? 'ds-table-filter-dropdown__action--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={!hasSelection}
          onClick={handleClearAll}
        >
          Clear all
        </button>
      </div>

      <div
        className="ds-table-filter-dropdown__list"
        style={{ maxHeight: DS_TABLE_PANEL.filterDropdownMaxHeightPx }}
      >
        {visibleOptions.map((option) => (
          <label key={option.value} className="ds-table-filter-dropdown__item">
            <DsCheckbox
              checked={selected.includes(option.value)}
              showLabel={false}
              onChange={(event) => handleToggle(option.value, event.target.checked)}
            />
            <span className="ds-table-filter-dropdown__item-label text-sm-normal">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
