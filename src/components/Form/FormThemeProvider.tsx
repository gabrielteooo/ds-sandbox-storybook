import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import './component.css';
import { dsFormTheme } from './formTheme';

export function FormThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsFormTheme}>{children}</ConfigProvider>;
}
