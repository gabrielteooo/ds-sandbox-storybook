import { DsAvatar, type DsAvatarSize } from './component';
import { DS_AVATAR_PANEL } from './avatarPanelMetrics';
import './component.css';

/** Figma Avatar Group default slot image (1233:39289) — replace with stable CDN in production. */
const DEFAULT_GROUP_IMAGE_SRC =
  'https://www.figma.com/api/mcp/asset/3d64fbe8-fd07-4057-bea1-9a8e5d7026b0';

export interface DsAvatarGroupProps {
  /** Figma Small · Default · Large · Custom — defaults to **default** (32px). */
  size?: DsAvatarSize;
  /** Leading image avatar URL. */
  imageSrc?: string;
  className?: string;
}

function groupOverlapPx(size: DsAvatarSize): number {
  switch (size) {
    case 'small':
      return DS_AVATAR_PANEL.groupOverlapSmallPx;
    case 'default':
      return DS_AVATAR_PANEL.groupOverlapDefaultPx;
    case 'large':
      return DS_AVATAR_PANEL.groupOverlapLargePx;
    case 'custom':
      return DS_AVATAR_PANEL.groupOverlapCustomPx;
  }
}

/** Figma overflow / summary label on the trailing avatar. */
function overflowLabel(size: DsAvatarSize): string {
  switch (size) {
    case 'small':
      return 'J';
    case 'default':
      return '+2';
    case 'large':
    case 'custom':
      return 'Avatar';
  }
}

/** Figma 1233:39288 — overlapping Image · Text · Icon · overflow avatars. */
export function DsAvatarGroup({
  size = 'default',
  imageSrc = DEFAULT_GROUP_IMAGE_SRC,
  className,
}: DsAvatarGroupProps) {
  const mergedClass = ['ds-avatar-group', `ds-avatar-group--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={mergedClass}
      style={{ ['--ds-avatar-group-overlap' as string]: `-${groupOverlapPx(size)}px` }}
    >
      <DsAvatar
        type="image"
        size={size}
        src={imageSrc}
        alt=""
        className="ds-avatar-group__item"
      />
      <DsAvatar type="text" size={size} text="JD" className="ds-avatar-group__item" />
      <DsAvatar
        type="icon"
        size={size}
        className="ds-avatar-group__item ds-avatar-group__item--green"
      />
      <DsAvatar
        type="text"
        size={size}
        text={overflowLabel(size)}
        className="ds-avatar-group__item ds-avatar-group__item--overflow"
      />
    </div>
  );
}

export default DsAvatarGroup;
