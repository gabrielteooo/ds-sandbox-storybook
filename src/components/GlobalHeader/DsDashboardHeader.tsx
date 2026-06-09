import { useMemo, useState } from 'react';
import { DsGlobalHeader, type DsGlobalHeaderProps } from './component';
import {
  DS_DASHBOARD_FILTER_FIELDS,
  DsDashboardFilter,
} from './DsDashboardFilter';
import { DsQlikFilterBar, type DsQlikFilterChip } from './DsQlikFilterBar';

export interface DsDashboardHeaderProps extends Omit<DsGlobalHeaderProps, 'type'> {
  /** Initial filter selections — omit for empty default state */
  defaultFilterValues?: Record<string, string | undefined>;
}

export function DsDashboardHeader({
  defaultFilterValues = {},
  primaryActionLabel = 'View in Qlik',
  showAvatar = false,
  className,
  ...globalHeaderProps
}: DsDashboardHeaderProps) {
  const [filterValues, setFilterValues] =
    useState<Record<string, string | undefined>>(defaultFilterValues);

  const chips = useMemo<DsQlikFilterChip[]>(
    () =>
      DS_DASHBOARD_FILTER_FIELDS.filter((field) => filterValues[field.key]).map(
        (field) => ({
          key: field.key,
          label: `=${field.label}`,
          value: filterValues[field.key]!,
          scale: '25%',
        }),
      ),
    [filterValues],
  );

  const handleValueChange = (key: string, value?: string) => {
    setFilterValues((prev) => {
      const next = { ...prev };
      if (value) {
        next[key] = value;
      } else {
        delete next[key];
      }
      return next;
    });
  };

  const clearAllFilters = () => setFilterValues({});

  return (
    <div className={['ds-dashboard-header', className].filter(Boolean).join(' ')}>
      <DsGlobalHeader
        type="default"
        primaryActionLabel={primaryActionLabel}
        showAvatar={showAvatar}
        className="ds-dashboard-header__global"
        {...globalHeaderProps}
      />
      <DsDashboardFilter
        values={filterValues}
        onValueChange={handleValueChange}
        onResetClick={clearAllFilters}
      />
      <DsQlikFilterBar
        chips={chips}
        onChipRemove={(key) => handleValueChange(key, undefined)}
        onClearClick={clearAllFilters}
      />
    </div>
  );
}
