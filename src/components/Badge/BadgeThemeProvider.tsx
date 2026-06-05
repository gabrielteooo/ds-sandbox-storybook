import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsBadgeTheme } from './badgeTheme';

export function BadgeThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsBadgeTheme}>{children}</ConfigProvider>;
}
