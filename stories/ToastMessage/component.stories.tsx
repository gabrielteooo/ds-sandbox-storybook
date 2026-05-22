import type { Meta, StoryObj } from '@storybook/react';
import { DsButton } from '../../src/components/Button';
import {
  ToastMessageThemeProvider,
  useDsToastMessage,
  type DsToastMessageType,
} from '../../src/components/ToastMessage';
import './component.stories.css';

const FIGMA = {
  canvas: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14564',
  normal: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14563',
  success: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14562',
  error: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14559',
  warning: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14560',
  loading: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=421-14561',
} as const;

const MESSAGE_COPY: Record<DsToastMessageType, string> = {
  normal: 'This is a normal message',
  success: 'This is a success message',
  error: 'This is a error message',
  warning: 'This is a warning message',
  loading: 'Loading message',
};

interface ToastStoryProps {
  messageText?: string;
  duration?: number;
}

function BasicDemo({ messageText, duration }: ToastStoryProps) {
  const toast = useDsToastMessage();

  return (
    <DsButton
      variant="primary"
      label="Display normal message"
      onClick={() =>
        toast.normal(messageText ?? MESSAGE_COPY.normal, { duration })
      }
    />
  );
}

function MessageTypesDemo() {
  const toast = useDsToastMessage();

  return (
    <div className="ds-toast-message-stories-row">
      <DsButton
        variant="secondary"
        label="Success"
        onClick={() => toast.success(MESSAGE_COPY.success)}
      />
      <DsButton
        variant="secondary"
        label="Error"
        onClick={() => toast.error(MESSAGE_COPY.error)}
      />
      <DsButton
        variant="secondary"
        label="Warning"
        onClick={() => toast.warning(MESSAGE_COPY.warning)}
      />
      <DsButton
        variant="secondary"
        label="Loading"
        onClick={() => {
          const hide = toast.loading(MESSAGE_COPY.loading, { duration: 0 });
          window.setTimeout(hide, 2500);
        }}
      />
    </div>
  );
}

const meta: Meta<ToastStoryProps> = {
  title: 'Components/Toast Message',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Toast Message** — Ant Design `App.useApp().message` with Figma dark bar (48px, #191B1E).',
      },
    },
    design: { type: 'figma', url: FIGMA.canvas },
  },
  decorators: [
    (Story) => (
      <ToastMessageThemeProvider>
        <Story />
      </ToastMessageThemeProvider>
    ),
  ],
  args: {
    messageText: MESSAGE_COPY.normal,
    duration: 3,
  },
  argTypes: {
    messageText: { control: 'text', description: 'Toast body copy' },
    duration: { control: 'number', description: 'Display duration (seconds)' },
  },
};

export default meta;
type Story = StoryObj<ToastStoryProps>;

/** Primary button — click to show info toast from the top. */
export const Basic: Story = {
  render: (args) => <BasicDemo {...args} />,
  parameters: {
    design: { type: 'figma', url: FIGMA.normal },
    docs: {
      description: {
        story:
          'Click **Display normal message** — an info toast slides in from the top: “This is a normal message”.',
      },
    },
  },
};

/** Secondary buttons for success, error, warning, and loading toasts. */
export const MessageTypes: Story = {
  render: () => <MessageTypesDemo />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA.canvas },
    docs: {
      description: {
        story:
          'Secondary buttons trigger **success**, **error**, **warning**, and **loading** toasts with Figma copy.',
      },
    },
  },
};
