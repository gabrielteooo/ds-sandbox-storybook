import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsTabTheme } from './tabTheme';

export function TabThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsTabTheme}>{children}</ConfigProvider>;
}
