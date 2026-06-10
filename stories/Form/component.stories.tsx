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
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-43853',
  inputLabelVertical:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=5004-6741',
  inputCaption:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=388-11597',
  labelModes:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=5004-6741',
  login:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=516-42634',
  formVertical:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-43856',
  verticalVariants:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-43856',
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
          'MCP DS Sandbox **Form** — uses Figma **Input Label Vertical** (5004:6741) and **Input Caption** (388:11597) for labeled fields, plus login and variant showcases.',
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
    caption: 'This is a caption under a text input.',
    captionStatus: 'default',
    showTooltip: false,
    showHelpIcon: false,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    labelMode: {
      control: 'select',
      options: DS_FORM_LABEL_MODES,
      description: 'Default · Required (*) · Optional — Input Label Vertical Mark',
    },
    placeholder: { control: 'text' },
    caption: { control: 'text' },
    captionStatus: {
      control: 'select',
      options: ['default', 'error', 'warning'],
    },
    showTooltip: { control: 'boolean' },
    showHelpIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.inputLabelVertical },
    docs: {
      description: {
        story:
          'Vertical **Input / Basic** with **Input Label Vertical** and optional **Input Caption**. Use **labelMode** for Mark variants (None / Required / Optional).',
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

/** Figma Form / Vertical (515:43856) — full Type variant gallery. */
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
    design: { type: 'figma', url: FIGMA.formVertical },
    docs: {
      description: {
        story:
          'Full **Form / Vertical** gallery — each row is one `FormVertical` Type variant (Text, Select, Password, Phone, Currency, Slider, Drag and Drop, etc.).',
      },
    },
  },
};
