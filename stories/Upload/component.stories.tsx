import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { UploadFile } from 'antd';
import {
  DsUpload,
  DS_UPLOAD_SIZES,
  DS_UPLOAD_STATUSES,
  DS_UPLOAD_VARIANTS,
  UploadThemeProvider,
  type DsUploadProps,
  type DsUploadSize,
  type DsUploadVariant,
} from '../../src/components/Upload';
import './component.stories.css';

const FIGMA = {
  canvas: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=396-13801',
  button: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=397-12018',
  listItem: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=397-12034',
  dragger: 'https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=397-12043',
} as const;

const meta: Meta<DsUploadProps> = {
  title: 'Components/Upload',
  component: DsUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MCP DS Sandbox **Upload** — Ant Design `Upload` with Figma button trigger, text file list, and drag-and-drop area.',
      },
    },
    design: { type: 'figma', url: FIGMA.canvas },
  },
  decorators: [
    (Story) => (
      <UploadThemeProvider>
        <Story />
      </UploadThemeProvider>
    ),
  ],
  args: {
    variant: 'button',
    size: 'base',
    label: 'Upload',
    multiple: false,
    disabled: false,
    showUploadList: true,
    draggerTitle: 'Click or drag file to this area to upload',
    draggerHint: 'Support for a single or bulk upload.',
    status: 'default',
  },
  argTypes: {
    variant: { control: 'select', options: DS_UPLOAD_VARIANTS },
    size: { control: 'select', options: DS_UPLOAD_SIZES },
    status: { control: 'select', options: DS_UPLOAD_STATUSES },
    label: { control: 'text' },
    draggerTitle: { control: 'text' },
    draggerHint: { control: 'text' },
    errorMessage: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showUploadList: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DsUploadProps>;

function BasicDemo({
  size = 'base',
  label = 'Upload',
  multiple = false,
  disabled = false,
}: {
  size?: DsUploadSize;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <DsUpload
      variant="button"
      size={size}
      label={label}
      multiple={multiple}
      disabled={disabled}
      fileList={fileList}
      onChange={({ fileList: nextList }) => setFileList(nextList)}
    />
  );
}

function DragAndDropDemo({ multiple = true }: { multiple?: boolean }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <DsUpload
      variant="dragger"
      multiple={multiple}
      fileList={fileList}
      onChange={({ fileList: nextList }) => setFileList(nextList)}
    />
  );
}

/** Secondary upload button — selected files appear in the list below. */
export const Basic: Story = {
  render: (args) => (
    <BasicDemo
      size={args.size}
      label={args.label}
      multiple={args.multiple}
      disabled={args.disabled}
    />
  ),
  parameters: {
    design: { type: 'figma', url: FIGMA.button },
    docs: {
      description: {
        story:
          'Click **Upload** to pick a file. The file name appears below the button with a paperclip icon (Figma Upload List Item / Basic).',
      },
    },
  },
};

/** Drag-and-drop upload area with title and hint copy. */
export const DragAndDrop: Story = {
  render: (args) => <DragAndDropDemo multiple={args.multiple} />,
  args: {
    variant: 'dragger',
    multiple: true,
    status: 'default',
  },
  parameters: {
    design: { type: 'figma', url: FIGMA.dragger },
    docs: {
      description: {
        story:
          'Drag files into the dashed area or click to browse. Supports single or bulk upload per Figma copy.',
      },
    },
  },
};
