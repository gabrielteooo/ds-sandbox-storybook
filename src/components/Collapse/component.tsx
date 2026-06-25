import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import type { ReactNode } from 'react';
import {
  DsIconChevronDown,
  DsIconChevronRight,
  DsIconChevronUp,
} from '../../icons';
import { CollapseThemeProvider } from './CollapseThemeProvider';
import { DsCollapsePanelHeader } from './DsCollapsePanelHeader';
import {
  DS_COLLAPSE_PANEL,
  type DsCollapseExpandIconPosition,
  type DsCollapseSize,
} from './collapsePanelMetrics';
import './component.css';

export { DS_COLLAPSE_PANEL } from './collapsePanelMetrics';
export {
  DS_COLLAPSE_EXPAND_ICON_POSITIONS,
  DS_COLLAPSE_SIZES,
  type DsCollapseExpandIconPosition,
  type DsCollapseSize,
} from './collapsePanelMetrics';
export { CollapseThemeProvider } from './CollapseThemeProvider';
export {
  DsCollapseDrawerHeader,
  type DsCollapseDrawerHeaderProps,
} from './DsCollapseDrawerHeader';
export {
  DsCollapsePanelHeader,
  type DsCollapsePanelHeaderProps,
} from './DsCollapsePanelHeader';

const DEFAULT_BODY =
  'Authoritatively disseminate prospective leadership via opportunities economically sound.';

export interface DsCollapseItem {
  key: string;
  label: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  extra?: ReactNode;
}

export interface DsCollapseProps {
  items: DsCollapseItem[];
  /** Figma Size=Default | Small | Large (407:46). */
  size?: DsCollapseSize;
  /** Chevron placement — Figma Expan Icon Position Left | Right. */
  expandIconPosition?: DsCollapseExpandIconPosition;
  defaultActiveKey?: string | string[];
  activeKey?: string | string[];
  onChange?: CollapseProps['onChange'];
  accordion?: boolean;
  bordered?: boolean;
  className?: string;
}

function collapseClass(
  size: DsCollapseSize,
  expandIconPosition: DsCollapseExpandIconPosition,
  className?: string,
) {
  return [
    'ds-collapse',
    `ds-collapse--${size}`,
    `ds-collapse--icon-${expandIconPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function bodyClass(size: DsCollapseSize) {
  return [
    'ds-collapse-panel__body',
    size === 'large' ? 'text-base-normal' : 'text-sm-normal',
  ].join(' ');
}

function buildItems(
  items: DsCollapseItem[],
  size: DsCollapseSize,
): NonNullable<CollapseProps['items']> {
  return items.map((item) => ({
    key: item.key,
    label: (
      <DsCollapsePanelHeader
        label={item.label}
        size={size}
        disabled={item.disabled}
      />
    ),
    extra: item.extra ? (
      <span className="ds-collapse-panel-header__extra">{item.extra}</span>
    ) : undefined,
    children: (
      <div className={bodyClass(size)}>
        {item.children ?? DEFAULT_BODY}
      </div>
    ),
    collapsible: item.disabled ? ('disabled' as const) : undefined,
  }));
}

function renderExpandIcon(
  isActive: boolean | undefined,
  expandIconPosition: DsCollapseExpandIconPosition,
) {
  const icon =
    expandIconPosition === 'right'
      ? isActive
        ? DsIconChevronUp
        : DsIconChevronDown
      : isActive
        ? DsIconChevronDown
        : DsIconChevronRight;

  const Icon = icon;

  return (
    <span className="ds-collapse__expand-icon" aria-hidden>
      <Icon size={DS_COLLAPSE_PANEL.expandIconSizePx} />
    </span>
  );
}

export function DsCollapse({
  items,
  size = 'default',
  expandIconPosition = 'left',
  defaultActiveKey,
  activeKey,
  onChange,
  accordion = false,
  bordered = true,
  className,
}: DsCollapseProps) {
  const antExpandIconPosition =
    expandIconPosition === 'left' ? 'start' : 'end';

  return (
    <CollapseThemeProvider>
      <Collapse
        className={collapseClass(size, expandIconPosition, className)}
        items={buildItems(items, size)}
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
        onChange={onChange}
        accordion={accordion}
        bordered={bordered}
        expandIconPosition={antExpandIconPosition}
        expandIcon={({ isActive }) =>
          renderExpandIcon(isActive, expandIconPosition)
        }
      />
    </CollapseThemeProvider>
  );
}

export default DsCollapse;
