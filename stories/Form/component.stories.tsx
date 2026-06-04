import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import {
  DsFormTextField,
  DsLoginForm,
  DsVerticalInputVariants,
  DS_FORM_LABEL_MODES,
  FormThemeProvider,
  type DsFormTextFieldProps,
  type DsLoginFormProps,
  type DsVerticalInputVariantsProps,
} from '../../src/components/Form';
import { UploadThemeProvider } from '../../src/components/Upload';
import './component.stories.css';

const FIGMA = {
  textInput:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22737-7148',
  labelModes:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22737-7451',
  login:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22726-4626',
  verticalVariants:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22737-6239',
} as const;

const decorators = [
  (Story: () => ReactElement) => (
    <FormThemeProvider>
      <UploadThemeProvider>
        <Story />
      </UploadThemeProvider>
    </FormThemeProvider>
  ),
];

const meta: Meta = {
  title: 'Components/Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Form** — vertical labeled fields, login preset, and input variant showcases.',
      },
    },
  },
  decorators,
};

export default meta;

/** Figma 22737:7148 — single text field; toggle label mode (22737:7451). */
export const TextInputVariant: StoryObj<DsFormTextFieldProps> = {
  name: 'Basic / Text Input Variant',
  render: (args) => <DsFormTextField {...args} />,
  args: {
    label: 'Input Label',
    labelMode: 'default',
    placeholder: 'Type here',
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    labelMode: {
      control: 'select',
      options: DS_FORM_LABEL_MODES,
      description: 'Default · Required (*) · Optional',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.textInput },
    docs: {
      description: {
        story:
          'Vertical **Input / Basic** with labeled field. Use **labelMode** to switch default, required (red asterisk), or optional suffix (Figma 22737:7451).',
      },
    },
  },
};

/** Figma Basic: Login (22726:4626). */
export const Login: StoryObj<DsLoginFormProps> = {
  name: 'Login',
  render: (args) => (
    <DsLoginForm
      {...args}
      onFinish={(values) => {
        // eslint-disable-next-line no-console
        console.log('Login form values:', values);
      }}
    />
  ),
  args: {
    disabled: false,
    showRemember: true,
    showForgotPassword: true,
    showRegister: true,
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    rememberLabel: 'Remember me',
    forgotPasswordLabel: 'Forgot password',
    submitLabel: 'Log in',
    registerPrefix: 'Or',
    registerLabel: 'Register now!',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    showRemember: { control: 'boolean' },
    showForgotPassword: { control: 'boolean' },
    showRegister: { control: 'boolean' },
    usernamePlaceholder: { control: 'text' },
    passwordPlaceholder: { control: 'text' },
    rememberLabel: { control: 'text' },
    forgotPasswordLabel: { control: 'text' },
    submitLabel: { control: 'text' },
    registerPrefix: { control: 'text' },
    registerLabel: { control: 'text' },
    forgotPasswordHref: { control: 'text' },
    registerHref: { control: 'text' },
    onFinish: { table: { disable: true } },
    initialValues: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.login },
    docs: {
      description: {
        story:
          'Login form: username, password, remember me, forgot password, full-width **Log in**, and register link.',
      },
    },
  },
};

/** Figma Form Vertical Input variants (22737:6239). */
export const VerticalInputVariants: StoryObj<DsVerticalInputVariantsProps> = {
  name: 'Vertical Input Variants',
  render: (args) => <DsVerticalInputVariants {...args} />,
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    className: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.verticalVariants },
    docs: {
      description: {
        story:
          'Full vertical form field gallery: text, select, password, textarea, pickers, radio, checkbox, switch, button, upload, slider, read-only.',
      },
    },
  },
};
