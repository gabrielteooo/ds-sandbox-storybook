import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { FormThemeProvider } from '../../src/components/Form/FormThemeProvider';
import {
  CustomConfigurationForm,
  type CustomConfigurationFormProps,
} from '../../src/forms/CustomConfigurationForm';

const FIGMA =
  'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22737-17233';

const decorators = [
  (Story: () => ReactElement) => (
    <FormThemeProvider>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          padding: 32,
          boxSizing: 'border-box',
          background: 'var(--color-bg-layout, #f5f5f5)',
        }}
      >
        <Story />
      </div>
    </FormThemeProvider>
  ),
];

const meta: Meta<CustomConfigurationFormProps> = {
  title: 'Forms/Custom Configuration Form',
  component: CustomConfigurationForm,
  tags: ['autodocs'],
  decorators,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Figma **Content** defect/configuration form (22737:17233) — aircraft details card, job & rectification sections, transferring job accordion, built from MCP DS `DsInput`, `DsSelect`, `DsDatePicker`, `DsCheckbox`, `DsButton`, and `DsTag`.',
      },
    },
  },
  args: {
    disabled: false,
    logPayloadOnSubmit: true,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    logPayloadOnSubmit: {
      control: 'boolean',
      description: 'Log structured payload on Save job',
    },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<CustomConfigurationFormProps>;

/** Full Figma layout — edit fields and click **Save job** to log JSON in the console. */
export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
