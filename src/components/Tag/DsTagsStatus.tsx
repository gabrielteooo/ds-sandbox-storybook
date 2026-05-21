import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { DsTag } from './component';

export interface DsTagsStatusProps {
  className?: string;
}

/** Figma 22688:25062 — semantic status tags with icons */
export function DsTagsStatus({ className }: DsTagsStatusProps) {
  return (
    <div className={['ds-tags-status', className].filter(Boolean).join(' ')}>
      <DsTag status="default" icon={<MinusCircleOutlined />}>
        Default
      </DsTag>
      <DsTag status="processing" icon={<SyncOutlined spin />}>
        Processing
      </DsTag>
      <DsTag status="success" icon={<CheckCircleOutlined />}>
        Success
      </DsTag>
      <DsTag status="warning" icon={<ExclamationCircleOutlined />}>
        Warning
      </DsTag>
      <DsTag status="error" icon={<CloseCircleOutlined />}>
        Error
      </DsTag>
    </div>
  );
}

export default DsTagsStatus;
