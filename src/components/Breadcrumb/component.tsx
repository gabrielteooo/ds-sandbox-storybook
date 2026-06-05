import { Breadcrumb } from 'antd';
import type { BreadcrumbProps, BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import type { ReactNode } from 'react';
import { DsIconHome } from '../../icons';
import { BreadcrumbThemeProvider } from './BreadcrumbThemeProvider';
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
