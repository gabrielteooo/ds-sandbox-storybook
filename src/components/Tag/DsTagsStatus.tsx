import {
  DsIconCheckCircle,
  DsIconCloseCircle,
  DsIconExclamationCircle,
  DsIconMinusCircle,
  DsIconSync,
} from '../../icons';
import { DsTag } from './component';

export interface DsTagsStatusProps {
  className?: string;
}

/** Figma 22688:25062 — semantic status tags with icons */
export function DsTagsStatus({ className }: DsTagsStatusProps) {
  return (
    <div className={['ds-tags-status', className].filter(Boolean).join(' ')}>
      <DsTag status="default" icon={<DsIconMinusCircle />}>
        Default
      </DsTag>
      <DsTag status="processing" icon={<DsIconSync />}>
        Processing
      </DsTag>
      <DsTag status="success" icon={<DsIconCheckCircle />}>
        Success
      </DsTag>
      <DsTag status="warning" icon={<DsIconExclamationCircle />}>
        Warning
      </DsTag>
      <DsTag status="error" icon={<DsIconCloseCircle />}>
        Error
      </DsTag>
    </div>
  );
}

export default DsTagsStatus;
