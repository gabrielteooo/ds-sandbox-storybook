import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsDatePickerPopupTheme } from './datePickerTheme';

export function DatePickerThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsDatePickerPopupTheme}>{children}</ConfigProvider>;
}
