import type { Meta, StoryObj } from '@storybook/react';
import {
  DsIcon,
  FA_REGULAR_CATALOG,
  FA_SOLID_CATALOG,
  ICON_STATUS_TOKENS,
  type FaIconName,
  type IconStatus,
} from '../../src/icons';

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '**Font Awesome 6 Pro** (`fa-regular`, `fa-solid`) — icon colour `color/Icon/default` (#0000008c). Figma: [Icon](https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=472-11122).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const pageStyle = {
  padding: 24,
  maxWidth: 1200,
};

const sectionStyle = { marginBottom: 32 };

const headingStyle = {
  marginBottom: 8,
  fontSize: 20,
  fontWeight: 600,
};

const subheadingStyle = {
  marginBottom: 12,
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
};

const noteStyle = {
  marginBottom: 16,
  fontSize: 14,
  color: 'var(--color-icon-default, rgba(0, 0, 0, 0.55))',
  maxWidth: 720,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 16,
};

function IconCell({
  name,
  variant,
  label,
  antDesign,
  status,
}: {
  name: FaIconName;
  variant: 'regular' | 'solid';
  label: string;
  antDesign?: string;
  status?: IconStatus;
}) {
  const statusClass = status ? `ds-icon--status-${status}` : undefined;
  const statusToken = status ? ICON_STATUS_TOKENS[status] : undefined;

  return (
    <div
      style={{
        border: '1px solid var(--component-card-border-default, #f0f0f0)',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        background: 'var(--color-bg-container, #fff)',
      }}
    >
      <DsIcon name={name} variant={variant} size={24} className={statusClass} />
      <span className="text-sm-normal" style={{ fontWeight: 600, textAlign: 'center' }}>
        {label}
      </span>
      <code style={{ fontSize: 11, opacity: 0.7 }}>fa-{name}</code>
      {statusToken ? (
        <code style={{ fontSize: 10, opacity: 0.65, textAlign: 'center', wordBreak: 'break-all' }}>
          {statusToken}
        </code>
      ) : null}
      {antDesign ? (
        <span className="text-sm-normal" style={{ fontSize: 11, opacity: 0.55 }}>
          was {antDesign}
        </span>
      ) : null}
    </div>
  );
}

const STATUS_ICONS = FA_SOLID_CATALOG.filter(
  (entry): entry is typeof entry & { status: IconStatus } =>
    entry.status === 'info' ||
    entry.status === 'success' ||
    entry.status === 'warning' ||
    entry.status === 'error',
);

/** Regular + solid catalogs used across MCP DS components. */
export const Catalog: Story = {
  render: () => (
    <div style={pageStyle}>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Font Awesome 6 Pro</h2>
        <p style={noteStyle}>
          Default UI icon colour: <code>--color-icon-default</code> (
          <code>#0000008c</code>, 55% black). Hover: <code>--color-icon-hover</code>. Status icons
          use <code>--color-system-*</code> tokens (see below); primary actions use{' '}
          <code>--color-primary-default</code>.
        </p>
      </section>

      <section style={sectionStyle}>
        <h3 style={subheadingStyle}>System status colours</h3>
        <p style={noteStyle}>
          Alert semantic icons — aligned with <code>DsAlert</code>, <code>DsTag</code>, and{' '}
          <code>tokens.css</code> system palette.
        </p>
        <div style={gridStyle}>
          {STATUS_ICONS.map((entry) => (
            <IconCell
              key={entry.name}
              name={entry.name}
              variant="solid"
              label={entry.label}
              status={entry.status}
              antDesign={entry.antDesign}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h3 style={subheadingStyle}>Regular ({FA_REGULAR_CATALOG.length})</h3>
        <div style={gridStyle}>
          {FA_REGULAR_CATALOG.map((entry) => (
            <IconCell
              key={entry.name}
              name={entry.name}
              variant="regular"
              label={entry.label}
              antDesign={entry.antDesign}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h3 style={subheadingStyle}>Solid ({FA_SOLID_CATALOG.length})</h3>
        <div style={gridStyle}>
          {FA_SOLID_CATALOG.map((entry) => (
            <IconCell
              key={entry.name}
              name={entry.name}
              variant="solid"
              label={entry.label}
              status={entry.status}
              antDesign={entry.antDesign}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h3 style={subheadingStyle}>In context (Ant controls)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <button
            type="button"
            className="text-base-normal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              border: '1px solid var(--color-border-default)',
              borderRadius: 8,
              background: 'var(--color-bg-container)',
            }}
          >
            <DsIcon name="magnifying-glass" />
            Search
          </button>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              border: '1px solid var(--color-border-default)',
              borderRadius: 8,
            }}
          >
            <DsIcon name="calendar" />
            DD/MM/YYYY
          </span>
          <DsIcon name="user" size={32} />
        </div>
      </section>
    </div>
  ),
};
