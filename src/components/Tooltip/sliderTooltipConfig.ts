import type { SliderTooltipProps } from 'antd/es/slider';

/** Root classes applied to Slider handle tooltips — matches DsTooltip description variant. */
export const DS_SLIDER_TOOLTIP_ROOT_CLASS = 'ds-tooltip ds-tooltip--description';

/** Merge user slider tooltip props with DsTooltip description styling defaults. */
export function mergeDsSliderTooltipProps(
  tooltip?: SliderTooltipProps,
): SliderTooltipProps {
  const { rootClassName, arrow, ...rest } = tooltip ?? {};

  return {
    placement: 'top',
    ...rest,
    arrow: arrow ?? { pointAtCenter: true },
    rootClassName: [DS_SLIDER_TOOLTIP_ROOT_CLASS, rootClassName].filter(Boolean).join(' '),
  };
}
