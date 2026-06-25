import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsCollapseTheme } from './collapseTheme';

export function CollapseThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsCollapseTheme}>{children}</ConfigProvider>;
}
