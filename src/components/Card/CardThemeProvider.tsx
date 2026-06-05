import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsCardTheme } from './cardTheme';

export function CardThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsCardTheme}>{children}</ConfigProvider>;
}
