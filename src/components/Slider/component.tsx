import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { InputNumber, Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import {
  forwardRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { mergeDsSliderTooltipProps } from '../Tooltip/sliderTooltipConfig';
import { TooltipThemeProvider } from '../Tooltip/TooltipThemeProvider';
import '../Tooltip/component.css';
import { SliderThemeProvider } from './SliderThemeProvider';
import './component.css';

/** Figma Slider layout presets */
export type DsSliderVariant = 'basic' | 'icon' | 'input';

export const DS_SLIDER_VARIANTS: DsSliderVariant[] = ['basic', 'icon', 'input'];

export interface DsSliderProps
  extends Omit<SliderSingleProps, 'range' | 'className' | 'value' | 'defaultValue' | 'onChange'> {
  variant?: DsSliderVariant;
  className?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Icon variant — leading icon (default FrownOutlined). */
  startIcon?: ReactNode;
  /** Icon variant — trailing icon (default SmileOutlined). */
  endIcon?: ReactNode;
  /** Input variant — InputNumber width in px (Figma 79). */
  inputWidth?: number;
}

function rootClass(variant: DsSliderVariant, disabled: boolean | undefined, className?: string) {
  return [
    'ds-slider',
    `ds-slider--${variant}`,
    disabled ? 'ds-slider--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function useSliderValue(
  value: number | undefined,
  defaultValue: number | undefined,
  onChange?: (value: number) => void,
) {
  const [internal, setInternal] = useState(defaultValue ?? 0);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = (next: number) => {
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  };

  return [current, setValue] as const;
}

type DsSliderRef = React.ElementRef<typeof Slider>;

export const DsSlider = forwardRef<DsSliderRef, DsSliderProps>(function DsSlider(
  props,
  ref,
): ReactElement {
  const {
    variant = 'basic',
    className,
    disabled,
    min = 0,
    max = 100,
    step,
    value,
    defaultValue,
    onChange,
    startIcon,
    endIcon,
    inputWidth,
    tooltip,
    ...rest
  } = props;

  const [currentValue, setValue] = useSliderValue(value, defaultValue, onChange);
  const mergedClass = rootClass(variant, disabled, className);
  const mergedTooltip = mergeDsSliderTooltipProps(tooltip);

  const sliderNode = (
    <Slider
      ref={ref}
      className={mergedClass}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={currentValue}
      onChange={setValue}
      tooltip={mergedTooltip}
      {...rest}
    />
  );

  const themedSlider = (
    <SliderThemeProvider>
      <TooltipThemeProvider>{sliderNode}</TooltipThemeProvider>
    </SliderThemeProvider>
  );

  if (variant === 'icon') {
    const mid = Number(((max - min) / 2).toFixed(5));
    const startActive = currentValue < mid;
    const endActive = currentValue >= mid;

    return (
      <div className="ds-slider-field ds-slider-field--icon">
        <span
          className={[
            'ds-slider-field__icon',
            startActive ? 'ds-slider-field__icon--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        >
          {startIcon ?? <FrownOutlined />}
        </span>
        <div className="ds-slider-field__track">{themedSlider}</div>
        <span
          className={[
            'ds-slider-field__icon',
            endActive ? 'ds-slider-field__icon--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        >
          {endIcon ?? <SmileOutlined />}
        </span>
      </div>
    );
  }

  if (variant === 'input') {
    return (
      <div className="ds-slider-field ds-slider-field--input">
        <div className="ds-slider-field__track">{themedSlider}</div>
        <InputNumber
          className="ds-slider__input"
          controls={false}
          min={min}
          max={max}
          step={step ?? 1}
          disabled={disabled}
          value={currentValue}
          onChange={(next) => {
            if (next !== null && next !== undefined) {
              setValue(next);
            }
          }}
          style={inputWidth ? { width: inputWidth } : undefined}
        />
      </div>
    );
  }

  return themedSlider;
});

DsSlider.displayName = 'DsSlider';
