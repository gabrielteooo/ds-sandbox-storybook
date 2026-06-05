import { Dropdown } from 'antd';
import type { DropdownProps, MenuProps } from 'antd';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { DsIconChevronDown } from '../../icons';
import { DS_DROPDOWN_PANEL } from './dropdownPanelMetrics';
import { DropdownThemeProvider } from './DropdownThemeProvider';
import './component.css';

export { DS_DROPDOWN_PANEL } from './dropdownPanelMetrics';
export { DropdownThemeProvider } from './DropdownThemeProvider';

/** Single dropdown menu item — mirrors Ant MenuItemType with explicit typing. */
export interface DsDropdownItem {
  key: string;
  /** Label displayed in the menu item. */
  label: ReactNode;
  /** Optional FA icon node (e.g. <DsIconUser />). */
  icon?: ReactNode;
  disabled?: boolean;
  /** Renders the item in the danger/error colour palette. */
  danger?: boolean;
  /** Click handler — receives Ant MenuInfo. */
  onClick?: () => void;
}

export interface DsDropdownDivider {
  type: 'divider';
  key?: string;
}

export type DsDropdownMenuEntry = DsDropdownItem | DsDropdownDivider;

export interface DsDropdownProps {
  /** Menu items array. */
  items: DsDropdownMenuEntry[];
  /** Text shown in the default trigger button. */
  label?: string;
  /** Currently selected item keys (controlled). */
  selectedKeys?: string[];
  /** Disable the trigger button. */
  disabled?: boolean;
  placement?: DropdownProps['placement'];
  /** Defaults to click to match Figma primary interaction. */
  trigger?: DropdownProps['trigger'];
  open?: boolean;
  onOpenChange?: DropdownProps['onOpenChange'];
  /** Override the default trigger with a custom element. */
  children?: ReactNode;
  className?: string;
}

export interface DsDropdownTriggerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/**
 * Default trigger — secondary small button with trailing chevron-down.
 * Matches Figma 371:10124 (default) and 22754:15462 (pressed/open).
 * Must forward ref so Ant Dropdown can attach click handlers.
 */
export const DsDropdownTriggerButton = forwardRef<
  HTMLButtonElement,
  DsDropdownTriggerButtonProps
>(function DsDropdownTriggerButton(
  { label = 'Dropdown', disabled = false, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={[
        'ds-dropdown-trigger',
        disabled ? 'ds-dropdown-trigger--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="ds-dropdown-trigger__label">{label}</span>
      <DsIconChevronDown size={14} className="ds-dropdown-trigger__chevron" />
    </button>
  );
});

export function DsDropdown({
  items,
  label = 'Dropdown',
  selectedKeys,
  disabled = false,
  placement = 'bottomLeft',
  trigger = ['click'],
  open,
  onOpenChange,
  children,
  className,
}: DsDropdownProps) {
  const menuItems: MenuProps['items'] = items.map((entry) => {
    if ('type' in entry && entry.type === 'divider') {
      return { type: 'divider', key: entry.key ?? `divider-${Math.random()}` };
    }
    const item = entry as DsDropdownItem;
    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      disabled: item.disabled,
      danger: item.danger,
      onClick: item.onClick ? () => item.onClick!() : undefined,
    };
  });

  return (
    <DropdownThemeProvider>
      <Dropdown
        className={['ds-dropdown', className].filter(Boolean).join(' ')}
        overlayClassName="ds-dropdown-overlay"
        menu={{
          items: menuItems,
          selectedKeys,
        }}
        placement={placement}
        trigger={trigger}
        align={{ offset: [0, DS_DROPDOWN_PANEL.menuGapPx] }}
        open={open}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        {children ?? <DsDropdownTriggerButton label={label} disabled={disabled} />}
      </Dropdown>
    </DropdownThemeProvider>
  );
}

export default DsDropdown;
