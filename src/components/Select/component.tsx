import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Checkbox, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { BaseSelectRef } from 'rc-select';
import type { DefaultOptionType } from 'rc-select/es/Select';
import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { DsSelectMultiselectHeader } from './DsSelectMultiselectHeader';
import {
  DS_SELECT_DEFAULT_OPTIONS,
  DS_SELECT_LIST_HEIGHT,
} from './selectConstants';
import './component.css';

/** Matches Input field sizes (Figma Input 388:11439). */
export type DsSelectSize = 'x-small' | 'small' | 'base';

export type DsSelectVariant = 'basic' | 'multiple' | 'search';

export type DsSelectStatus = 'default' | 'warning' | 'error';

export const DS_SELECT_SIZES: DsSelectSize[] = ['x-small', 'small', 'base'];
export const DS_SELECT_VARIANTS: DsSelectVariant[] = ['basic', 'multiple', 'search'];
export const DS_SELECT_STATUSES: DsSelectStatus[] = ['default', 'warning', 'error'];

export function mapSelectSizeToAnt(size: DsSelectSize): NonNullable<SelectProps['size']> {
  switch (size) {
    case 'x-small':
      return 'small';
    case 'small':
      return 'middle';
    case 'base':
      return 'large';
  }
}

export function mapSelectStatusToAnt(
  status: DsSelectStatus,
): SelectProps['status'] | undefined {
  switch (status) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return undefined;
  }
}

export interface DsSelectProps extends Omit<
  SelectProps,
  'size' | 'suffixIcon' | 'mode' | 'status' | 'showSearch' | 'optionRender' | 'dropdownRender' | 'variant'
> {
  size?: DsSelectSize;
  /** basic = single · multiple = tags + checkbox menu · search = filterable single */
  variant?: DsSelectVariant;
  status?: DsSelectStatus;
  options?: DefaultOptionType[];
  /** Override suffix; default chevron, search icon when open (search/multiple). */
  suffixIcon?: SelectProps['suffixIcon'];
}

function rootClass(
  size: DsSelectSize,
  variant: DsSelectVariant,
  status: DsSelectStatus,
  open: boolean,
  className?: string,
) {
  return [
    'ds-select',
    `ds-select--${size}`,
    `ds-select--${variant}`,
    status !== 'default' ? `ds-select--status-${status}` : '',
    open ? 'ds-select--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const DsSelect = forwardRef<BaseSelectRef, DsSelectProps>(function DsSelect(
  {
    size = 'small',
    variant = 'basic',
    status = 'default',
    className,
    popupClassName,
    options = [...DS_SELECT_DEFAULT_OPTIONS],
    suffixIcon: suffixIconProp,
    defaultValue,
    value: valueProp,
    onChange,
    placeholder = 'Select',
    allowClear = true,
    disabled = false,
    maxTagCount = 2,
    listHeight = DS_SELECT_LIST_HEIGHT,
    filterOption,
    ...rest
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const mergedValue = isControlled ? valueProp : internalValue;

  const antSize = mapSelectSizeToAnt(size);
  const antStatus = mapSelectStatusToAnt(status);
  const isMultiple = variant === 'multiple';
  const isSearch = variant === 'search' || isMultiple;

  const optionValues = useMemo(
    () =>
      options
        .map((opt) => opt.value)
        .filter((v): v is string | number => v !== undefined && v !== null),
    [options],
  );

  const handleChange: SelectProps['onChange'] = (next, option) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next, option);
  };

  const handleSelectAll = useCallback(() => {
    handleChange([...optionValues], options);
  }, [handleChange, optionValues, options]);

  const handleClearAll = useCallback(() => {
    handleChange([], []);
  }, [handleChange]);

  const suffixIcon =
    suffixIconProp !== undefined
      ? suffixIconProp
      : isSearch && open
        ? <SearchOutlined />
        : <DownOutlined />;

  const popupCls = [
    'ds-select__popup',
    isMultiple ? 'ds-select__popup--multiple' : '',
    popupClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const dropdownRender = useCallback(
    (menu: ReactElement) =>
      isMultiple ? (
        <>
          <DsSelectMultiselectHeader
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
          />
          {menu}
        </>
      ) : (
        menu
      ),
    [isMultiple, handleSelectAll, handleClearAll],
  );

  const optionRender = useCallback(
    (option: Parameters<NonNullable<SelectProps['optionRender']>>[0]) => {
      if (!isMultiple) {
        return option.label;
      }
      const selected =
        Array.isArray(mergedValue) &&
        mergedValue.some((v) => String(v) === String(option.value));
      return (
        <span className="ds-select-option-multiple">
          <Checkbox checked={selected} tabIndex={-1} />
          <span className="ds-select-option-multiple__label">{option.label}</span>
        </span>
      );
    },
    [isMultiple, mergedValue],
  );

  const defaultFilterOption: SelectProps['filterOption'] =
    filterOption ??
    ((input, option) => {
      const label = option?.label ?? option?.value;
      return String(label).toLowerCase().includes(input.toLowerCase());
    });

  return (
    <Select
      ref={ref}
      size={antSize}
      className={rootClass(size, variant, status, open, className)}
      popupClassName={popupCls}
      suffixIcon={suffixIcon}
      status={antStatus}
      mode={isMultiple ? 'multiple' : undefined}
      showSearch={isSearch}
      allowClear={allowClear && !isMultiple}
      placeholder={placeholder}
      options={options}
      value={mergedValue}
      defaultValue={isControlled ? undefined : defaultValue}
      onChange={handleChange}
      onOpenChange={setOpen}
      disabled={disabled}
      maxTagCount={isMultiple ? maxTagCount : undefined}
      listHeight={listHeight}
      menuItemSelectedIcon={isMultiple ? null : undefined}
      optionRender={optionRender}
      dropdownRender={isMultiple ? dropdownRender : undefined}
      filterOption={isSearch ? defaultFilterOption : false}
      {...rest}
    />
  );
});

DsSelect.displayName = 'DsSelect';

export default DsSelect;
