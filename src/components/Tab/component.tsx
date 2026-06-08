import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import type { ReactNode } from 'react';
import {
  mapDsTabSizeToAntForVariant,
  type DsTabPosition,
  type DsTabSize,
  type DsTabVariant,
} from './tabPresets';
import { TabThemeProvider } from './TabThemeProvider';
import './component.css';

export { DS_TAB_PANEL } from './tabPanelMetrics';
export { TabThemeProvider } from './TabThemeProvider';
export {
  DS_TAB_POSITIONS,
  DS_TAB_SIZES,
  DS_TAB_VARIANTS,
  mapDsContainerTabSizeToAnt,
  mapDsTabSizeToAnt,
  mapDsTabSizeToAntForVariant,
  type DsTabPosition,
  type DsTabSize,
  type DsTabVariant,
} from './tabPresets';

export interface DsTabItem {
  key: string;
  label: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DsTabsProps {
  items: DsTabItem[];
  /** `basic` = line tabs (512:65398); `container` = card tabs (1819:69698) */
  variant?: DsTabVariant;
  size?: DsTabSize;
  tabPosition?: DsTabPosition;
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  className?: string;
}

function tabsClass(
  variant: DsTabVariant,
  size: DsTabSize,
  tabPosition: DsTabPosition,
  className?: string,
) {
  return [
    'ds-tabs',
    `ds-tabs--${variant}`,
    `ds-tabs--${size}`,
    `ds-tabs--${tabPosition}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function buildItems(items: DsTabItem[]): TabsProps['items'] {
  return items.map((item) => ({
    key: item.key,
    label: item.label,
    children: item.children,
    disabled: item.disabled,
    icon: item.icon,
  }));
}

export function DsTabs({
  items,
  variant = 'basic',
  size = 'default',
  tabPosition = 'top',
  defaultActiveKey,
  activeKey,
  onChange,
  className,
}: DsTabsProps) {
  return (
    <TabThemeProvider>
      <Tabs
        className={tabsClass(variant, size, tabPosition, className)}
        type={variant === 'container' ? 'card' : 'line'}
        size={mapDsTabSizeToAntForVariant(size, variant)}
        tabPosition={tabPosition}
        items={buildItems(items)}
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
        onChange={onChange}
        destroyInactiveTabPane={false}
      />
    </TabThemeProvider>
  );
}

export default DsTabs;
