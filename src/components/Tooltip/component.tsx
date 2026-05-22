import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import type { ReactElement, ReactNode } from 'react';
import { DsTooltipChartContent } from './DsTooltipChartContent';
import { TooltipThemeProvider } from './TooltipThemeProvider';
import './component.css';

/** Figma Tooltip types — Description (plain text) · Chart (structured data). */
export type DsTooltipVariant = 'description' | 'chart';

export const DS_TOOLTIP_VARIANTS: DsTooltipVariant[] = ['description', 'chart'];

export interface DsTooltipChartLegend {
  label: string;
  name: string;
  color?: string;
}

export interface DsTooltipChartRow {
  label: string;
  value: string;
}

export interface DsTooltipChartData {
  title?: string;
  description?: string;
  legend?: DsTooltipChartLegend;
  rows?: DsTooltipChartRow[];
}

export interface DsTooltipProps extends Omit<TooltipProps, 'title' | 'overlayClassName'> {
  variant?: DsTooltipVariant;
  /** Plain tooltip copy (description variant). */
  content?: ReactNode;
  /** Structured chart tooltip body (chart variant). */
  chart?: DsTooltipChartData;
  overlayClassName?: string;
}

function overlayClass(
  variant: DsTooltipVariant,
  overlayClassName?: string,
) {
  return ['ds-tooltip', `ds-tooltip--${variant}`, overlayClassName].filter(Boolean).join(' ');
}

function resolveTitle(
  variant: DsTooltipVariant,
  content?: ReactNode,
  chart?: DsTooltipChartData,
): ReactNode {
  if (variant === 'chart' && chart) {
    return <DsTooltipChartContent {...chart} />;
  }

  return content;
}

export function DsTooltip({
  variant = 'description',
  content,
  chart,
  children,
  overlayClassName,
  placement = 'top',
  arrow: arrowProp = true,
  ...rest
}: DsTooltipProps): ReactElement {
  const title = resolveTitle(variant, content, chart);
  const arrow =
    variant === 'description' && arrowProp === true
      ? { pointAtCenter: true }
      : arrowProp;

  return (
    <TooltipThemeProvider>
      <Tooltip
        title={title}
        placement={placement}
        arrow={arrow}
        overlayClassName={overlayClass(variant, overlayClassName)}
        {...rest}
      >
        {children}
      </Tooltip>
    </TooltipThemeProvider>
  );
}

DsTooltip.displayName = 'DsTooltip';
