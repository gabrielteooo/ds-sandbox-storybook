import { DsIconInfoCircle } from '../../src/icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { DsTooltipChartData, DsTooltipProps } from '../../src/components/Tooltip';
import { DsTooltip, DS_TOOLTIP_VARIANTS } from '../../src/components/Tooltip';
import './component.stories.css';

const FIGMA = {
  canvas: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=413-12782',
  description: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=4734-86634',
  chart: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=413-13152',
} as const;

const FRUIT_SHOP_CATEGORY = 'Fruit Shop';

function fruitShopChart(
  fruit: string,
  color: string,
  quantity: number,
  percentage: number,
): DsTooltipChartData {
  return {
    title: FRUIT_SHOP_CATEGORY,
    legend: { label: 'Fruit:', name: fruit, color },
    rows: [
      { label: 'Quantity:', value: String(quantity) },
      { label: 'Percentage:', value: `${percentage}%` },
    ],
  };
}

const BAR_SEGMENTS = [
  {
    key: 'banana',
    label: 'Banana',
    width: '40%',
    color: 'var(--primitive-data-color-yellow-3)',
    chart: fruitShopChart('Banana', 'var(--primitive-data-color-yellow-3)', 120, 40),
  },
  {
    key: 'apple',
    label: 'Apple',
    width: '35%',
    color: 'var(--primitive-data-color-red-4)',
    chart: fruitShopChart('Apple', 'var(--primitive-data-color-red-4)', 105, 35),
  },
  {
    key: 'orange',
    label: 'Orange',
    width: '25%',
    color: 'var(--primitive-data-color-orange-3)',
    chart: fruitShopChart('Orange', 'var(--primitive-data-color-orange-3)', 75, 25),
  },
] as const;

const meta: Meta<DsTooltipProps> = {
  title: 'Components/Tooltip',
  component: DsTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Tooltip** — Ant Design Tooltip with Figma dark container (#535353), description and chart variants.',
      },
    },
    design: { type: 'figma', url: FIGMA.canvas },
  },
  args: {
    variant: 'description',
    content: 'Banana',
    placement: 'top',
    arrow: true,
  },
  argTypes: {
    variant: { control: 'select', options: DS_TOOLTIP_VARIANTS },
    content: { control: 'text', description: 'Description tooltip text' },
    placement: {
      control: 'select',
      options: [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
      ],
    },
    arrow: { control: 'boolean' },
    chart: { table: { disable: true } },
    overlayClassName: { table: { disable: true } },
    children: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsTooltipProps>;

/** Hover the info icon — reveals **Banana** (Figma Type=Description). */
export const Basic: Story = {
  args: {
    variant: 'description',
    content: 'Banana',
    placement: 'top',
  },
  render: (args) => (
    <span className="ds-tooltip-trigger">
      An example of a fruit
      <DsTooltip {...args}>
        <span className="ds-tooltip-trigger__icon-wrap" aria-label="More information">
          <DsIconInfoCircle className="ds-tooltip-trigger__icon" />
        </span>
      </DsTooltip>
    </span>
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.description },
    docs: {
      description: {
        story:
          '**Description** tooltip — hover the info icon to reveal **Banana**; arrow anchors above the icon.',
      },
    },
  },
};

/** Hover stacked bar segments to reveal chart tooltips (Figma Type=Chart). */
export const StackedBarChart: Story = {
  render: () => (
    <div className="ds-tooltip-stories-chart" role="img" aria-label="Fruit Shop stacked horizontal bar chart">
      <div className="ds-tooltip-bar-chart">
        {BAR_SEGMENTS.map((segment) => (
          <DsTooltip
            key={segment.key}
            variant="chart"
            placement="top"
            chart={segment.chart}
          >
            <div
              className="ds-tooltip-bar-chart__segment"
              style={{ width: segment.width, backgroundColor: segment.color }}
              tabIndex={0}
              aria-label={`${segment.label} — ${FRUIT_SHOP_CATEGORY}`}
            >
              <span className="ds-tooltip-bar-chart__segment-label">{segment.label}</span>
            </div>
          </DsTooltip>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.chart },
    docs: {
      description: {
        story:
          '**Chart** tooltip — hover each **Fruit Shop** bar segment (Banana, Apple, Orange) for fruit legend, quantity, and percentage.',
      },
    },
  },
};
