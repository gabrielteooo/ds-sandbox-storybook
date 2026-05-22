import { CheckOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import type { SwitchProps as AntSwitchProps } from 'antd';
import { forwardRef, type ReactNode, type ReactElement } from 'react';
import { SwitchThemeProvider } from './SwitchThemeProvider';
import './component.css';

/** Figma Switch / Basic — Base 44×22, Small 28×16 */
export type DsSwitchSize = 'small' | 'base';

export type DsSwitchContent = 'basic' | 'number' | 'icon';

export const DS_SWITCH_SIZES: DsSwitchSize[] = ['small', 'base'];
export const DS_SWITCH_CONTENTS: DsSwitchContent[] = ['basic', 'number', 'icon'];

export function mapSwitchSizeToAnt(size: DsSwitchSize): AntSwitchProps['size'] {
  return size === 'small' ? 'small' : undefined;
}

function rootClass(
  size: DsSwitchSize,
  content: DsSwitchContent,
  withLabel: boolean,
  className?: string,
) {
  return [
    'ds-switch',
    `ds-switch--${size}`,
    content !== 'basic' ? `ds-switch--${content}` : '',
    withLabel ? 'ds-switch--with-label' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export interface DsSwitchProps
  extends Omit<AntSwitchProps, 'size' | 'checkedChildren' | 'unCheckedChildren'> {
  size?: DsSwitchSize;
  /** Inner track content — basic (none), number (1/0), icon (check). */
  content?: DsSwitchContent;
  /** Optional label for toggle layout (Figma 12128:6648). */
  label?: ReactNode;
  showLabel?: boolean;
  checkedChildren?: AntSwitchProps['checkedChildren'];
  unCheckedChildren?: AntSwitchProps['unCheckedChildren'];
}

function resolveChildren(
  content: DsSwitchContent,
  checkedChildren?: AntSwitchProps['checkedChildren'],
  unCheckedChildren?: AntSwitchProps['unCheckedChildren'],
): Pick<AntSwitchProps, 'checkedChildren' | 'unCheckedChildren'> {
  if (checkedChildren !== undefined || unCheckedChildren !== undefined) {
    return { checkedChildren, unCheckedChildren };
  }

  switch (content) {
    case 'number':
      return { checkedChildren: '1', unCheckedChildren: '0' };
    case 'icon':
      return { checkedChildren: <CheckOutlined aria-hidden /> };
    default:
      return {};
  }
}

type DsSwitchRef = React.ElementRef<typeof Switch>;

export const DsSwitch = forwardRef<DsSwitchRef, DsSwitchProps>(function DsSwitch(
  props,
  ref,
): ReactElement {
  const {
    size = 'base',
    content = 'basic',
    label = 'Label',
    showLabel = false,
    className,
    disabled,
    loading,
    checkedChildren,
    unCheckedChildren,
    ...rest
  } = props;

  const children = resolveChildren(content, checkedChildren, unCheckedChildren);
  const mergedClass = rootClass(size, content, showLabel, className);

  const switchNode = (
    <SwitchThemeProvider>
      <Switch
        ref={ref}
        className={mergedClass}
        size={mapSwitchSizeToAnt(size)}
        disabled={disabled}
        loading={loading}
        {...children}
        {...rest}
      />
    </SwitchThemeProvider>
  );

  if (!showLabel) {
    return switchNode;
  }

  return (
    <div className="ds-switch-field">
      <span className="ds-switch-field__label">{label}</span>
      {switchNode}
    </div>
  );
});

DsSwitch.displayName = 'DsSwitch';
