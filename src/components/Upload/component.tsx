import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import {
  mapSizeToAntProps,
  type DsButtonSize,
} from '../Button/component';
import { DS_UPLOAD_PANEL } from './uploadPanelMetrics';
import '../Button/component.css';
import './component.css';

/** Figma Upload / Button + Upload / drag and drop */
export type DsUploadVariant = 'button' | 'dragger';
export type DsUploadSize = 'small' | 'base' | 'large';
export type DsUploadStatus = 'default' | 'error';

export const DS_UPLOAD_VARIANTS: DsUploadVariant[] = ['button', 'dragger'];
export const DS_UPLOAD_SIZES: DsUploadSize[] = ['small', 'base', 'large'];
export const DS_UPLOAD_STATUSES: DsUploadStatus[] = ['default', 'error'];

const DEFAULT_LABEL = 'Upload';
const DEFAULT_DRAGGER_TITLE = 'Click or drag file to this area to upload';
const DEFAULT_DRAGGER_HINT = 'Support for a single or bulk upload.';

export interface DsUploadProps
  extends Omit<UploadProps, 'type' | 'children' | 'status'> {
  variant?: DsUploadVariant;
  /** Figma Upload / Button — Small 24 / Base 32 / Large 40 */
  size?: DsUploadSize;
  label?: string;
  draggerTitle?: string;
  draggerHint?: string;
  /** Figma drag-and-drop error caption (19825:31709) */
  errorMessage?: string;
  status?: DsUploadStatus;
  className?: string;
}

export function mapUploadSizeToButtonSize(size: DsUploadSize): DsButtonSize {
  switch (size) {
    case 'small':
      return 'x-small';
    case 'base':
      return 'small';
    case 'large':
      return 'base';
  }
}

function uploadRootClass(
  variant: DsUploadVariant,
  size: DsUploadSize,
  status: DsUploadStatus,
  className?: string,
) {
  return [
    'ds-upload',
    `ds-upload--${variant}`,
    variant === 'button' ? `ds-upload--${size}` : '',
    status === 'error' ? 'ds-upload--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function UploadTrigger({
  size,
  label,
  disabled,
}: {
  size: DsUploadSize;
  label: string;
  disabled?: boolean;
}) {
  const buttonSize = mapUploadSizeToButtonSize(size);
  const antSize = mapSizeToAntProps(buttonSize);

  return (
    <span
      className={[
        'ds-upload__trigger',
        'ds-button',
        `ds-button--${buttonSize}`,
        'ds-button--secondary',
      ].join(' ')}
    >
      <Button {...antSize} icon={<UploadOutlined />} disabled={disabled}>
        {label}
      </Button>
    </span>
  );
}

function DraggerContent({
  draggerTitle,
  draggerHint,
}: {
  draggerTitle: string;
  draggerHint: string;
}) {
  return (
    <>
      <p className="ds-upload__dragger-icon">
        <UploadOutlined />
      </p>
      <div className="ds-upload__dragger-text">
        <p className="ds-upload__dragger-title text-base-normal">{draggerTitle}</p>
        <p className="ds-upload__dragger-hint text-xs-normal">{draggerHint}</p>
      </div>
    </>
  );
}

export function DsUpload({
  variant = 'button',
  size = 'base',
  label = DEFAULT_LABEL,
  draggerTitle = DEFAULT_DRAGGER_TITLE,
  draggerHint = DEFAULT_DRAGGER_HINT,
  errorMessage,
  status = 'default',
  className,
  showUploadList = true,
  listType = 'text',
  beforeUpload,
  action,
  customRequest,
  disabled,
  ...uploadProps
}: DsUploadProps) {
  const rootClass = uploadRootClass(variant, size, status, className);

  const mergedBeforeUpload: UploadProps['beforeUpload'] = (file, fileList) => {
    if (beforeUpload) {
      return beforeUpload(file, fileList);
    }
    if (!action && !customRequest) {
      return false;
    }
    return true;
  };

  const commonProps: UploadProps = {
    showUploadList,
    listType,
    beforeUpload: mergedBeforeUpload,
    action,
    customRequest,
    disabled,
    ...uploadProps,
  };

  if (variant === 'dragger') {
    return (
      <div className={rootClass} style={{ maxWidth: DS_UPLOAD_PANEL.draggerWidthPx }}>
        <Upload.Dragger {...commonProps} className="ds-upload__dragger">
          <DraggerContent draggerTitle={draggerTitle} draggerHint={draggerHint} />
        </Upload.Dragger>
        {status === 'error' && errorMessage ? (
          <p className="ds-upload__error text-xs-normal">{errorMessage}</p>
        ) : null}
      </div>
    );
  }

  return (
    <Upload {...commonProps} className={rootClass}>
      <UploadTrigger size={size} label={label} disabled={disabled} />
    </Upload>
  );
}

export default DsUpload;
