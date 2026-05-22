import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsTooltipTheme } from './tooltipTheme';

export function TooltipThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsTooltipTheme}>{children}</ConfigProvider>;
}
