import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsTimePickerPopupTheme } from './timePickerTheme';

export function TimePickerThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsTimePickerPopupTheme}>{children}</ConfigProvider>;
}
