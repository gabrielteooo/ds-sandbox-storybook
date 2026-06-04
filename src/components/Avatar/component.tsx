import { Avatar, Badge } from 'antd';
import { DsIconUser } from '../../icons';
import type { AvatarProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import { DS_AVATAR_PANEL } from './avatarPanelMetrics';
import './component.css';

/** Figma Avatar — Small · Default · Large · Custom (64px) */
export type DsAvatarSize = 'small' | 'default' | 'large' | 'custom';

/** Figma Avatar — Icon · Image · Text */
export type DsAvatarType = 'icon' | 'image' | 'text';

export const DS_AVATAR_SIZES: DsAvatarSize[] = ['small', 'default', 'large', 'custom'];
export const DS_AVATAR_TYPES: DsAvatarType[] = ['icon', 'image', 'text'];

export interface DsAvatarProps {
  type?: DsAvatarType;
  size?: DsAvatarSize;
  /** Image URL when `type="image"`. */
  src?: string;
  alt?: string;
  /** Initials for `type="text"` — truncated to 1 char at `small`, 2 at other sizes. */
  text?: string;
  /** Custom icon for `type="icon"`; defaults to Font Awesome `user`. */
  icon?: ReactNode;
  /** Figma Badge / Basic status dot (Image & Text; also supported on Icon). */
  showBadge?: boolean;
  className?: string;
}

function resolveText(text: string, size: DsAvatarSize): string {
  const trimmed = text.trim();
  if (!trimmed) {
    return '';
  }
  if (size === 'small') {
    return trimmed.slice(0, 1).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export function mapDsAvatarSizeToAnt(size: DsAvatarSize): AvatarProps['size'] {
  switch (size) {
    case 'small':
      return 'small';
    case 'default':
      return 'default';
    case 'large':
      return 'large';
    case 'custom':
      return DS_AVATAR_PANEL.sizeCustomPx;
  }
}

function wrapperClass(
  type: DsAvatarType,
  size: DsAvatarSize,
  showBadge: boolean,
  className?: string,
): string {
  return [
    'ds-avatar',
    `ds-avatar--${type}`,
    `ds-avatar--${size}`,
    showBadge ? 'ds-avatar--with-badge' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function wrapperStyle(size: DsAvatarSize, showBadge: boolean): CSSProperties | undefined {
  const sizePx =
    size === 'small'
      ? DS_AVATAR_PANEL.sizeSmallPx
      : size === 'default'
        ? DS_AVATAR_PANEL.sizeDefaultPx
        : size === 'large'
          ? DS_AVATAR_PANEL.sizeLargePx
          : DS_AVATAR_PANEL.sizeCustomPx;

  return {
    ['--ds-avatar-size' as string]: `${sizePx}px`,
    ...(showBadge
      ? { ['--ds-avatar-badge-dot-size' as string]: `${DS_AVATAR_PANEL.badgeDotSizePx}px` }
      : {}),
  };
}

export function DsAvatar({
  type = 'icon',
  size = 'default',
  src,
  alt,
  text = 'JD',
  icon,
  showBadge = false,
  className,
}: DsAvatarProps) {
  const antSize = mapDsAvatarSizeToAnt(size);
  const mergedClass = wrapperClass(type, size, showBadge, className);
  const style = wrapperStyle(size, showBadge);

  const avatarProps: AvatarProps = {
    size: antSize,
    className: 'ds-avatar__control',
  };

  if (type === 'icon') {
    avatarProps.icon = icon ?? <DsIconUser />;
  } else if (type === 'image') {
    avatarProps.src = src;
    avatarProps.alt = alt ?? '';
  } else {
    avatarProps.children = resolveText(text, size);
  }

  const avatar = <Avatar {...avatarProps} />;

  if (!showBadge) {
    return (
      <span className={mergedClass} style={style}>
        {avatar}
      </span>
    );
  }

  return (
    <span className={mergedClass} style={style}>
      <Badge dot status="success" className="ds-avatar__badge">
        {avatar}
      </Badge>
    </span>
  );
}

export default DsAvatar;
