import type { CSSProperties, HTMLAttributes } from 'react';

/** Font Awesome 6 Pro icon names used in MCP DS Sandbox (kebab-case, without `fa-` prefix). */
export type FaIconName =
  | 'user'
  | 'magnifying-glass'
  | 'calendar'
  | 'clock'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'upload'
  | 'gear'
  | 'circle-check'
  | 'circle-info'
  | 'circle-exclamation'
  | 'circle-minus'
  | 'circle-xmark'
  | 'triangle-exclamation'
  | 'xmark'
  | 'plus'
  | 'check'
  | 'face-frown'
  | 'face-smile'
  | 'house'
  | 'file-lines'
  | 'table-cells'
  | 'arrows-rotate';

export type DsIconVariant = 'regular' | 'solid';

export interface DsIconProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  name: FaIconName;
  /** Figma uses FA Regular for UI chrome; solid for filled semantic icons. */
  variant?: DsIconVariant;
  spin?: boolean;
  /** Sets `font-size` (defaults to `1em` for Ant inline alignment). */
  size?: number | string;
}

function variantClass(variant: DsIconVariant): string {
  return variant === 'solid' ? 'fa-solid' : 'fa-regular';
}

export function DsIcon({
  name,
  variant = 'regular',
  spin = false,
  size,
  className,
  style,
  ...rest
}: DsIconProps) {
  const mergedStyle: CSSProperties = {
    ...(size !== undefined ? { fontSize: size } : undefined),
    ...style,
  };

  return (
    <i
      {...rest}
      className={[
        'ds-icon',
        'fa',
        variantClass(variant),
        `fa-${name}`,
        spin ? 'fa-spin' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      aria-hidden={rest['aria-hidden'] ?? true}
    />
  );
}

export default DsIcon;
