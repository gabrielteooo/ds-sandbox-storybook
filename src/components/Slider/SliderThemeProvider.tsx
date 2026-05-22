import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { dsSliderTheme } from './sliderTheme';

export function SliderThemeProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={dsSliderTheme}>{children}</ConfigProvider>;
}
