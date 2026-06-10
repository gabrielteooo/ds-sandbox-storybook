import { useState } from 'react';
import { DsButton } from '../Button';
import '../Button/component.css';
import { DsSelect } from '../Select';
import '../Select/component.css';
import type { DefaultOptionType } from 'rc-select/es/Select';

export interface DsDashboardFilterField {
  key: string;
  label: string;
}

export interface DsDashboardFilterProps {
  fields?: DsDashboardFilterField[];
  values?: Record<string, string | undefined>;
  options?: DefaultOptionType[];
  showMoreFilters?: boolean;
  defaultShowMoreFilters?: boolean;
  onShowMoreFiltersChange?: (show: boolean) => void;
  onValueChange?: (key: string, value?: string) => void;
  onMoreFiltersClick?: () => void;
  onResetClick?: () => void;
  className?: string;
}

export const DS_DASHBOARD_FILTER_PRIMARY_COUNT = 4;
export const DS_DASHBOARD_FILTER_ADDITIONAL_COUNT = 4;

export const DS_DASHBOARD_FILTER_FIELDS: DsDashboardFilterField[] = [
  { key: '1', label: 'Filter 1' },
  { key: '2', label: 'Filter 2' },
  { key: '3', label: 'Filter 3' },
  { key: '4', label: 'Filter 4' },
  { key: '5', label: 'Filter 5' },
  { key: '6', label: 'Filter 6' },
  { key: '7', label: 'Filter 7' },
  { key: '8', label: 'Filter 8' },
];

export const DS_DASHBOARD_FILTER_OPTIONS: DefaultOptionType[] = [
  { value: 'Category 1', label: 'Category 1' },
  { value: 'Category 2', label: 'Category 2' },
  { value: 'Category 3', label: 'Category 3' },
];

function FilterField({
  field,
  value,
  options,
  onValueChange,
}: {
  field: DsDashboardFilterField;
  value?: string;
  options: DefaultOptionType[];
  onValueChange?: (key: string, value?: string) => void;
}) {
  return (
    <div className="ds-dashboard-filter__field">
      <label className="ds-dashboard-filter__label text-sm-normal">
        {field.label}
      </label>
      <DsSelect
        size="base"
        placeholder="Select"
        value={value ?? null}
        options={options}
        allowClear
        className="ds-dashboard-filter__select"
        onChange={(next) =>
          onValueChange?.(
            field.key,
            next == null || next === '' ? undefined : String(next),
          )
        }
      />
    </div>
  );
}

/** Figma Dashboard filter 22503:28865 / expanded 22778:3424 */
export function DsDashboardFilter({
  fields = DS_DASHBOARD_FILTER_FIELDS,
  values = {},
  options = DS_DASHBOARD_FILTER_OPTIONS,
  showMoreFilters: showMoreFiltersProp,
  defaultShowMoreFilters = false,
  onShowMoreFiltersChange,
  onValueChange,
  onMoreFiltersClick,
  onResetClick,
  className,
}: DsDashboardFilterProps) {
  const [internalShowMoreFilters, setInternalShowMoreFilters] = useState(
    defaultShowMoreFilters,
  );
  const showMoreFilters = showMoreFiltersProp ?? internalShowMoreFilters;

  const primaryFields = fields.slice(0, DS_DASHBOARD_FILTER_PRIMARY_COUNT);
  const additionalFields = showMoreFilters
    ? fields.slice(
        DS_DASHBOARD_FILTER_PRIMARY_COUNT,
        DS_DASHBOARD_FILTER_PRIMARY_COUNT + DS_DASHBOARD_FILTER_ADDITIONAL_COUNT,
      )
    : [];

  const handleMoreFiltersToggle = () => {
    const next = !showMoreFilters;
    if (showMoreFiltersProp === undefined) {
      setInternalShowMoreFilters(next);
    }
    onShowMoreFiltersChange?.(next);
    onMoreFiltersClick?.();
  };

  return (
    <div
      className={[
        'ds-dashboard-filter',
        showMoreFilters ? 'ds-dashboard-filter--expanded' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'ds-dashboard-filter__set',
          showMoreFilters ? 'ds-dashboard-filter__set--grid' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {showMoreFilters ? (
          <>
            {primaryFields.map((field) => (
              <FilterField
                key={field.key}
                field={field}
                value={values[field.key]}
                options={options}
                onValueChange={onValueChange}
              />
            ))}
            <div className="ds-dashboard-filter__ctas">
              <DsButton
                variant="secondary"
                size="base"
                label="Less filters"
                onClick={handleMoreFiltersToggle}
              />
              <DsButton
                variant="tertiary"
                size="base"
                label="Reset"
                onClick={onResetClick}
              />
            </div>
            {additionalFields.map((field) => (
              <FilterField
                key={field.key}
                field={field}
                value={values[field.key]}
                options={options}
                onValueChange={onValueChange}
              />
            ))}
            <div className="ds-dashboard-filter__cta-spacer" aria-hidden />
          </>
        ) : (
          <div className="ds-dashboard-filter__row">
            <div className="ds-dashboard-filter__fields">
              {primaryFields.map((field) => (
                <FilterField
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                  options={options}
                  onValueChange={onValueChange}
                />
              ))}
            </div>
            <div className="ds-dashboard-filter__ctas">
              <DsButton
                variant="secondary"
                size="base"
                label="More filters"
                onClick={handleMoreFiltersToggle}
              />
              <DsButton
                variant="tertiary"
                size="base"
                label="Reset"
                onClick={onResetClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
