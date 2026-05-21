import { Tag } from 'antd';
import type { TagProps } from 'antd';
import type { ReactNode } from 'react';
import type { DsTagColorPreset, DsTagStatus } from './tagPresets';
import './component.css';

export type DsTagVariant = 'default' | 'borderless';

export type { DsTagColorPreset, DsTagStatus };
export { DS_TAG_COLOR_PRESETS, DS_TAG_STATUSES } from './tagPresets';

export interface DsTagProps {
  children?: ReactNode;
  closable?: boolean;
  /** Bordered default vs borderless (same fill, no border — Figma type=borderless) */
  variant?: DsTagVariant;
  /** Colourful preset; `grey` uses custom DS tokens */
  color?: DsTagColorPreset;
  /** Status semantic color (success, processing, …) */
  status?: DsTagStatus;
  icon?: ReactNode;
  onClose?: TagProps['onClose'];
  className?: string;
}

function tagClass(
  variant: DsTagVariant,
  closable: boolean | undefined,
  color?: DsTagColorPreset,
  status?: DsTagStatus,
  className?: string,
) {
  return [
    'ds-tag',
    variant === 'borderless' ? 'ds-tag--borderless' : '',
    closable ? 'ds-tag--closable' : '',
    color === 'grey' ? 'ds-tag--grey' : '',
    status ? `ds-tag--status-${status}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function DsTag({
  children = 'Tag',
  closable,
  variant = 'default',
  color,
  status,
  icon,
  onClose,
  className,
}: DsTagProps) {
  const bordered = variant !== 'borderless' && !status;
  const antColor = color && color !== 'grey' ? color : undefined;

  return (
    <Tag
      className={tagClass(variant, closable, color, status, className)}
      bordered={status ? true : bordered}
      closable={closable}
      color={status ? undefined : antColor}
      icon={icon}
      onClose={onClose}
    >
      {children}
    </Tag>
  );
}

export default DsTag;
