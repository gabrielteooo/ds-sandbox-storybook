import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsSwitchTheme } from './switchTheme';

export function SwitchThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsSwitchTheme}>{children}</ConfigProvider>;
}
