import { Breadcrumb } from 'antd';
import type { DropdownProps } from 'antd';
import type { BreadcrumbProps, BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import type { ReactNode } from 'react';
import { DS_DROPDOWN_PANEL } from '../Dropdown/dropdownPanelMetrics';
import { DsIconHome } from '../../icons';
import { BreadcrumbThemeProvider } from './BreadcrumbThemeProvider';
import '../Dropdown/component.css';
import './component.css';

export { DS_BREADCRUMB_PANEL } from './breadcrumbPanelMetrics';
export { BreadcrumbThemeProvider } from './BreadcrumbThemeProvider';

/**
 * A single breadcrumb item.
 * - `title`  — displayed label (string or ReactNode)
 * - `href`   — makes the item a clickable link
 * - `onClick`— alternative to href for SPA navigation
 */
export interface DsBreadcrumbItem extends BreadcrumbItemType {
  title: ReactNode;
  href?: string;
  onClick?: () => void;
  dropdownProps?: DropdownProps;
}

export interface DsBreadcrumbEllipsisMenuItem {
  key: string;
  label: ReactNode;
  onClick?: () => void;
}

/** Shared hover dropdown props — Figma 22770:15528 (small dropdown menu). */
export const BREADCRUMB_ELLIPSIS_DROPDOWN_PROPS: DropdownProps = {
  trigger: ['hover'],
  overlayClassName: 'ds-dropdown-overlay',
  placement: 'bottomLeft',
  align: { offset: [0, DS_DROPDOWN_PANEL.menuGapPx] },
};

/** Ellipsis item with hover menu — reuses DsDropdown small menu styles. */
export function createBreadcrumbEllipsisItem(
  menuItems: DsBreadcrumbEllipsisMenuItem[],
): DsBreadcrumbItem {
  return {
    title: '…',
    menu: {
      items: menuItems.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: item.onClick,
      })),
    },
    dropdownProps: BREADCRUMB_ELLIPSIS_DROPDOWN_PROPS,
  };
}

export interface DsBreadcrumbProps extends Omit<BreadcrumbProps, 'items'> {
  items: DsBreadcrumbItem[];
  /**
   * Replace the first item's title with a home icon.
   * Matches Figma Home item — house icon, no label by default.
   * Set to `false` to show the first item's title as-is.
   */
  showHomeIcon?: boolean;
  className?: string;
}

function buildItems(
  items: DsBreadcrumbItem[],
  showHomeIcon: boolean,
): BreadcrumbItemType[] {
  return items.map((item, index) => {
    if (index === 0 && showHomeIcon) {
      return {
        ...item,
        title: (
          <span className="ds-breadcrumb__home">
            <DsIconHome size={16} />
            {item.title && <span className="ds-breadcrumb__home-label">{item.title}</span>}
          </span>
        ),
      };
    }
    return item;
  });
}

export function DsBreadcrumb({
  items,
  showHomeIcon = true,
  separator = '/',
  className,
  ...rest
}: DsBreadcrumbProps) {
  const resolvedItems = buildItems(items, showHomeIcon);

  return (
    <BreadcrumbThemeProvider>
      <Breadcrumb
        className={['ds-breadcrumb', className].filter(Boolean).join(' ')}
        items={resolvedItems}
        separator={separator}
        {...rest}
      />
    </BreadcrumbThemeProvider>
  );
}

export default DsBreadcrumb;
