import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsDropdownTheme } from './dropdownTheme';

export function DropdownThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsDropdownTheme}>{children}</ConfigProvider>;
}
