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
  onValueChange?: (key: string, value?: string) => void;
  onMoreFiltersClick?: () => void;
  onResetClick?: () => void;
  className?: string;
}

export const DS_DASHBOARD_FILTER_FIELDS: DsDashboardFilterField[] = [
  { key: '1', label: 'Filter 1' },
  { key: '2', label: 'Filter 2' },
  { key: '3', label: 'Filter 3' },
  { key: '4', label: 'Filter 4' },
];

export const DS_DASHBOARD_FILTER_OPTIONS: DefaultOptionType[] = [
  { value: 'Category 1', label: 'Category 1' },
  { value: 'Category 2', label: 'Category 2' },
  { value: 'Category 3', label: 'Category 3' },
];

/** Figma Dashboard filter 22503:28865 */
export function DsDashboardFilter({
  fields = DS_DASHBOARD_FILTER_FIELDS,
  values = {},
  options = DS_DASHBOARD_FILTER_OPTIONS,
  onValueChange,
  onMoreFiltersClick,
  onResetClick,
  className,
}: DsDashboardFilterProps) {
  return (
    <div className={['ds-dashboard-filter', className].filter(Boolean).join(' ')}>
      <div className="ds-dashboard-filter__fields">
        {fields.map((field) => (
          <div key={field.key} className="ds-dashboard-filter__field">
            <label className="ds-dashboard-filter__label text-sm-normal">
              {field.label}
            </label>
            <DsSelect
              size="base"
              placeholder="Select"
              value={values[field.key] ?? null}
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
        ))}
      </div>
      <div className="ds-dashboard-filter__ctas">
        <DsButton
          variant="secondary"
          size="base"
          label="More filters"
          onClick={onMoreFiltersClick}
        />
        <DsButton
          variant="tertiary"
          size="base"
          label="Reset"
          onClick={onResetClick}
        />
      </div>
    </div>
  );
}
