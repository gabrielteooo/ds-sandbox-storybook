import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsBreadcrumbTheme } from './breadcrumbTheme';

export function BreadcrumbThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsBreadcrumbTheme}>{children}</ConfigProvider>;
}
