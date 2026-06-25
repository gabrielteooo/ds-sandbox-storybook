import '../../src/icons/load-fontawesome-pro';
import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { antTheme } from '../../src/ant-theme';
import '../../src/icons/icons.css';
import { DsNimbusProductionPage } from '../../src/mockups/NimbusProductionPage';
import '../../src/tokens.css';
import './page.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Missing #root element');
}

createRoot(rootEl).render(
  <StrictMode>
    <ConfigProvider theme={antTheme}>
      <DsNimbusProductionPage />
    </ConfigProvider>
  </StrictMode>,
);
