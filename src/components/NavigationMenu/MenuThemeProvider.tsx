import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsMenuTheme } from './menuTheme';

export function MenuThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsMenuTheme}>{children}</ConfigProvider>;
}
