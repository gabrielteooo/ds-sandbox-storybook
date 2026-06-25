import { Divider } from 'antd';
import { useState, type ReactNode } from 'react';
import { DsButton } from '../../components/Button/component';
import { DsCheckbox } from '../../components/Checkbox/component';
import { DsForm, FormThemeProvider, FormVertical } from '../../components/Form';
import { DsNavigationMenu } from '../../components/NavigationMenu';
import '../../components/Button/component.css';
import '../../components/Checkbox/component.css';
import '../../components/DatePicker/component.css';
import '../../components/Form/component.css';
import '../../components/Input/component.css';
import '../../components/NavigationMenu/component.css';
import '../../components/Select/component.css';
import { NIMBUS_NAV_ITEMS } from './navItems';
import './component.css';

const AVMET_READONLY_TEXT =
  'Aircraft returned to service following rectification of defect. All mandatory checks completed per approved maintenance programme.';

function FieldRow({
  children,
  alignEnd = false,
}: {
  children: ReactNode;
  alignEnd?: boolean;
}) {
  return (
    <div
      className={[
        'nimbus-page__field-row',
        alignEnd ? 'nimbus-page__field-row--align-end' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

function SectionBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="nimbus-page__section-row">
      <div className="nimbus-page__section-title">
        <h2 className="text-base-strong">{title}</h2>
        {subtitle}
      </div>
      <div className="nimbus-page__fields">{children}</div>
    </div>
  );
}

export function DsNimbusProductionPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="nimbus-page">
      <DsNavigationMenu
        items={NIMBUS_NAV_ITEMS}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        defaultSelectedKeys={['production-management']}
        defaultOpenKeys={['nimbus']}
        logoLabel="Fleet Management System"
        showSearch
        searchPlaceholder="Search"
      />

      <div className="nimbus-page__main">
        <FormThemeProvider>
          <div className="nimbus-page__content">
            {/* Current Aircraft Details */}
            <section className="nimbus-page__card nimbus-page__card--aircraft">
              <SectionBlock title="Current Aircraft Details">
                <FieldRow>
                  <FormVertical
                    type="Read-only"
                    label="Tail"
                    mark="required"
                    readonlyText="987"
                  />
                  <FormVertical type="Select" label="Input Label" mark="optional" />
                  <FormVertical type="Select" label="Input Label" mark="optional" />
                </FieldRow>
                <FieldRow>
                  <FormVertical
                    type="Read-only"
                    label="ETR"
                    mark="required"
                    readonlyText="09/09/26, 15:00"
                  />
                  <FormVertical type="DatePicker" label="Input Label" mark="optional" />
                  <FormVertical type="Select" label="Input Label" mark="optional" />
                </FieldRow>
              </SectionBlock>
              <DsButton
                variant="secondary"
                size="small"
                label="Save details"
                onClick={() => console.log('Save aircraft details')}
              />
            </section>

            {/* Main defect form */}
            <section className="nimbus-page__card">
              <p className="nimbus-page__status-banner text-sm-normal">
                Last updated by Marcus Tan on 29 Sep, 15:00
              </p>

              <div className="nimbus-page__main-form">
                <DsForm
                  name="nimbus-job-form"
                  layout="vertical"
                  className="ds-form--labeled"
                  requiredMark={false}
                >
                  <SectionBlock
                    title="Job Details"
                    subtitle={
                      <p className="text-sm-normal">
                        All fields marked with (
                        <span className="nimbus-page__required">*</span>) are mandatory
                      </p>
                    }
                  >
                    <FieldRow>
                      <FormVertical
                        type="Read-only"
                        label="Job ID"
                        mark="required"
                        readonlyText="-"
                      />
                    </FieldRow>
                    <FieldRow>
                      <FormVertical
                        type="Text"
                        label="Input Label"
                        mark="optional"
                        showTooltip
                      />
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                      <FormVertical type="DatePicker" label="Input Label" mark="optional" />
                    </FieldRow>
                    <FormVertical
                      type="Textarea"
                      label="Input Label"
                      mark="optional"
                      showTooltip
                      caption="Characters remaining: 2000"
                    />
                  </SectionBlock>

                  <Divider className="nimbus-page__divider" />

                  <SectionBlock title="Rectification Details">
                    <FieldRow>
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                    </FieldRow>
                    <FieldRow>
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                    </FieldRow>
                    <FieldRow>
                      <FormVertical type="DatePicker" label="Input Label" mark="optional" />
                      <FormVertical type="DatePicker" label="Input Label" mark="optional" />
                      <FormVertical
                        type="Read-only"
                        label="Input Label"
                        mark="optional"
                        readonlyText="Read-only text"
                      />
                    </FieldRow>
                    <FieldRow alignEnd>
                      <FormVertical type="DatePicker" label="Input Label" mark="optional" />
                      <FormVertical type="Select" label="Input Label" mark="optional" />
                      <div className="nimbus-page__button-slot">
                        <DsButton
                          variant="secondary"
                          size="small"
                          label="View Previous ETR"
                          onClick={() => console.log('View Previous ETR')}
                        />
                      </div>
                    </FieldRow>
                    <FormVertical
                      type="Textarea"
                      label="Input Label"
                      mark="optional"
                      showTooltip
                      caption="Characters remaining: 2000"
                    />
                    <div className="nimbus-page__checkbox-row">
                      <DsCheckbox label="FAIR" />
                      <DsCheckbox label="Repeat & Recur" />
                      <DsCheckbox label="SRECT" />
                    </div>
                    <div className="nimbus-page__fields">
                      <FormVertical
                        type="Read-only"
                        label="Rectification Remarks (AvMET)"
                        mark="none"
                        showTooltip
                        readonlyText={AVMET_READONLY_TEXT}
                      />
                      <DsButton
                        variant="secondary"
                        size="small"
                        label="View Previous ETR"
                        onClick={() => console.log('View Previous ETR')}
                      />
                    </div>
                    <FormVertical
                      type="Textarea"
                      label="Input Label"
                      mark="optional"
                      showTooltip
                      caption="Characters remaining: 2000"
                    />
                  </SectionBlock>
                </DsForm>
              </div>
            </section>
          </div>
        </FormThemeProvider>
      </div>
    </div>
  );
}
