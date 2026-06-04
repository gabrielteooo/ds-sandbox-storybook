import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import type { FormEvent, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { DsButton } from '../../components/Button/component';
import { DsCheckbox } from '../../components/Checkbox/component';
import { DsDatePicker } from '../../components/DatePicker/component';
import { DsFormFieldLabel } from '../../components/Form/DsFormTextField';
import { DsInput } from '../../components/Input/component';
import '../../components/Button/component.css';
import '../../components/Checkbox/component.css';
import '../../components/DatePicker/component.css';
import '../../components/Form/component.css';
import '../../components/Input/component.css';
import {
  ASSET_STATUS_OPTIONS,
  createInitialDependencyState,
  DEPENDENCY_OPTIONS,
  type AssetOperationalStatus,
  type ServiceAssetConfigPayload,
} from './types';
import './component.css';

export type ServiceAssetConfigFormPhase = 'idle' | 'success';

export interface DsServiceAssetConfigFormProps {
  className?: string;
  disabled?: boolean;
  /** When true, logs the structured payload to the console on successful submit. */
  logPayloadOnSubmit?: boolean;
}

type FieldKey = 'assetId' | 'status' | 'dateRange';

function StatusCardGroup({
  value,
  onChange,
  disabled,
  invalid,
}: {
  value: AssetOperationalStatus | null;
  onChange: (next: AssetOperationalStatus) => void;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Operational status"
      aria-invalid={invalid || undefined}
      className="ds-service-config-form__status-group"
    >
      {ASSET_STATUS_OPTIONS.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            className={[
              'ds-service-config-form__status-card',
              selected ? 'ds-service-config-form__status-card--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange(option.value)}
          >
            <span className="ds-service-config-form__status-card-title text-base-normal">
              {option.title}
            </span>
            <span className="ds-service-config-form__status-card-desc text-sm-normal">
              {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function OptionCardList({
  values,
  onToggle,
  disabled,
}: {
  values: Record<string, boolean>;
  onToggle: (id: string, checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <ul className="ds-service-config-form__option-list">
      {DEPENDENCY_OPTIONS.map((option) => {
        const checked = Boolean(values[option.id]);
        return (
          <li key={option.id}>
            <label
              className={[
                'ds-service-config-form__option-card',
                checked ? 'ds-service-config-form__option-card--selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <DsCheckbox
                checked={checked}
                disabled={disabled}
                showLabel={false}
                value={option.id}
                onChange={(event) => onToggle(option.id, event.target.checked)}
              />
              <span className="ds-service-config-form__option-card-content">
                <span className="ds-service-config-form__option-card-title text-base-normal">
                  {option.title}
                </span>
                <span className="ds-service-config-form__option-card-desc text-sm-normal">
                  {option.description}
                </span>
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function buildPayload(
  assetId: string,
  status: AssetOperationalStatus,
  dateRange: [Dayjs, Dayjs],
  dependencies: Record<string, boolean>,
): ServiceAssetConfigPayload {
  return {
    assetId: assetId.trim(),
    status,
    dateRange: {
      start: dateRange[0].format('YYYY-MM-DD'),
      end: dateRange[1].format('YYYY-MM-DD'),
    },
    dependencies: DEPENDENCY_OPTIONS.filter((option) => dependencies[option.id]).map(
      (option) => option.id,
    ),
  };
}

function SuccessState({
  payload,
  onEditAgain,
  disabled,
}: {
  payload: ServiceAssetConfigPayload;
  onEditAgain: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="ds-service-config-form ds-service-config-form--success">
      <div className="ds-service-config-form__success-icon" aria-hidden>
        ✓
      </div>
      <h2 className="ds-service-config-form__success-title text-heading-4">
        Configuration saved
      </h2>
      <p className="ds-service-config-form__success-text text-sm-normal">
        Asset <strong>{payload.assetId}</strong> is recorded as{' '}
        <strong>{payload.status.replace(/-/g, ' ')}</strong> for{' '}
        {payload.dateRange.start} – {payload.dateRange.end}.
        {payload.dependencies.length > 0
          ? ` ${payload.dependencies.length} dependency option(s) selected.`
          : ' No optional dependencies selected.'}
      </p>
      <div className="ds-service-config-form__success-actions">
        <DsButton
          variant="primary"
          size="base"
          label="Edit configuration"
          disabled={disabled}
          onClick={onEditAgain}
        />
      </div>
    </div>
  );
}

const INITIAL_DEPENDENCIES = createInitialDependencyState();

export function DsServiceAssetConfigForm({
  className,
  disabled = false,
  logPayloadOnSubmit = true,
}: DsServiceAssetConfigFormProps) {
  const [phase, setPhase] = useState<ServiceAssetConfigFormPhase>('idle');
  const [assetId, setAssetId] = useState('');
  const [status, setStatus] = useState<AssetOperationalStatus | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [dependencies, setDependencies] =
    useState<Record<string, boolean>>(INITIAL_DEPENDENCIES);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [lastPayload, setLastPayload] = useState<ServiceAssetConfigPayload | null>(null);

  const resetForm = useCallback(() => {
    setAssetId('');
    setStatus(null);
    setDateRange(null);
    setDependencies(createInitialDependencyState());
    setFieldErrors({});
    setPhase('idle');
    setLastPayload(null);
  }, []);

  const validate = useCallback((): Partial<Record<FieldKey, string>> => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!assetId.trim()) {
      next.assetId = 'Asset ID or project code is required.';
    }
    if (!status) {
      next.status = 'Select an operational status.';
    }
    if (!dateRange?.[0] || !dateRange?.[1]) {
      next.dateRange = 'Select a start and end date for the maintenance window.';
    }
    return next;
  }, [assetId, dateRange, status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const payload = buildPayload(assetId, status!, dateRange!, dependencies);
    if (logPayloadOnSubmit) {
      console.log('[DsServiceAssetConfigForm] submit', payload);
    }
    setLastPayload(payload);
    setPhase('success');
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleDependencyToggle = (id: string, checked: boolean) => {
    setDependencies((prev) => ({ ...prev, [id]: checked }));
  };

  const summaryErrors = useMemo(
    () => Object.values(fieldErrors).filter(Boolean) as string[],
    [fieldErrors],
  );

  if (phase === 'success' && lastPayload) {
    return (
      <SuccessState
        payload={lastPayload}
        onEditAgain={resetForm}
        disabled={disabled}
      />
    );
  }

  const rootClass = ['ds-service-config-form', className].filter(Boolean).join(' ');

  return (
    <form className={rootClass} onSubmit={handleSubmit} noValidate>
      <header className="ds-service-config-form__intro">
        <h1 className="ds-service-config-form__title text-heading-4">
          Service &amp; asset configuration
        </h1>
        <p className="ds-service-config-form__subtitle text-sm-normal">
          Mockup form using MCP DS Sandbox inputs, date range, status cards, and checklist
          cards — state is managed with React hooks.
        </p>
      </header>

      {summaryErrors.length > 0 ? (
        <div className="ds-service-config-form__alert" role="alert">
          <strong className="text-sm-normal">Please fix the following:</strong>
          <ul className="ds-service-config-form__alert-list text-sm-normal">
            {summaryErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="ds-service-config-form__body">
        <Field
          label="Asset ID / project code"
          labelMode="required"
          hint="Unique identifier used across scheduling and inventory."
          error={fieldErrors.assetId}
        >
          <DsInput
            kind="basic"
            size="base"
            placeholder="e.g. AST-2048 or PRJ-NORTH-07"
            value={assetId}
            disabled={disabled}
            onChange={setAssetId}
          />
        </Field>

        <Field
          label="Operational status"
          labelMode="required"
          hint="Choose the current lifecycle state for this asset."
          error={fieldErrors.status}
        >
          <StatusCardGroup
            value={status}
            onChange={(next) => {
              setStatus(next);
              setFieldErrors((prev) => ({ ...prev, status: undefined }));
            }}
            disabled={disabled}
            invalid={Boolean(fieldErrors.status)}
          />
        </Field>

        <Field
          label="Maintenance window"
          labelMode="required"
          hint="Multi-day range for planned work or restricted availability."
          error={fieldErrors.dateRange}
        >
          <DsDatePicker
            size="base"
            picker="date"
            range
            disabled={disabled}
            value={dateRange}
            placeholder={['Start date', 'End date']}
            onChange={(value: RangePickerProps['value']) => {
              setDateRange((value ?? null) as [Dayjs, Dayjs] | null);
              setFieldErrors((prev) => ({ ...prev, dateRange: undefined }));
            }}
          />
        </Field>

        <Field
          label="Dependencies &amp; options"
          labelMode="optional"
          hint="Toggle checklist cards to include operational dependencies."
        >
          <OptionCardList
            values={dependencies}
            onToggle={handleDependencyToggle}
            disabled={disabled}
          />
        </Field>

        <div className="ds-service-config-form__actions">
          <DsButton
            variant="primary"
            size="base"
            label="Save configuration"
            htmlType="submit"
            disabled={disabled}
          />
          <DsButton
            variant="secondary"
            size="base"
            label="Cancel"
            disabled={disabled}
            onClick={handleCancel}
          />
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  labelMode,
  hint,
  error,
  children,
}: {
  label: string;
  labelMode: 'default' | 'required' | 'optional';
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-service-config-form__field">
      <span className="ds-service-config-form__label">
        <DsFormFieldLabel label={label} labelMode={labelMode} />
      </span>
      {hint ? <p className="ds-service-config-form__hint text-sm-normal">{hint}</p> : null}
      {children}
      {error ? (
        <p className="ds-service-config-form__field-error text-sm-normal" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default DsServiceAssetConfigForm;
