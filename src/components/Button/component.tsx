import { Button } from 'antd';
import { DsIconSearch } from '../../icons';
import type { ButtonProps } from 'antd';
import { Fragment, type ReactNode } from 'react';
import { DsButtonCompactItem } from './DsButtonCompactItem';
import { DsButtonCompactSeparator } from './DsButtonCompactSeparator';
import './component.css';

export type DsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'danger';
export type DsButtonSize = 'x-small' | 'small' | 'base';
export type DsButtonGroupVariant = 'primary' | 'secondary';
export type DsButtonGroupSize = 'small' | 'default' | 'large';
export type DsButtonGroupDirection = 'horizontal' | 'vertical';

export const DS_BUTTON_VARIANTS: DsButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'link',
  'danger',
];

export const DS_BUTTON_SIZES: DsButtonSize[] = ['x-small', 'small', 'base'];

const DEFAULT_LABEL = 'Button';
const DEFAULT_ICON = <DsIconSearch />;

export interface DsButtonProps {
  variant?: DsButtonVariant;
  size?: DsButtonSize;
  label?: string;
  iconOnly?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  htmlType?: ButtonProps['htmlType'];
  className?: string;
  onClick?: () => void;
}

export interface DsButtonGroupProps {
  variant?: DsButtonGroupVariant;
  size?: DsButtonGroupSize;
  direction?: DsButtonGroupDirection;
  labels?: string[];
  className?: string;
}

export function mapVariantToAntProps(variant: DsButtonVariant): Pick<
  ButtonProps,
  'type' | 'danger'
> {
  switch (variant) {
    case 'primary':
      return { type: 'primary' };
    case 'secondary':
      return { type: 'default' };
    case 'tertiary':
      return { type: 'text' };
    case 'link':
      return { type: 'link' };
    case 'danger':
      return { type: 'primary', danger: true };
  }
}

export function mapSizeToAntProps(size: DsButtonSize): Pick<ButtonProps, 'size'> {
  switch (size) {
    case 'x-small':
      return { size: 'small' };
    case 'small':
      return { size: 'middle' };
    case 'base':
      return { size: 'large' };
  }
}

export function mapGroupSizeToButtonSize(size: DsButtonGroupSize): DsButtonSize {
  switch (size) {
    case 'small':
      return 'x-small';
    case 'default':
      return 'small';
    case 'large':
      return 'base';
  }
}

function sizeClass(size: DsButtonSize, iconOnly: boolean) {
  const base = `ds-button--${size}`;
  return iconOnly ? `${base} ds-button--icon-only` : base;
}

function variantClass(variant: DsButtonVariant) {
  return `ds-button--${variant}`;
}

export function DsButton({
  variant = 'primary',
  size = 'base',
  label = DEFAULT_LABEL,
  iconOnly = false,
  icon = DEFAULT_ICON,
  disabled = false,
  htmlType,
  className,
  onClick,
}: DsButtonProps) {
  const antVariant = mapVariantToAntProps(variant);
  const antSize = mapSizeToAntProps(size);

  return (
    <span
      className={[
        'ds-button',
        sizeClass(size, iconOnly),
        variantClass(variant),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Button
        {...antVariant}
        {...antSize}
        disabled={disabled}
        htmlType={htmlType}
        icon={iconOnly ? icon : undefined}
        onClick={onClick}
      >
        {iconOnly ? null : label}
      </Button>
    </span>
  );
}

export function DsButtonGroup({
  variant = 'secondary',
  size = 'default',
  direction = 'horizontal',
  labels = ['Button', 'Button', 'Button', 'Button'],
  className,
}: DsButtonGroupProps) {
  const buttonSize = mapGroupSizeToButtonSize(size);
  const buttonVariant: DsButtonVariant = variant === 'primary' ? 'primary' : 'secondary';
  const separatorOrientation =
    direction === 'horizontal' ? 'vertical' : 'horizontal';

  return (
    <div
      role="group"
      className={[
        'ds-button-group',
        `ds-button-group--${variant}`,
        `ds-button-group--${size}`,
        `ds-button-group--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {labels.map((label, index) => (
        <Fragment key={`${label}-${index}`}>
          {index > 0 ? (
            <DsButtonCompactSeparator
              variant={variant}
              orientation={separatorOrientation}
              size={size}
            />
          ) : null}
          <DsButtonCompactItem>
            <DsButton
              variant={buttonVariant}
              size={buttonSize}
              label={label}
            />
          </DsButtonCompactItem>
        </Fragment>
      ))}
    </div>
  );
}

export default DsButton;
