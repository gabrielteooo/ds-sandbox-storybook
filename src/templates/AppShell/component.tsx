import { useState, type ReactNode } from 'react';
import '../../components/Avatar/component.css';
import '../../components/Breadcrumb/component.css';
import '../../components/Button/component.css';
import '../../components/GlobalHeader/component.css';
import '../../components/Input/component.css';
import '../../components/NavigationMenu/component.css';
import '../../components/Select/component.css';
import '../../components/Tab/component.css';
import {
  DsDashboardHeader,
  type DsDashboardHeaderProps,
} from '../../components/GlobalHeader/DsDashboardHeader';
import {
  DsGlobalHeader,
  type DsGlobalHeaderProps,
} from '../../components/GlobalHeader';
import { DsNavigationMenu } from '../../components/NavigationMenu';
import {
  DS_APP_SHELL_APPLICATION_HEADER,
  DS_APP_SHELL_DASHBOARD_HEADER,
} from '../appShellPresets';
import { DS_APP_SHELL_NAV_ITEMS } from '../appShellNavItems';
import './component.css';

export type DsAppShellVariant = 'application' | 'dashboard';

export interface DsAppShellProps {
  /** Application (default global header) or Dashboard (filters + Qlik bar). */
  variant?: DsAppShellVariant;
  children?: ReactNode;
  showSidebar?: boolean;
  navCollapsed?: boolean;
  defaultNavCollapsed?: boolean;
  onNavCollapseChange?: (collapsed: boolean) => void;
  applicationHeaderProps?: Partial<DsGlobalHeaderProps>;
  dashboardHeaderProps?: Partial<DsDashboardHeaderProps>;
  className?: string;
}

function rootClass(variant: DsAppShellVariant, className?: string) {
  return ['ds-app-shell', `ds-app-shell--${variant}`, className]
    .filter(Boolean)
    .join(' ');
}

export function DsAppShell({
  variant = 'application',
  children,
  showSidebar = true,
  navCollapsed,
  defaultNavCollapsed = false,
  onNavCollapseChange,
  applicationHeaderProps,
  dashboardHeaderProps,
  className,
}: DsAppShellProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultNavCollapsed);
  const collapsed = navCollapsed ?? internalCollapsed;

  const handleCollapseChange = (next: boolean) => {
    if (navCollapsed === undefined) {
      setInternalCollapsed(next);
    }
    onNavCollapseChange?.(next);
  };

  return (
    <div className={rootClass(variant, className)}>
      {showSidebar ? (
        <DsNavigationMenu
          items={DS_APP_SHELL_NAV_ITEMS}
          collapsed={collapsed}
          onCollapseChange={handleCollapseChange}
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['module1']}
          logoLabel="Fleet Management System"
        />
      ) : null}

      <div className="ds-app-shell__main">
        {variant === 'dashboard' ? (
          <DsDashboardHeader
            {...DS_APP_SHELL_DASHBOARD_HEADER}
            {...dashboardHeaderProps}
          />
        ) : (
          <DsGlobalHeader
            type="default"
            {...DS_APP_SHELL_APPLICATION_HEADER}
            {...applicationHeaderProps}
          />
        )}

        <main className="ds-app-shell__content">
          {children ? (
            <div className="ds-app-shell__content-inner">{children}</div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default DsAppShell;
