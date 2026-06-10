import { Divider, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo, useState, type ReactNode } from 'react';
import {
  DsIconAnglesLeft,
  DsIconAnglesRight,
  DsIconChevronDown,
  DsIconChevronUp,
  DsIconRightFromBracket,
  DsIconSearch,
} from '../../icons';
import { DsInput } from '../Input/component';
import '../Input/component.css';
import { DsMenuLogo } from './DsMenuLogo';
import { MenuThemeProvider } from './MenuThemeProvider';
import { DS_NAVIGATION_MENU_PANEL } from './menuPanelMetrics';
import { DS_NAVIGATION_MENU_DEFAULT_ITEMS } from './navigationMenuDefaults';
import './component.css';

export interface DsNavigationMenuItem {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  disabled?: boolean;
  children?: DsNavigationMenuItem[];
}

export interface DsNavigationMenuProps {
  items?: DsNavigationMenuItem[];
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onSelect?: MenuProps['onSelect'];
  onOpenChange?: MenuProps['onOpenChange'];
  showSearch?: boolean;
  searchPlaceholder?: string;
  logoLabel?: string;
  onLogoutClick?: () => void;
  className?: string;
}

function renderItemLabel(item: DsNavigationMenuItem, collapsed: boolean) {
  if (collapsed || !item.description) {
    return item.label;
  }

  return (
    <span className="ds-navigation-menu__item-label">
      <span className="ds-navigation-menu__item-label-primary text-base-normal">
        {item.label}
      </span>
      <span className="ds-navigation-menu__item-label-secondary text-base-normal">
        {item.description}
      </span>
    </span>
  );
}

function buildAntMenuItems(
  items: DsNavigationMenuItem[],
  selectedKeys: string[],
  collapsed: boolean,
): MenuProps['items'] {
  return items.map((item) => {
    const selected = selectedKeys.includes(item.key);
    const icon = selected && item.activeIcon ? item.activeIcon : item.icon;

    return {
      key: item.key,
      label: renderItemLabel(item, collapsed),
      icon,
      disabled: item.disabled,
      children: item.children
        ? buildAntMenuItems(item.children, selectedKeys, collapsed)
        : undefined,
    };
  });
}

export function DsNavigationMenu({
  items = DS_NAVIGATION_MENU_DEFAULT_ITEMS,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapseChange,
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys = ['home'],
  openKeys: openKeysProp,
  defaultOpenKeys = ['sub1'],
  onSelect,
  onOpenChange,
  showSearch = true,
  searchPlaceholder = 'Search',
  logoLabel = 'Fleet Management System',
  onLogoutClick,
  className,
}: DsNavigationMenuProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState(defaultOpenKeys);

  const collapsed = collapsedProp ?? internalCollapsed;
  const selectedKeys = selectedKeysProp ?? internalSelectedKeys;
  const openKeys = openKeysProp ?? internalOpenKeys;

  const menuItems = useMemo(
    () => buildAntMenuItems(items, selectedKeys, collapsed),
    [items, selectedKeys, collapsed],
  );

  const handleCollapseToggle = () => {
    const next = !collapsed;
    if (collapsedProp === undefined) {
      setInternalCollapsed(next);
    }
    onCollapseChange?.(next);
  };

  const expandMenu = () => {
    if (!collapsed) return;
    if (collapsedProp === undefined) {
      setInternalCollapsed(false);
    }
    onCollapseChange?.(false);
  };

  const handleSelect: MenuProps['onSelect'] = (info) => {
    if (collapsed) {
      expandMenu();
    }
    if (selectedKeysProp === undefined) {
      setInternalSelectedKeys(info.selectedKeys);
    }
    onSelect?.(info);
  };

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    // Opening a submenu while collapsed should expand the menu.
    // Ignore empty keys — those fire when collapsing clears openKeys.
    if (collapsed && keys.length > 0) {
      expandMenu();
    }
    if (openKeysProp === undefined) {
      setInternalOpenKeys(keys);
    }
    onOpenChange?.(keys);
  };

  return (
    <MenuThemeProvider>
      <aside
        className={[
          'ds-navigation-menu',
          collapsed ? 'ds-navigation-menu--collapsed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          width: collapsed
            ? DS_NAVIGATION_MENU_PANEL.widthCollapsedPx
            : DS_NAVIGATION_MENU_PANEL.widthExpandedPx,
        }}
      >
        <div className="ds-navigation-menu__top">
          <div className="ds-navigation-menu__logo">
            <DsMenuLogo label={logoLabel} showLabel={!collapsed} />
          </div>

          {showSearch ? (
            <div className="ds-navigation-menu__search">
              {collapsed ? (
                <button
                  type="button"
                  className="ds-navigation-menu__search-icon-btn"
                  aria-label={searchPlaceholder}
                >
                  <DsIconSearch size={DS_NAVIGATION_MENU_PANEL.iconSizePx} />
                </button>
              ) : (
                <DsInput
                  kind="search"
                  size="small"
                  placeholder={searchPlaceholder}
                  searchButtonType="default"
                  className="ds-navigation-menu__search-input"
                />
              )}
            </div>
          ) : null}

          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            selectedKeys={selectedKeys}
            openKeys={collapsed ? [] : openKeys}
            items={menuItems}
            onSelect={handleSelect}
            onOpenChange={handleOpenChange}
            className="ds-navigation-menu__menu"
            expandIcon={
              collapsed
                ? () => null
                : ({ isOpen }) =>
                    isOpen ? (
                      <DsIconChevronUp
                        size={DS_NAVIGATION_MENU_PANEL.iconSizePx}
                      />
                    ) : (
                      <DsIconChevronDown
                        size={DS_NAVIGATION_MENU_PANEL.iconSizePx}
                      />
                    )
            }
          />
        </div>

        <Divider className="ds-navigation-menu__divider" />

        <div className="ds-navigation-menu__bottom">
          <button
            type="button"
            className="ds-navigation-menu__footer-btn"
            onClick={onLogoutClick}
          >
            <DsIconRightFromBracket size={DS_NAVIGATION_MENU_PANEL.iconSizePx} />
            {!collapsed ? (
              <span className="ds-navigation-menu__footer-label text-base-normal">
                Log Out
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="ds-navigation-menu__footer-btn"
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
            onClick={handleCollapseToggle}
          >
            {collapsed ? (
              <DsIconAnglesRight size={DS_NAVIGATION_MENU_PANEL.iconSizePx} />
            ) : (
              <>
                <DsIconAnglesLeft size={DS_NAVIGATION_MENU_PANEL.iconSizePx} />
                <span className="ds-navigation-menu__footer-label text-base-normal">
                  Collapse Menu
                </span>
              </>
            )}
          </button>
        </div>
      </aside>
    </MenuThemeProvider>
  );
}

export default DsNavigationMenu;
