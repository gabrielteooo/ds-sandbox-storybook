import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import '../src/icons/load-fontawesome-pro';
import { antTheme } from '../src/ant-theme';
import '../src/icons/icons.css';
import '../src/tokens.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const layout = parameters.layout ?? 'centered';
      const isFullscreen = layout === 'fullscreen';

      return (
        <ConfigProvider theme={antTheme}>
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              boxSizing: 'border-box',
              ...(isFullscreen
                ? { width: '100%' }
                : {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '100%',
                  }),
            }}
          >
            <Story />
          </div>
        </ConfigProvider>
      );
    },
  ],
};

export default preview;
