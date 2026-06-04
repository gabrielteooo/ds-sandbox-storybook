import { DsIconAppstore, DsIconFileText, DsIconGear, DsIconHome } from '../../icons';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { DS_APP_SHELL } from '../appShellMetrics';
import './component.css';

const { Header, Sider, Content } = Layout;

export interface DsAppShellNavItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

export const DS_APP_SHELL_DEFAULT_NAV: DsAppShellNavItem[] = [
  { key: 'home', label: 'Home', icon: <DsIconHome /> },
  { key: 'documents', label: 'Documents', icon: <DsIconFileText /> },
  { key: 'apps', label: 'Applications', icon: <DsIconAppstore /> },
  { key: 'settings', label: 'Settings', icon: <DsIconGear /> },
];

export interface DsAppShellProps {
  children: ReactNode;
  productName?: string;
  showSidebar?: boolean;
  navItems?: DsAppShellNavItem[];
  selectedNavKey?: string;
  headerExtra?: ReactNode;
  className?: string;
}

function rootClass(showSidebar: boolean, className?: string) {
  return [
    'ds-app-shell',
    showSidebar ? 'ds-app-shell--with-sidebar' : 'ds-app-shell--header-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function DsAppShell({
  children,
  productName = 'MCP DS Sandbox',
  showSidebar = true,
  navItems = DS_APP_SHELL_DEFAULT_NAV,
  selectedNavKey = 'home',
  headerExtra,
  className,
}: DsAppShellProps) {
  const menuItems: MenuProps['items'] = navItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
  }));

  return (
    <div className={rootClass(showSidebar, className)}>
      <Layout className="ds-app-shell__layout">
        <Header className="ds-app-shell__header">
          <div className="ds-app-shell__brand">
            <span className="ds-app-shell__logo" aria-hidden />
            <h1 className="ds-app-shell__title text-base-normal">{productName}</h1>
          </div>
          {headerExtra ? (
            <div className="ds-app-shell__header-extra">{headerExtra}</div>
          ) : null}
        </Header>
        <Layout>
          {showSidebar ? (
            <Sider
              className="ds-app-shell__sider"
              width={DS_APP_SHELL.sidebarWidthPx}
              theme="light"
            >
              <Menu
                mode="inline"
                selectedKeys={[selectedNavKey]}
                items={menuItems}
                className="ds-app-shell__menu"
              />
            </Sider>
          ) : null}
          <Content className="ds-app-shell__content">
            <div className="ds-app-shell__content-inner">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default DsAppShell;
