import type { DsTooltipChartData } from './component';

const DEFAULT_LEGEND_COLOR = 'var(--primitive-data-color-purple-2, #CAA2E7)';

export function DsTooltipChartContent({
  title = 'Label',
  description,
  legend,
  rows = [],
}: DsTooltipChartData) {
  return (
    <div className="ds-tooltip-chart">
      {(title || description) && (
        <div className="ds-tooltip-chart__heading">
          {title ? <p className="ds-tooltip-chart__title">{title}</p> : null}
          {description ? (
            <p className="ds-tooltip-chart__description">{description}</p>
          ) : null}
        </div>
      )}

      {(legend || rows.length > 0) && (
        <div className="ds-tooltip-chart__rows">
          {legend ? (
            <div className="ds-tooltip-chart__row ds-tooltip-chart__row--legend">
              <span className="ds-tooltip-chart__label">{legend.label}</span>
              <span className="ds-tooltip-chart__legend">
                <span
                  className="ds-tooltip-chart__swatch"
                  style={{ backgroundColor: legend.color ?? DEFAULT_LEGEND_COLOR }}
                  aria-hidden
                />
                <span className="ds-tooltip-chart__legend-name">{legend.name}</span>
              </span>
            </div>
          ) : null}

          {rows.map((row) => (
            <div key={`${row.label}-${row.value}`} className="ds-tooltip-chart__row">
              <span className="ds-tooltip-chart__label">{row.label}</span>
              <span className="ds-tooltip-chart__value">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
