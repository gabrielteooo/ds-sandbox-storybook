import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import type { ReactNode } from 'react';
import { BadgeThemeProvider } from './BadgeThemeProvider';
import type { DsBadgeRibbonColor, DsBadgeSize, DsBadgeStatus } from './badgePresets';
import { DS_BADGE_RIBBON_STYLES, mapDsBadgeSizeToAnt } from './badgePresets';
import './component.css';

export type { DsBadgeRibbonColor, DsBadgeSize, DsBadgeStatus };
export {
  DS_BADGE_RIBBON_COLORS,
  DS_BADGE_RIBBON_FIGMA_LABELS,
  DS_BADGE_RIBBON_STYLES,
  DS_BADGE_SIZES,
  DS_BADGE_STATUSES,
  DS_BADGE_STATUS_LABELS,
  mapDsBadgeSizeToAnt,
} from './badgePresets';
export { DS_BADGE_PANEL } from './badgePanelMetrics';
export { BadgeThemeProvider } from './BadgeThemeProvider';

export interface DsBadgeProps
  extends Omit<BadgeProps, 'status' | 'text' | 'color' | 'ribbon' | 'size'> {
  /** Figma Small (16px count) or Base (20px count). */
  size?: DsBadgeSize;
  /** Status dot variant — renders label row without a child anchor. */
  status?: DsBadgeStatus;
  /** Label beside status dot. */
  text?: ReactNode;
}

function badgeClass(
  status: DsBadgeStatus | undefined,
  size: DsBadgeSize,
  className?: string,
) {
  const isStatus = status !== undefined;

  return [
    'ds-badge',
    isStatus ? 'ds-badge--status' : 'ds-badge--basic',
    !isStatus ? `ds-badge--size-${size}` : '',
    isStatus && status ? `ds-badge--status-${status}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function DsBadge({
  children,
  count,
  dot,
  overflowCount = 99,
  showZero,
  size = 'small',
  status,
  text,
  className,
  ...rest
}: DsBadgeProps) {
  const isStatus = status !== undefined;

  return (
    <BadgeThemeProvider>
      <Badge
        className={badgeClass(status, size, className)}
        count={isStatus ? undefined : count}
        dot={isStatus ? undefined : dot}
        overflowCount={overflowCount}
        showZero={showZero}
        size={isStatus ? undefined : mapDsBadgeSizeToAnt(size)}
        status={status}
        text={text}
        {...rest}
      >
        {isStatus ? null : children}
      </Badge>
    </BadgeThemeProvider>
  );
}

export interface DsBadgeRibbonProps {
  children: ReactNode;
  text?: ReactNode;
  color?: DsBadgeRibbonColor;
  placement?: 'start' | 'end';
  className?: string;
}

function ribbonClass(color: DsBadgeRibbonColor, className?: string) {
  return ['ds-badge-ribbon', `ds-badge-ribbon--${color}`, className].filter(Boolean).join(' ');
}

function DsBadgeRibbon({
  children,
  text = 'Ribbon',
  color = 'cyan',
  placement = 'end',
  className,
}: DsBadgeRibbonProps) {
  return (
    <BadgeThemeProvider>
      <Badge.Ribbon
        className={ribbonClass(color, className)}
        color={DS_BADGE_RIBBON_STYLES[color].bg}
        text={text}
        placement={placement}
      >
        {children}
      </Badge.Ribbon>
    </BadgeThemeProvider>
  );
}

DsBadge.Ribbon = DsBadgeRibbon;

export default DsBadge;
