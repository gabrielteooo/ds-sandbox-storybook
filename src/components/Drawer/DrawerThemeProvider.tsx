import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsDrawerTheme } from './drawerTheme';

export function DrawerThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsDrawerTheme}>{children}</ConfigProvider>;
}
