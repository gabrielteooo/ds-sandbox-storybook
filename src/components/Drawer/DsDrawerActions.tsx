import type { ReactNode } from 'react';
import { DsButton } from '../Button/component';
import '../Button/component.css';

export interface DsDrawerActionsProps {
  cancelText?: string;
  secondaryActionLabel?: string;
  primaryActionLabel?: string;
  onCancel?: () => void;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
  /** Optional custom footer content — replaces default action buttons when set. */
  children?: ReactNode;
  className?: string;
}

/** Figma Drawer_Actions 7031:61749 */
export function DsDrawerActions({
  cancelText = 'Cancel',
  secondaryActionLabel = 'Button',
  primaryActionLabel = 'Button',
  onCancel,
  onSecondaryAction,
  onPrimaryAction,
  children,
  className,
}: DsDrawerActionsProps) {
  if (children) {
    return (
      <div className={['ds-drawer-actions', className].filter(Boolean).join(' ')}>
        {children}
      </div>
    );
  }

  return (
    <div className={['ds-drawer-actions', className].filter(Boolean).join(' ')}>
      <div className="ds-drawer-actions__lhs">
        <DsButton
          variant="tertiary"
          size="base"
          label={cancelText}
          onClick={onCancel}
        />
      </div>
      <div className="ds-drawer-actions__rhs">
        <DsButton
          variant="secondary"
          size="base"
          label={secondaryActionLabel}
          onClick={onSecondaryAction}
        />
        <DsButton
          variant="primary"
          size="base"
          label={primaryActionLabel}
          onClick={onPrimaryAction}
        />
      </div>
    </div>
  );
}
