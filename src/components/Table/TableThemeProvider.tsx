import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsTableTheme } from './tableTheme';

export function TableThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsTableTheme}>{children}</ConfigProvider>;
}
