import type { ReactNode } from 'react';
import { DsAppShell, type DsAppShellProps } from '../AppShell/component';
import '../AppShell/component.css';
import './component.css';

export type DsPageTemplateVariant = 'blank' | 'form' | 'dashboard';

export const DS_PAGE_TEMPLATE_VARIANTS: DsPageTemplateVariant[] = [
  'blank',
  'form',
  'dashboard',
];

export interface DsPageTemplateProps
  extends Pick<DsAppShellProps, 'productName' | 'showSidebar' | 'headerExtra'> {
  variant?: DsPageTemplateVariant;
  pageTitle?: string;
  pageDescription?: string;
  /** Slot for form pages and custom content */
  children?: ReactNode;
  className?: string;
}

const DASHBOARD_WIDGETS = [
  { title: 'Statistics', body: 'Metric / stats block placeholder' },
  { title: 'Activity', body: 'List or chart placeholder' },
  { title: 'Help Center', body: 'Help content card placeholder' },
];

function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="ds-page-template__header">
      <h2 className="ds-page-template__title text-heading-4">{title}</h2>
      {description ? (
        <p className="ds-page-template__description text-sm-normal">{description}</p>
      ) : null}
    </header>
  );
}

function BlankBody() {
  return (
    <div className="ds-page-template__placeholder text-sm-normal">
      Page content slot — compose components from the library here.
    </div>
  );
}

function DashboardBody() {
  return (
    <>
      <div className="ds-page-template__toolbar">
        <span className="text-sm-normal">Filter criteria placeholder</span>
        <span className="text-sm-normal">Actions</span>
      </div>
      <div className="ds-page-template__grid">
        {DASHBOARD_WIDGETS.map((widget) => (
          <section key={widget.title} className="ds-page-template__widget">
            <h3 className="ds-page-template__widget-title text-base-normal">
              {widget.title}
            </h3>
            <p className="ds-page-template__widget-body text-sm-normal">{widget.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}

export function DsPageTemplate({
  variant = 'blank',
  pageTitle = 'Page title',
  pageDescription,
  children,
  productName,
  showSidebar = true,
  headerExtra,
  className,
}: DsPageTemplateProps) {
  const description =
    pageDescription ??
    (variant === 'blank'
      ? 'Empty canvas for implementing screens from Figma via Storybook reference.'
      : variant === 'dashboard'
        ? 'Dashboard layout with filter strip and widget tiles.'
        : undefined);

  const body =
    variant === 'dashboard' ? (
      <DashboardBody />
    ) : variant === 'form' ? (
      <div
        className={[
          'ds-page-template__body',
          children ? 'ds-page-template__body--centered' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children ?? (
          <div className="ds-page-template__placeholder text-sm-normal">
            Form content slot
          </div>
        )}
      </div>
    ) : (
      <div className="ds-page-template__body">{children ?? <BlankBody />}</div>
    );

  return (
    <DsAppShell
      productName={productName}
      showSidebar={showSidebar}
      headerExtra={headerExtra}
      className={className}
    >
      <div className="ds-page-template">
        <PageHeader title={pageTitle} description={description} />
        {body}
      </div>
    </DsAppShell>
  );
}

export default DsPageTemplate;
