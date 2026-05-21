import type { Meta, StoryObj } from '@storybook/react';
import {
  DATA_COLOR_SECTIONS,
  SEMANTIC_COLOR_SECTIONS,
  type ColorSection,
} from '../src/token-color-catalog';
import { formatTokenDisplay } from '../src/token-display';
import {
  formatSizeLabel,
  RADIUS_TOKENS,
  SPACING_TOKENS,
  type SizeToken,
} from '../src/token-size-catalog';

const meta: Meta = {
  title: 'Foundation/Design Tokens',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const sectionStyle = {
  marginBottom: 32,
};

const headingStyle = {
  marginBottom: 16,
  fontSize: 20,
  fontWeight: 600,
};

const subheadingStyle = {
  marginBottom: 12,
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 12,
};

const pageStyle = {
  padding: 24,
  maxWidth: 1200,
};

function Swatch({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border-default, #d9d9d9)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div style={{ height: 56, background: `var(${cssVar})` }} />
      <div style={{ padding: 8, fontSize: 12 }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <code style={{ fontSize: 11, opacity: 0.7, wordBreak: 'break-all' }}>
          {formatTokenDisplay(cssVar)}
        </code>
      </div>
    </div>
  );
}

function ColorSectionBlock({ title, swatches }: ColorSection) {
  if (swatches.length === 0) return null;

  return (
    <section style={sectionStyle}>
      <h3 style={subheadingStyle}>{title}</h3>
      <div style={gridStyle}>
        {swatches.map((swatch) => (
          <Swatch key={swatch.cssVar} name={swatch.name} cssVar={swatch.cssVar} />
        ))}
      </div>
    </section>
  );
}

function ColorGroup({
  title,
  sections,
}: {
  title: string;
  sections: ColorSection[];
}) {
  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>{title}</h2>
      {sections.map((section) => (
        <ColorSectionBlock key={section.title} {...section} />
      ))}
    </section>
  );
}

function SpacingRow({ token }: { token: SizeToken }) {
  const label = formatSizeLabel(token.name, token.value);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <code style={{ width: 220, fontSize: 12 }}>{formatTokenDisplay(token.cssVar)}</code>
      <div
        style={{
          height: 24,
          width: `var(${token.cssVar})`,
          background: 'var(--color-primary-default)',
          borderRadius: 4,
        }}
      />
      <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{label}</span>
    </div>
  );
}

function RadiusRow({ token }: { token: SizeToken }) {
  const label = formatSizeLabel(token.name, token.value);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <code style={{ width: 220, fontSize: 12 }}>{formatTokenDisplay(token.cssVar)}</code>
      <div
        style={{
          width: 48,
          height: 48,
          flexShrink: 0,
          background: 'var(--color-primary-bg)',
          border: '2px solid var(--color-primary-default)',
          borderRadius: `var(${token.cssVar})`,
        }}
      />
      <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{label}</span>
    </div>
  );
}

function TypeSample({ className, label }: { className: string; label: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <code style={{ fontSize: 11, opacity: 0.6 }}>.{className}</code>
      <p className={className}>{label}</p>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div style={pageStyle}>
      <ColorGroup title="Semantic colours" sections={SEMANTIC_COLOR_SECTIONS} />
      <ColorGroup title="Data colours" sections={DATA_COLOR_SECTIONS} />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h2 style={headingStyle}>Spacing</h2>
      {SPACING_TOKENS.map((token) => (
        <SpacingRow key={token.cssVar} token={token} />
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h2 style={headingStyle}>Radius</h2>
      {RADIUS_TOKENS.map((token) => (
        <RadiusRow key={token.cssVar} token={token} />
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <h2 style={headingStyle}>Text styles (Figma)</h2>
      <TypeSample className="text-heading-1" label="Heading 1" />
      <TypeSample className="text-heading-2" label="Heading 2" />
      <TypeSample className="text-heading-3" label="Heading 3" />
      <TypeSample className="text-heading-4" label="Heading 4" />
      <TypeSample className="text-heading-5" label="Heading 5" />
      <TypeSample className="text-lg-normal" label="LG Normal" />
      <TypeSample className="text-base-normal" label="Base Normal" />
      <TypeSample className="text-sm-normal" label="SM Normal" />
      <TypeSample className="text-xs-normal" label="XS Normal" />
    </div>
  ),
};
