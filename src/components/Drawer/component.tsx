import { Drawer } from 'antd';
import type { DrawerProps } from 'antd';
import type { ReactNode } from 'react';
import { DsIconClose } from '../../icons';
import { DsDrawerActions } from './DsDrawerActions';
import { DsDrawerHeader } from './DsDrawerHeader';
import { DrawerThemeProvider } from './DrawerThemeProvider';
import { DS_DRAWER_PANEL } from './drawerPanelMetrics';
import './component.css';

export { DS_DRAWER_PANEL } from './drawerPanelMetrics';
export { DrawerThemeProvider } from './DrawerThemeProvider';
export { DsDrawerActions, type DsDrawerActionsProps } from './DsDrawerActions';
export { DsDrawerHeader, type DsDrawerHeaderProps } from './DsDrawerHeader';

const DEFAULT_BODY =
  'Drawer content area — replace with your form, details, or workflow steps.';

export interface DsDrawerProps {
  open: boolean;
  title?: ReactNode;
  children?: ReactNode;
  /** Body copy; alias for `children`. */
  content?: ReactNode;
  placement?: Extract<DrawerProps['placement'], 'right'>;
  width?: number;
  showFooter?: boolean;
  cancelText?: string;
  secondaryActionLabel?: string;
  primaryActionLabel?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
  maskClosable?: boolean;
  closable?: boolean;
  destroyOnClose?: boolean;
  /** Custom footer — replaces default Drawer_Actions when provided. */
  footer?: ReactNode;
  className?: string;
}

export function DsDrawer({
  open,
  title = 'Title',
  children,
  content,
  placement = 'right',
  width = DS_DRAWER_PANEL.widthPx,
  showFooter = true,
  cancelText = 'Cancel',
  secondaryActionLabel = 'Button',
  primaryActionLabel = 'Button',
  onClose,
  onCancel,
  onSecondaryAction,
  onPrimaryAction,
  maskClosable = true,
  closable = true,
  destroyOnClose = true,
  footer,
  className,
}: DsDrawerProps) {
  const handleCancel = onCancel ?? onClose;

  const drawerFooter =
    showFooter &&
    (footer ?? (
      <DsDrawerActions
        cancelText={cancelText}
        secondaryActionLabel={secondaryActionLabel}
        primaryActionLabel={primaryActionLabel}
        onCancel={handleCancel}
        onSecondaryAction={onSecondaryAction}
        onPrimaryAction={onPrimaryAction}
      />
    ));

  const drawerProps: DrawerProps = {
    className: ['ds-drawer', className].filter(Boolean).join(' '),
    open,
    placement,
    width,
    title: <DsDrawerHeader title={title} />,
    closeIcon: (
      <span className="ds-drawer__close-icon" aria-hidden>
        <DsIconClose size={DS_DRAWER_PANEL.closeIconSizePx} />
      </span>
    ),
    onClose,
    maskClosable,
    closable,
    destroyOnClose,
    footer: drawerFooter || null,
    children: (
      <div className="ds-drawer__body-content text-base-normal">
        {children ?? content ?? DEFAULT_BODY}
      </div>
    ),
  };

  return (
    <DrawerThemeProvider>
      <Drawer {...drawerProps} />
    </DrawerThemeProvider>
  );
}

export default DsDrawer;
