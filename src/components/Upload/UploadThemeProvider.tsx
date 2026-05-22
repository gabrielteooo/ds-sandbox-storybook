import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import './component.css';
import { dsUploadTheme } from './uploadTheme';

export function UploadThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsUploadTheme}>{children}</ConfigProvider>;
}
