import '../../src/icons/load-fontawesome-pro';
import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { antTheme } from '../../src/ant-theme';
import '../../src/icons/icons.css';
import { FormThemeProvider } from '../../src/components/Form/FormThemeProvider';
import { DsServiceAssetConfigForm } from '../../src/mockups/ServiceAssetConfigForm';
import '../../src/tokens.css';
import './page.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Missing #root element');
}

createRoot(rootEl).render(
  <StrictMode>
    <ConfigProvider theme={antTheme}>
      <FormThemeProvider>
        <main className="mockup-page">
          <DsServiceAssetConfigForm />
        </main>
      </FormThemeProvider>
    </ConfigProvider>
  </StrictMode>,
);
