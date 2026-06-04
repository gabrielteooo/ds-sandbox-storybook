import type { Meta, StoryObj } from '@storybook/react';
import { DsLoginForm } from '../../src/components/Form';
import { FormThemeProvider } from '../../src/components/Form/FormThemeProvider';
import {
  DsPageTemplate,
  DS_PAGE_TEMPLATE_VARIANTS,
  type DsPageTemplateProps,
} from '../../src/templates/PageTemplate';

const FIGMA = {
  appShell: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox',
} as const;

const meta: Meta<DsPageTemplateProps> = {
  title: 'Templates/Page Templates',
  component: DsPageTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composed page layouts inside the app shell — blank canvas, form-focused pages, and dashboard patterns. Reference these when asking Cursor to implement full screens from Storybook.',
      },
    },
  },
  args: {
    variant: 'blank',
    pageTitle: 'Page title',
    showSidebar: true,
    productName: 'MCP DS Sandbox',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: DS_PAGE_TEMPLATE_VARIANTS,
      description: 'blank · form · dashboard',
    },
    pageTitle: { control: 'text' },
    pageDescription: { control: 'text' },
    showSidebar: { control: 'boolean' },
    productName: { control: 'text' },
    children: { table: { disable: true } },
    headerExtra: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsPageTemplateProps>;

/** Empty content slot inside the app shell. */
export const Blank: Story = {
  args: {
    variant: 'blank',
    pageTitle: 'Blank page',
  },
};

/** Centered form area — embeds Login form as a reference implementation. */
export const Form: Story = {
  name: 'Form Page',
  args: {
    variant: 'form',
    pageTitle: 'Sign in',
    pageDescription: 'Example form page using the Login form preset.',
  },
  render: (args) => (
    <DsPageTemplate {...args}>
      <FormThemeProvider>
        <DsLoginForm />
      </FormThemeProvider>
    </DsPageTemplate>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form page template with **DsLoginForm** in the content slot — useful for testing end-to-end screen implementation.',
      },
    },
  },
};

/** Filter strip + widget grid placeholders (dashboard pattern). */
export const Dashboard: Story = {
  args: {
    variant: 'dashboard',
    pageTitle: 'Dashboard',
    pageDescription: 'Filter criteria and widget tiles — Figma Homepage Widget pattern.',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.appShell },
  },
};
