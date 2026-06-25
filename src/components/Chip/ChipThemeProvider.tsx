import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsChipTheme } from './chipTheme';

export function ChipThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsChipTheme}>{children}</ConfigProvider>;
}
