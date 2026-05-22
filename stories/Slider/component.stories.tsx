import type { Meta, StoryObj } from '@storybook/react';
import type { DsSliderProps } from '../../src/components/Slider';
import { DsSlider, DS_SLIDER_VARIANTS } from '../../src/components/Slider';
import './component.stories.css';

const FIGMA = {
  canvas: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-11904',
  basic: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=507-32553',
  icon: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-12303',
  input: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-12304',
} as const;

const meta: Meta<DsSliderProps> = {
  title: 'Components/Slider',
  component: DsSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Slider** — Ant Design Slider with Figma track tokens (4px rail, 14px handle, teal active track).',
      },
    },
    design: { type: 'figma', url: FIGMA.canvas },
  },
  args: {
    variant: 'basic',
    min: 0,
    max: 100,
    defaultValue: 30,
    disabled: false,
    step: 1,
  },
  argTypes: {
    variant: { control: 'select', options: DS_SLIDER_VARIANTS },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    defaultValue: { control: 'number' },
    value: { control: 'number' },
    disabled: { control: 'boolean' },
    startIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    inputWidth: { control: 'number', description: 'InputNumber width (px) for input variant' },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsSliderProps>;

/** Horizontal default slider (Figma Slider / Basic). */
export const Basic: Story = {
  args: {
    variant: 'basic',
    defaultValue: 30,
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story: 'Default horizontal slider — teal active track, white ring handle, 4px rail.',
      },
    },
  },
};

/** Frown / smile icons with active state at range midpoint (Figma Slider / Icon). */
export const SliderIcon: Story = {
  args: {
    variant: 'icon',
    min: 0,
    max: 20,
    defaultValue: 15,
    step: 1,
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.icon },
    docs: {
      description: {
        story:
          'Icon row with **FrownOutlined** / **SmileOutlined** — leading icon active below midpoint, trailing at or above.',
      },
    },
  },
};

/** Slider synced with InputNumber (Figma Slider / InputNumber). */
export const SliderInputWithNumber: Story = {
  args: {
    variant: 'input',
    min: 1,
    max: 20,
    defaultValue: 3,
    step: 1,
    inputWidth: 79,
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.input },
    docs: {
      description: {
        story: 'Slider + **InputNumber** — values stay in sync; Figma default value **3**, range **1–20**.',
      },
    },
  },
};
