import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DsButton } from '../../src/components/Button';
import {
  DsModal,
  DS_MODAL_INFORMATION_STATUSES,
  DS_MODAL_RESULT_STATUSES,
  DS_MODAL_VARIANTS,
  type DsModalProps,
  type DsModalInformationStatus,
  type DsModalResultStatus,
} from '../../src/components/Modal';
import './component.stories.css';

const FIGMA = {
  componentSet:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=2914-74905',
  basic:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=22759-715',
  information:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=422-13525',
  results:
    'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=423-364',
} as const;

const INFORMATION_LABELS: Record<DsModalInformationStatus, string> = {
  info: 'Info',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
};

const RESULT_LABELS: Record<DsModalResultStatus, string> = {
  success: 'Success',
  info: 'Info',
  warning: 'Warning',
  delete: 'Delete',
  error: 'Error',
};

const meta: Meta<DsModalProps> = {
  title: 'Components/Modal',
  component: DsModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Modal** (Ant Design + tokens). **Basic** = title, body, Cancel/OK footer, close icon (2914:74905). **Information** = status icon + title/body + footer (422:13514). **Results** = centred outcome layout with large status icon (423:364).',
      },
    },
    design: { type: 'figma', url: FIGMA.componentSet },
  },
  args: {
    variant: 'basic',
    status: 'info',
    open: false,
    title: 'Modal title',
    okText: 'OK',
    cancelText: 'Cancel',
    centered: false,
    destroyOnClose: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: DS_MODAL_VARIANTS,
      description: 'Basic = standard dialog; Information = inline status; Results = centred outcome.',
    },
    status: {
      control: 'select',
      options: [...DS_MODAL_INFORMATION_STATUSES, ...DS_MODAL_RESULT_STATUSES],
      description: 'Status icon and colour for information or results variants.',
    },
    caption: {
      control: 'text',
      description: 'Secondary caption below body (results/success).',
    },
    errorItems: { table: { disable: true } },
    open: {
      control: 'boolean',
      description: 'Whether the modal is visible.',
    },
    title: {
      control: 'text',
      description: 'Modal heading.',
    },
    content: {
      control: 'text',
      description: 'Body copy (alias for children).',
    },
    okText: {
      control: 'text',
      description: 'Primary footer button label.',
    },
    cancelText: {
      control: 'text',
      description: 'Secondary footer button label.',
    },
    centered: {
      control: 'boolean',
      description:
        'Vertically centre the modal. Default is false — modal sits top-centre at ~25% from the viewport top.',
    },
    closable: {
      control: 'boolean',
      description: 'Show close icon (default: true for basic, false for information).',
    },
    width: {
      control: 'number',
      description: 'Modal width in px (default: 520 basic, 400 information, 628 results).',
    },
    onOk: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    destroyOnClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<DsModalProps>;

/**
 * Figma 22759:715 — click "Open basic modal" to show a centred dialog
 * with mask overlay, title, body, close icon, and Cancel/OK footer.
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="ds-modal-story-basic">
        <DsButton
          variant="primary"
          size="small"
          label="Open basic modal"
          onClick={() => setOpen(true)}
        />
        <DsModal
          {...args}
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.basic },
    docs: {
      description: {
        story:
          'Interactive basic modal — click the trigger button to open a top-centre dialog (~25% from top) with mask. Matches Figma 22759:715.',
      },
    },
  },
};

/**
 * Figma 422:13525 — four buttons each open an information modal
 * with the matching status icon (Info, Error, Success, Warning).
 */
export const Information: Story = {
  args: {
    variant: 'information',
  },
  render: (args) => {
    const [openStatus, setOpenStatus] = useState<DsModalInformationStatus | null>(null);

    return (
      <div className="ds-modal-story-information">
        <div className="ds-modal-story-information__buttons">
          {DS_MODAL_INFORMATION_STATUSES.map((status) => (
            <DsButton
              key={status}
              variant="secondary"
              size="small"
              label={INFORMATION_LABELS[status]}
              onClick={() => setOpenStatus(status)}
            />
          ))}
        </div>
        {DS_MODAL_INFORMATION_STATUSES.map((status) => (
          <DsModal
            key={status}
            {...args}
            status={status}
            open={openStatus === status}
            onCancel={() => setOpenStatus(null)}
            onOk={() => setOpenStatus(null)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.information },
    docs: {
      description: {
        story:
          'Information modals — click Info, Error, Success, or Warning to open the matching status dialog. Matches Figma 422:13525.',
      },
    },
  },
};

/**
 * Figma 423:364 — five buttons each open a results modal
 * (Success, Info, Warning, Delete, Error) with token-mapped status colours.
 */
export const Results: Story = {
  args: {
    variant: 'results',
  },
  render: (args) => {
    const [openStatus, setOpenStatus] = useState<DsModalResultStatus | null>(null);

    return (
      <div className="ds-modal-story-information">
        <div className="ds-modal-story-information__buttons">
          {DS_MODAL_RESULT_STATUSES.map((status) => (
            <DsButton
              key={status}
              variant="secondary"
              size="small"
              label={RESULT_LABELS[status]}
              onClick={() => setOpenStatus(status)}
            />
          ))}
        </div>
        {DS_MODAL_RESULT_STATUSES.map((status) => (
          <DsModal
            key={status}
            {...args}
            status={status}
            open={openStatus === status}
            onCancel={() => setOpenStatus(null)}
            onOk={() => setOpenStatus(null)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.results },
    docs: {
      description: {
        story:
          'Results modals — click Success, Info, Warning, Delete, or Error to open the matching centred outcome dialog. Matches Figma 423:364.',
      },
    },
  },
};
