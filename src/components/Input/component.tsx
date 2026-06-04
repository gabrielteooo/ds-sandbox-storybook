import { Input, InputNumber, Select } from 'antd';
import { DsIconChevronDown, DsIconGear, DsIconSearch } from '../../icons';
import { DsButton } from '../Button/component';
import type { InputNumberProps, InputProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { PasswordProps } from 'antd/es/input/Password';
import type { InputRef } from 'antd/es/input';
import type { ChangeEvent, ReactNode, KeyboardEvent } from 'react';
import { useRef } from 'react';
import './component.css';

export type DsInputKind =
  | 'basic'
  | 'textarea'
  | 'password'
  | 'pre-post-tab'
  | 'search'
  | 'number';
export type DsInputTabVariant = 'basic' | 'icon' | 'select';
export type DsSearchButtonType = 'default' | 'primary-icon' | 'primary-text';
export type DsInputSize = 'x-small' | 'small' | 'base';
export type DsInputStatus = 'default' | 'error' | 'warning' | 'success';
/** Figma interaction state (Input / Basic 515:39978) */
export type DsInputState =
  | 'default'
  | 'hover'
  | 'focused'
  | 'typing'
  | 'filled'
  | 'disabled';

export const DS_INPUT_SIZES: DsInputSize[] = ['x-small', 'small', 'base'];
export const DS_INPUT_STATUSES: DsInputStatus[] = ['default', 'error', 'warning', 'success'];
export const DS_INPUT_STATES: DsInputState[] = [
  'default',
  'hover',
  'focused',
  'typing',
  'filled',
  'disabled',
];

const DEFAULT_PLACEHOLDER = 'Type here';
const FILLED_VALUE = 'Sample text';
const TYPING_VALUE = 'Typing...';
const NUMBER_FILLED_VALUE = 42;

export interface DsInputProps {
  kind?: DsInputKind;
  size?: DsInputSize;
  status?: DsInputStatus;
  /** Figma interaction state; `disabled` also sets the disabled attribute */
  state?: DsInputState;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixText?: string;
  suffixText?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
  /** Pre Post Tab (515:41432) — addon segments per 442:24 */
  preTab?: boolean;
  postTab?: boolean;
  preTabText?: string;
  postTabText?: string;
  tabVariant?: DsInputTabVariant;
  /** Search (515:41352) */
  searchButtonType?: DsSearchButtonType;
  searchPreTab?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

function PrePostTabAddon({
  text,
  variant,
  size,
  disabled = false,
}: {
  text: string;
  variant: DsInputTabVariant;
  size: DsInputSize;
  disabled?: boolean;
}) {
  if (variant === 'icon') {
    return (
      <span className={`ds-input-tab ds-input-tab--icon ds-input-tab--${size}`}>
        <DsIconGear />
      </span>
    );
  }

  if (variant === 'select') {
    return (
      <Select
        defaultValue={text}
        size={mapInputSizeToAnt(size)}
        className={`ds-input-tab-select ds-input-tab-select--${size}`}
        suffixIcon={<DsIconChevronDown />}
        popupMatchSelectWidth={false}
        options={[{ value: text, label: text }]}
        bordered={false}
        disabled={disabled}
      />
    );
  }

  return <span className={`ds-input-tab ds-input-tab--${size}`}>{text}</span>;
}

/** Figma Search 515:41352 — default = secondary icon-only at input size */
function getSearchEnterButton(
  type: DsSearchButtonType,
  size: DsInputSize,
  disabled = false,
  onSearchClick?: () => void,
) {
  const enterClass = `ds-input-search-enter ds-input-search-enter--${type}`;

  switch (type) {
    case 'primary-icon':
      return (
        <DsButton
          variant="primary"
          size={size}
          iconOnly
          icon={<DsIconSearch />}
          disabled={disabled}
          className={enterClass}
          onClick={onSearchClick}
        />
      );
    case 'primary-text':
      return (
        <DsButton
          variant="primary"
          size={size}
          label="Search"
          disabled={disabled}
          className={enterClass}
          onClick={onSearchClick}
        />
      );
    default:
      return (
        <DsButton
          variant="secondary"
          size={size}
          iconOnly
          icon={<DsIconSearch />}
          disabled={disabled}
          className={enterClass}
          onClick={onSearchClick}
        />
      );
  }
}

export function mapInputSizeToAnt(size: DsInputSize): InputProps['size'] {
  switch (size) {
    case 'x-small':
      return 'small';
    case 'small':
      return 'middle';
    case 'base':
      return 'large';
  }
}

export function mapStatusToAnt(
  status: DsInputStatus,
): InputProps['status'] | undefined {
  switch (status) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return undefined;
  }
}

function wrapperClass(
  kind: DsInputKind,
  size: DsInputSize,
  status: DsInputStatus,
  state: DsInputState,
  isDisabled: boolean,
  className?: string,
) {
  return [
    'ds-input',
    `ds-input--${kind}`,
    `ds-input--${size}`,
    status !== 'default' ? `ds-input--status-${status}` : '',
    state !== 'default' ? `ds-input--state-${state}` : '',
    isDisabled ? 'ds-input--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function resolveValueProps(
  kind: DsInputKind,
  state: DsInputState,
  value?: string,
  defaultValue?: string,
): { value?: string; defaultValue?: string } {
  if (value !== undefined) {
    return { value, defaultValue };
  }

  if (state === 'filled') {
    const filled =
      kind === 'number' ? String(NUMBER_FILLED_VALUE) : FILLED_VALUE;
    return { defaultValue: defaultValue ?? filled };
  }

  if (state === 'typing') {
    const typing =
      kind === 'number' ? String(NUMBER_FILLED_VALUE) : TYPING_VALUE;
    return { defaultValue: defaultValue ?? typing };
  }

  return { value, defaultValue };
}

export function DsInput({
  kind = 'basic',
  size = 'base',
  status = 'default',
  state = 'default',
  placeholder = DEFAULT_PLACEHOLDER,
  value,
  defaultValue,
  disabled = false,
  allowClear = false,
  prefix,
  suffix,
  prefixText,
  suffixText,
  showCount = false,
  maxLength,
  rows = 4,
  preTab = true,
  postTab = true,
  preTabText = 'http://',
  postTabText = '.com',
  tabVariant = 'basic',
  searchButtonType = 'default',
  searchPreTab = false,
  className,
  onChange,
}: DsInputProps) {
  const searchInputRef = useRef<InputRef>(null);
  const antSize = mapInputSizeToAnt(size);
  const antStatus = mapStatusToAnt(status);
  const isDisabled = disabled || state === 'disabled';
  const valueProps = resolveValueProps(kind, state, value, defaultValue);
  const wrapper = wrapperClass(kind, size, status, state, isDisabled, className);
  const resolvedPrefix = prefix ?? (prefixText ? <span>{prefixText}</span> : undefined);
  const resolvedSuffix = suffix ?? (suffixText ? <span>{suffixText}</span> : undefined);

  const submitSearch = () => {
    const val =
      searchInputRef.current?.input?.value ??
      value ??
      valueProps.defaultValue ??
      '';
    onChange?.(val);
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitSearch();
    }
  };

  const common: Pick<InputProps, 'size' | 'status' | 'placeholder' | 'disabled' | 'allowClear'> = {
    size: antSize,
    status: antStatus,
    placeholder,
    disabled: isDisabled,
    allowClear,
  };

  const focusProps = state === 'focused' && !isDisabled ? { autoFocus: true } : {};

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  if (kind === 'textarea') {
    const textAreaProps: TextAreaProps = {
      ...common,
      ...valueProps,
      ...focusProps,
      showCount,
      maxLength,
      rows,
      onChange: handleChange,
      className: 'ds-input__control',
    };

    return (
      <div className={wrapper}>
        <Input.TextArea {...textAreaProps} />
      </div>
    );
  }

  if (kind === 'password') {
    const passwordProps: PasswordProps = {
      ...common,
      ...valueProps,
      ...focusProps,
      prefix: resolvedPrefix,
      suffix: resolvedSuffix,
      onChange: handleChange,
      className: 'ds-input__control',
    };

    return (
      <div className={wrapper}>
        <Input.Password {...passwordProps} />
      </div>
    );
  }

  if (kind === 'pre-post-tab') {
    const prePostProps: InputProps = {
      ...common,
      ...valueProps,
      ...focusProps,
      addonBefore: preTab ? (
        <PrePostTabAddon
          text={preTabText ?? 'http://'}
          variant={tabVariant}
          size={size}
          disabled={isDisabled}
        />
      ) : undefined,
      addonAfter: postTab ? (
        <PrePostTabAddon
          text={postTabText ?? '.com'}
          variant={tabVariant}
          size={size}
          disabled={isDisabled}
        />
      ) : undefined,
      onChange: handleChange,
      className: 'ds-input__control',
    };

    return (
      <div className={wrapper}>
        <Input {...prePostProps} />
      </div>
    );
  }

  if (kind === 'search') {
    const searchProps: InputProps = {
      ...common,
      ...valueProps,
      ...focusProps,
      prefix: resolvedPrefix,
      suffix: resolvedSuffix,
      addonBefore: searchPreTab ? (
        <PrePostTabAddon
          text={preTabText ?? 'http://'}
          variant="basic"
          size={size}
          disabled={isDisabled}
        />
      ) : undefined,
      addonAfter: getSearchEnterButton(
        searchButtonType,
        size,
        isDisabled,
        submitSearch,
      ),
      onChange: handleChange,
      onKeyDown: handleSearchKeyDown,
      className: 'ds-input__control',
    };

    return (
      <div className={wrapper}>
        <Input ref={searchInputRef} {...searchProps} />
      </div>
    );
  }

  if (kind === 'number') {
    const numDefault =
      valueProps.defaultValue !== undefined
        ? Number(valueProps.defaultValue)
        : undefined;
    const numValue =
      valueProps.value !== undefined ? Number(valueProps.value) : undefined;

    const numberProps: InputNumberProps = {
      size: antSize,
      status: antStatus,
      placeholder,
      disabled: isDisabled,
      value: numValue,
      defaultValue: numDefault,
      className: 'ds-input__control',
      onChange: (val) => onChange?.(val?.toString() ?? ''),
      ...focusProps,
    };

    return (
      <div className={wrapper}>
        <InputNumber {...numberProps} />
      </div>
    );
  }

  const inputProps: InputProps = {
    ...common,
    ...valueProps,
    ...focusProps,
    prefix: resolvedPrefix,
    suffix: resolvedSuffix,
    onChange: handleChange,
    className: 'ds-input__control',
  };

  return (
    <div className={wrapper}>
      <Input {...inputProps} />
    </div>
  );
}

export default DsInput;
