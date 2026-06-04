import { DsIconInfoCircle } from '../../icons';
import { Collapse } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { FormEvent, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { DsButton } from '../../components/Button/component';
import { DsCheckbox } from '../../components/Checkbox/component';
import { DsDatePicker } from '../../components/DatePicker/component';
import { DsFormFieldLabel } from '../../components/Form/DsFormTextField';
import { DsInput } from '../../components/Input/component';
import { DsSelect } from '../../components/Select/component';
import { DsTag } from '../../components/Tag/component';
import '../../components/Button/component.css';
import '../../components/Checkbox/component.css';
import '../../components/DatePicker/component.css';
import '../../components/Form/component.css';
import '../../components/Input/component.css';
import '../../components/Select/component.css';
import '../../components/Tag/component.css';
import type {
  CustomConfigurationFormState,
  CustomConfigurationPayload,
  DefermentCounterRow,
} from './types';
import { TEXT_AREA_MAX } from './types';
import './component.css';

export interface CustomConfigurationFormProps {
  className?: string;
  disabled?: boolean;
  logPayloadOnSubmit?: boolean;
}

const SERVICEABILITY_OPTIONS = [
  { value: 'unserviceable', label: 'Unserviceable' },
  { value: 'serviceable', label: 'Serviceable' },
];

const AIRCRAFT_STATUS_OPTIONS = [
  { value: 'rect', label: 'RECT' },
  { value: 'add', label: 'ADD' },
];

const REPORTING_UNIT_OPTIONS = [
  { value: 'unit-a', label: 'Unit A' },
  { value: 'unit-b', label: 'Unit B' },
];

const FOUND_DURING_OPTIONS = [{ value: 'ata', label: 'ATA - XXXXX' }];

const MAINTENANCE_UNIT_OPTIONS = [
  { value: 'mu-1', label: 'Maintenance Unit 1' },
  { value: 'mu-2', label: 'Maintenance Unit 2' },
];

const WORK_CENTRE_OPTIONS = [
  { value: 'wc-1', label: 'Work Centre 1' },
  { value: 'wc-2', label: 'Work Centre 2' },
];

const TRADE_OPTIONS = [{ value: 'trade-1', label: 'Trade 1' }];

const ETR_EXTENSION_OPTIONS = [
  { value: 'others', label: 'Others' },
  { value: 'parts', label: 'Parts delay' },
];

const COUNTER_OPTIONS = [
  { value: 'AFH', label: 'AFH' },
  { value: 'AFL', label: 'AFL' },
];

const SAMPLE_DATETIME = dayjs('2024-03-27 15:00');
const SAMPLE_ETR = dayjs('2024-08-26 15:00');
const SAMPLE_DEFERMENT = dayjs('2024-09-27');

const DEFAULT_PROBLEM =
  'Fuel pump failed to deliver sufficient pressure, triggering a low-fuel pressure warning in the cockpit. Upon inspection, it was found that the primary fuel pump is either damaged or obstructed. This defect can lead to engine power loss mid';

function createInitialState(): CustomConfigurationFormState {
  return {
    serviceability: 'unserviceable',
    aircraftStatus: 'rect',
    usDateTime: SAMPLE_DATETIME,
    reportedBy: 'ME3 Marcus Tan',
    reportingUnit: undefined,
    problemDescription: DEFAULT_PROBLEM,
    foundDuring: 'ata',
    maintenanceUnit: undefined,
    workCentre: undefined,
    trade: 'trade-1',
    rectificationStart: SAMPLE_ETR,
    rectificationEnd: null,
    defectEtr: SAMPLE_ETR,
    etrExtensionReason: 'others',
    specifyReason: '',
    rectificationFlags: { fair: false, repeatRecur: false, srect: false },
    rectificationRemarksPsg: '',
    transferToAdd: true,
    transferToFlyingLog: true,
    transferToSortieMonitoring: true,
    periodOfDeferment: SAMPLE_DEFERMENT,
    demandNo: '',
    defermentCounters: [
      { id: '1', counter: 'AFH', due: '1000', current: '1000' },
    ],
    addRemarks: 'Upon earliest opportunity.',
    transferFlags: {
      projectRelated: true,
      incurLimitation: true,
      reportedInPsg: true,
    },
    limitation: 'Upon earliest opportunity.',
  };
}

function formatDateTime(value: Dayjs | null): string | null {
  return value ? value.format('YYYY-MM-DD HH:mm') : null;
}

function buildPayload(state: CustomConfigurationFormState): CustomConfigurationPayload {
  return {
    aircraft: {
      serviceability: state.serviceability,
      aircraftStatus: state.aircraftStatus,
      usDateTime: formatDateTime(state.usDateTime),
    },
    job: {
      reportedBy: state.reportedBy.trim(),
      reportingUnit: state.reportingUnit,
      problemDescription: state.problemDescription.trim(),
    },
    rectification: {
      foundDuring: state.foundDuring,
      maintenanceUnit: state.maintenanceUnit,
      workCentre: state.workCentre,
      trade: state.trade,
      rectificationStart: formatDateTime(state.rectificationStart),
      rectificationEnd: formatDateTime(state.rectificationEnd),
      defectEtr: formatDateTime(state.defectEtr),
      etrExtensionReason: state.etrExtensionReason,
      specifyReason: state.specifyReason.trim(),
      rectificationFlags: state.rectificationFlags,
      rectificationRemarksPsg: state.rectificationRemarksPsg.trim(),
    },
    transfer: {
      transferToAdd: state.transferToAdd,
      transferToFlyingLog: state.transferToFlyingLog,
      transferToSortieMonitoring: state.transferToSortieMonitoring,
      periodOfDeferment: state.periodOfDeferment
        ? state.periodOfDeferment.format('YYYY-MM-DD')
        : null,
      demandNo: state.demandNo.trim(),
      defermentCounters: state.defermentCounters,
      addRemarks: state.addRemarks.trim(),
      transferFlags: state.transferFlags,
      limitation: state.limitation.trim(),
    },
  };
}

function FieldLabel({
  label,
  labelMode = 'default',
  secondary,
}: {
  label: string;
  labelMode?: 'default' | 'required' | 'optional';
  secondary?: boolean;
}) {
  return (
    <span
      className={[
        'ds-custom-config-form__label',
        secondary ? 'ds-custom-config-form__label--secondary' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <DsFormFieldLabel label={label} labelMode={labelMode} />
    </span>
  );
}

function Field({
  label,
  labelMode,
  secondaryLabel,
  error,
  children,
}: {
  label: string;
  labelMode?: 'default' | 'required' | 'optional';
  secondaryLabel?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-custom-config-form__field">
      <FieldLabel label={label} labelMode={labelMode} secondary={secondaryLabel} />
      {children}
      {error ? (
        <p className="ds-custom-config-form__field-error text-sm-normal" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="ds-custom-config-form__field">
      <FieldLabel label={label} secondary />
      <span className="ds-custom-config-form__readonly text-base-normal">{value}</span>
    </div>
  );
}

function SectionRow({
  aside,
  children,
  wide,
}: {
  aside: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="ds-custom-config-form__section-row">
      <div className="ds-custom-config-form__section-aside">{aside}</div>
      <div
        className={[
          'ds-custom-config-form__section-fields',
          wide ? 'ds-custom-config-form__section-fields--wide' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>
  );
}

export function CustomConfigurationForm({
  className,
  disabled = false,
  logPayloadOnSubmit = true,
}: CustomConfigurationFormProps) {
  const [form, setForm] = useState<CustomConfigurationFormState>(createInitialState);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeCollapse, setActiveCollapse] = useState<string[]>(['transfer-add']);

  const patch = useCallback(
    <K extends keyof CustomConfigurationFormState>(
      key: K,
      value: CustomConfigurationFormState[K],
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const validate = useCallback((): string[] => {
    const next: string[] = [];
    if (!form.usDateTime) {
      next.push('US Date/Time is required.');
    }
    if (!form.reportedBy.trim()) {
      next.push('Reported By is required.');
    }
    if (!form.problemDescription.trim()) {
      next.push('Problem Description is required.');
    }
    if (form.etrExtensionReason === 'others' && !form.specifyReason.trim()) {
      next.push('Please specify reason when ETR Extension Reason is Others.');
    }
    return next;
  }, [form]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (validationErrors.length > 0) {
      return;
    }
    const payload = buildPayload(form);
    if (logPayloadOnSubmit) {
      console.log('[CustomConfigurationForm] submit', payload);
    }
  };

  const handleDiscard = () => {
    setForm(createInitialState());
    setErrors([]);
    setActiveCollapse(['transfer-add']);
  };

  const handleSaveAircraft = () => {
    console.log('[CustomConfigurationForm] save aircraft', {
      serviceability: form.serviceability,
      aircraftStatus: form.aircraftStatus,
      usDateTime: formatDateTime(form.usDateTime),
    });
  };

  const updateCounter = (id: string, updates: Partial<DefermentCounterRow>) => {
    setForm((prev) => ({
      ...prev,
      defermentCounters: prev.defermentCounters.map((row) =>
        row.id === id ? { ...row, ...updates } : row,
      ),
    }));
  };

  const addCounter = () => {
    setForm((prev) => ({
      ...prev,
      defermentCounters: [
        ...prev.defermentCounters,
        {
          id: String(Date.now()),
          counter: 'AFH',
          due: '',
          current: '',
        },
      ],
    }));
  };

  const removeCounter = (id: string) => {
    setForm((prev) => ({
      ...prev,
      defermentCounters: prev.defermentCounters.filter((row) => row.id !== id),
    }));
  };

  const collapseItems = useMemo(() => {
    const items: { key: string; label: string; enabled: boolean; children: ReactNode }[] = [
      {
        key: 'transfer-add',
        label: 'Transfer to ADD',
        enabled: form.transferToAdd,
        children: (
          <div className="ds-custom-config-form__collapse-body">
            <div className="ds-custom-config-form__grid-3">
              <Field label="Period of Deferment">
                <DsDatePicker
                  size="base"
                  picker="date"
                  disabled={disabled}
                  value={form.periodOfDeferment}
                  onChange={(value) => patch('periodOfDeferment', value as Dayjs | null)}
                />
              </Field>
              <Field label="Demand No.">
                <DsInput
                  kind="basic"
                  size="base"
                  placeholder="Type here"
                  disabled={disabled}
                  value={form.demandNo}
                  onChange={(value) => patch('demandNo', value)}
                />
              </Field>
              <ReadonlyField label="Initial ADD Date" value="—" />
            </div>

            <h4 className="ds-custom-config-form__subsection-title text-base-normal">
              Period of Deferment by other counters
            </h4>
            <div className="ds-custom-config-form__counter-table">
              <div className="ds-custom-config-form__counter-head">
                <span>Counters</span>
                <span>Due</span>
                <span>Current</span>
                <span>Action</span>
              </div>
              {form.defermentCounters.map((row) => (
                <div key={row.id} className="ds-custom-config-form__counter-row">
                  <DsSelect
                    variant="basic"
                    size="base"
                    disabled={disabled}
                    value={row.counter}
                    options={COUNTER_OPTIONS}
                    onChange={(value) =>
                      updateCounter(row.id, { counter: String(value ?? '') })
                    }
                  />
                  <DsInput
                    kind="basic"
                    size="base"
                    disabled={disabled}
                    value={row.due}
                    onChange={(value) => updateCounter(row.id, { due: value })}
                  />
                  <span className="ds-custom-config-form__readonly text-base-normal">
                    {row.current || '—'}
                  </span>
                  <button
                    type="button"
                    className="ds-custom-config-form__link-action"
                    disabled={disabled || form.defermentCounters.length <= 1}
                    onClick={() => removeCounter(row.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="ds-custom-config-form__counter-actions">
              <DsButton
                variant="secondary"
                size="small"
                label="Add counter"
                disabled={disabled}
                onClick={addCounter}
              />
            </div>

            <Field label="ADD Remarks">
              <DsInput
                kind="textarea"
                size="base"
                rows={4}
                showCount
                maxLength={TEXT_AREA_MAX}
                disabled={disabled}
                value={form.addRemarks}
                onChange={(value) => patch('addRemarks', value)}
              />
            </Field>

            <div className="ds-custom-config-form__choice-row">
              <DsCheckbox
                checked={form.transferFlags.projectRelated}
                disabled={disabled}
                label="Project Related"
                onChange={(e) =>
                  patch('transferFlags', {
                    ...form.transferFlags,
                    projectRelated: e.target.checked,
                  })
                }
              />
              <DsCheckbox
                checked={form.transferFlags.incurLimitation}
                disabled={disabled}
                label="Incur Limitation"
                onChange={(e) =>
                  patch('transferFlags', {
                    ...form.transferFlags,
                    incurLimitation: e.target.checked,
                  })
                }
              />
              <DsCheckbox
                checked={form.transferFlags.reportedInPsg}
                disabled={disabled}
                label="Reported in PSG"
                onChange={(e) =>
                  patch('transferFlags', {
                    ...form.transferFlags,
                    reportedInPsg: e.target.checked,
                  })
                }
              />
            </div>

            <Field label="Limitation">
              <DsInput
                kind="textarea"
                size="base"
                rows={4}
                showCount
                maxLength={TEXT_AREA_MAX}
                disabled={disabled}
                value={form.limitation}
                onChange={(value) => patch('limitation', value)}
              />
            </Field>
          </div>
        ),
      },
      {
        key: 'transfer-flying',
        label: 'Transfer to Flying Log',
        enabled: form.transferToFlyingLog,
        children: (
          <p className="ds-custom-config-form__remarks-static text-sm-normal">
            Flying log transfer fields — expand when integrating backend.
          </p>
        ),
      },
      {
        key: 'transfer-sortie',
        label: 'Transfer to Sortie Monitoring',
        enabled: form.transferToSortieMonitoring,
        children: (
          <p className="ds-custom-config-form__remarks-static text-sm-normal">
            Sortie monitoring transfer fields — expand when integrating backend.
          </p>
        ),
      },
    ];

    return items
      .filter((item) => item.enabled)
      .map(({ key, label, children }) => ({
        key,
        label,
        children,
      }));
  }, [disabled, form, patch, updateCounter, addCounter, removeCounter]);

  const rootClass = ['ds-custom-config-form', className].filter(Boolean).join(' ');

  return (
    <form className={rootClass} onSubmit={handleSubmit} noValidate>
      <div className="ds-custom-config-form__stack">
        {errors.length > 0 ? (
          <div className="ds-custom-config-form__alert" role="alert">
            <strong className="text-sm-normal">Please fix the following:</strong>
            <ul className="ds-custom-config-form__alert-list text-sm-normal">
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* —— Current Aircraft Details (22737:17234) —— */}
        <section className="ds-custom-config-form__card ds-custom-config-form__card--aircraft">
          <div className="ds-custom-config-form__card-body">
            <SectionRow
              aside={
                <>
                  <h2 className="ds-custom-config-form__section-title text-base-normal">
                    Current Aircraft Details
                  </h2>
                  <div className="ds-custom-config-form__saved-row">
                    <DsTag status="success">Saved</DsTag>
                  </div>
                </>
              }
            >
              <div className="ds-custom-config-form__grid-3">
                <ReadonlyField label="Tail No." value="987" />
                <Field label="Serviceability">
                  <DsSelect
                    variant="basic"
                    size="base"
                    disabled={disabled}
                    value={form.serviceability}
                    options={SERVICEABILITY_OPTIONS}
                    onChange={(value) => patch('serviceability', String(value ?? ''))}
                  />
                </Field>
                <Field label="Aircraft Status">
                  <DsSelect
                    variant="basic"
                    size="base"
                    disabled={disabled}
                    value={form.aircraftStatus}
                    options={AIRCRAFT_STATUS_OPTIONS}
                    onChange={(value) => patch('aircraftStatus', String(value ?? ''))}
                  />
                </Field>
              </div>
              <div className="ds-custom-config-form__grid-3">
                <ReadonlyField label="Aircraft ETR" value="26/08/2024, 15:00" />
                <Field label="US Date/Time" labelMode="required">
                  <DsDatePicker
                    size="base"
                    picker="date"
                    showTime
                    disabled={disabled}
                    value={form.usDateTime}
                    onChange={(value) => patch('usDateTime', value as Dayjs | null)}
                  />
                </Field>
              </div>
            </SectionRow>
          </div>
          <DsButton
            variant="secondary"
            size="small"
            label="Save details"
            disabled={disabled}
            onClick={handleSaveAircraft}
          />
        </section>

        {/* —— Main defect form (22737:17250) —— */}
        <section className="ds-custom-config-form__card">
          <div className="ds-custom-config-form__stack">
            {/* Job Details */}
            <SectionRow
              aside={
                <>
                  <h2 className="ds-custom-config-form__section-title text-base-normal">
                    Job Details
                  </h2>
                  <p className="ds-custom-config-form__section-subtitle text-sm-normal">
                    All fields marked with (
                    <span className="ds-custom-config-form__section-subtitle-required">*</span>
                    ) are mandatory
                  </p>
                </>
              }
            >
              <ReadonlyField label="Job ID" value="—" />
              <div className="ds-custom-config-form__grid-3">
                <Field label="Reported By" labelMode="required">
                  <DsInput
                    kind="basic"
                    size="base"
                    disabled={disabled}
                    value={form.reportedBy}
                    onChange={(value) => patch('reportedBy', value)}
                  />
                </Field>
                <Field label="Reporting Unit">
                  <DsSelect
                    variant="basic"
                    size="base"
                    placeholder="Select"
                    disabled={disabled}
                    value={form.reportingUnit}
                    options={REPORTING_UNIT_OPTIONS}
                    onChange={(value) =>
                      patch('reportingUnit', value as string | undefined)
                    }
                  />
                </Field>
              </div>
              <Field label="Problem Description">
                <DsInput
                  kind="textarea"
                  size="base"
                  rows={4}
                  showCount
                  maxLength={TEXT_AREA_MAX}
                  disabled={disabled}
                  value={form.problemDescription}
                  onChange={(value) => patch('problemDescription', value)}
                />
              </Field>
            </SectionRow>

            <hr className="ds-custom-config-form__divider" />

            {/* Rectification Details */}
            <SectionRow
              aside={
                <h2 className="ds-custom-config-form__section-title text-base-normal">
                  Rectification Details
                </h2>
              }
            >
              <div className="ds-custom-config-form__grid-3">
                <Field label="Found During">
                  <DsSelect
                    variant="basic"
                    size="base"
                    disabled={disabled}
                    value={form.foundDuring}
                    options={FOUND_DURING_OPTIONS}
                    onChange={(value) => patch('foundDuring', String(value ?? ''))}
                  />
                </Field>
                <Field label="Maintenance Unit">
                  <DsSelect
                    variant="basic"
                    size="base"
                    placeholder="Select"
                    disabled={disabled}
                    value={form.maintenanceUnit}
                    options={MAINTENANCE_UNIT_OPTIONS}
                    onChange={(value) =>
                      patch('maintenanceUnit', value as string | undefined)
                    }
                  />
                </Field>
                <Field label="Work Centre">
                  <DsSelect
                    variant="basic"
                    size="base"
                    placeholder="Select"
                    disabled={disabled}
                    value={form.workCentre}
                    options={WORK_CENTRE_OPTIONS}
                    onChange={(value) => patch('workCentre', value as string | undefined)}
                  />
                </Field>
              </div>

              <div className="ds-custom-config-form__grid-1-3">
                <Field label="Trade">
                  <DsSelect
                    variant="basic"
                    size="base"
                    disabled={disabled}
                    value={form.trade}
                    options={TRADE_OPTIONS}
                    onChange={(value) => patch('trade', String(value ?? ''))}
                  />
                </Field>
              </div>

              <div className="ds-custom-config-form__grid-3">
                <Field label="Rectification Start Date/Time">
                  <DsDatePicker
                    size="base"
                    picker="date"
                    showTime
                    disabled={disabled}
                    value={form.rectificationStart}
                    onChange={(value) =>
                      patch('rectificationStart', value as Dayjs | null)
                    }
                  />
                </Field>
                <Field label="Rectification End Date/Time">
                  <DsDatePicker
                    size="base"
                    picker="date"
                    showTime
                    disabled={disabled}
                    value={form.rectificationEnd}
                    onChange={(value) => patch('rectificationEnd', value as Dayjs | null)}
                  />
                </Field>
                <div className="ds-custom-config-form__fix-rate">
                  <FieldLabel label="Fix Rate" />
                  <DsIconInfoCircle
                    aria-hidden
                    style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }}
                  />
                  <span className="ds-custom-config-form__fix-rate-value text-base-normal">
                    NA
                  </span>
                </div>
              </div>

              <div className="ds-custom-config-form__grid-3">
                <Field label="Defect ETR">
                  <DsDatePicker
                    size="base"
                    picker="date"
                    showTime
                    disabled={disabled}
                    value={form.defectEtr}
                    onChange={(value) => patch('defectEtr', value as Dayjs | null)}
                  />
                </Field>
                <Field label="ETR Extension Reason">
                  <DsSelect
                    variant="basic"
                    size="base"
                    disabled={disabled}
                    value={form.etrExtensionReason}
                    options={ETR_EXTENSION_OPTIONS}
                    onChange={(value) => patch('etrExtensionReason', String(value ?? ''))}
                  />
                </Field>
                <div className="ds-custom-config-form__field">
                  <span className="ds-custom-config-form__label" aria-hidden>
                    &nbsp;
                  </span>
                  <DsButton
                    variant="secondary"
                    size="small"
                    label="View Previous ETR"
                    disabled={disabled}
                  />
                </div>
              </div>

              <Field label="Please specify reason" labelMode="required">
                <DsInput
                  kind="textarea"
                  size="base"
                  rows={3}
                  showCount
                  maxLength={TEXT_AREA_MAX}
                  disabled={disabled}
                  value={form.specifyReason}
                  onChange={(value) => patch('specifyReason', value)}
                />
              </Field>

              <div className="ds-custom-config-form__choice-row">
                <DsCheckbox
                  checked={form.rectificationFlags.fair}
                  disabled={disabled}
                  label="FAIR"
                  onChange={(e) =>
                    patch('rectificationFlags', {
                      ...form.rectificationFlags,
                      fair: e.target.checked,
                    })
                  }
                />
                <DsCheckbox
                  checked={form.rectificationFlags.repeatRecur}
                  disabled={disabled}
                  label="Repeat & Recur"
                  onChange={(e) =>
                    patch('rectificationFlags', {
                      ...form.rectificationFlags,
                      repeatRecur: e.target.checked,
                    })
                  }
                />
                <DsCheckbox
                  checked={form.rectificationFlags.srect}
                  disabled={disabled}
                  label="SRECT"
                  onChange={(e) =>
                    patch('rectificationFlags', {
                      ...form.rectificationFlags,
                      srect: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="ds-custom-config-form__remarks-block">
                <FieldLabel label="Rectification Remarks (AvMET)" secondary />
                <p className="ds-custom-config-form__remarks-static text-base-normal">
                  Rectification remarks here
                </p>
                <DsButton
                  variant="secondary"
                  size="small"
                  label="View Task List"
                  disabled={disabled}
                />
              </div>

              <Field label="Rectification Remarks (PSG)">
                <DsInput
                  kind="textarea"
                  size="base"
                  rows={4}
                  showCount
                  maxLength={TEXT_AREA_MAX}
                  placeholder="Remarks from summarising rectification (AvMET) for PSG reporting"
                  disabled={disabled}
                  value={form.rectificationRemarksPsg}
                  onChange={(value) => patch('rectificationRemarksPsg', value)}
                />
              </Field>
            </SectionRow>

            <hr className="ds-custom-config-form__divider" />

            {/* Transferring Job */}
            <SectionRow
              wide
              aside={
                <h2 className="ds-custom-config-form__section-title text-base-normal">
                  Transferring Job
                </h2>
              }
            >
              <div className="ds-custom-config-form__transfer-checks">
                <DsCheckbox
                  checked={form.transferToAdd}
                  disabled={disabled}
                  label="Transfer to ADD"
                  onChange={(e) => patch('transferToAdd', e.target.checked)}
                />
                <DsCheckbox
                  checked={form.transferToFlyingLog}
                  disabled={disabled}
                  label="Transfer to Flying Log"
                  onChange={(e) => patch('transferToFlyingLog', e.target.checked)}
                />
                <DsCheckbox
                  checked={form.transferToSortieMonitoring}
                  disabled={disabled}
                  label="Transfer to Sortie Monitoring"
                  onChange={(e) => patch('transferToSortieMonitoring', e.target.checked)}
                />
              </div>

              <Collapse
                className="ds-custom-config-form__collapse"
                activeKey={activeCollapse}
                onChange={(keys) =>
                  setActiveCollapse(Array.isArray(keys) ? keys : [String(keys)])
                }
                items={collapseItems}
              />
            </SectionRow>
          </div>

          <footer className="ds-custom-config-form__footer">
            <DsButton
              variant="secondary"
              size="base"
              label="Discard changes"
              disabled={disabled}
              onClick={handleDiscard}
            />
            <DsButton
              variant="primary"
              size="base"
              label="Save job"
              htmlType="submit"
              disabled={disabled}
            />
          </footer>
        </section>
      </div>
    </form>
  );
}

export default CustomConfigurationForm;
