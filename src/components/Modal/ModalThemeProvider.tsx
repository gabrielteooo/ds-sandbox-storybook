import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsModalTheme } from './modalTheme';

export function ModalThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsModalTheme}>{children}</ConfigProvider>;
}
