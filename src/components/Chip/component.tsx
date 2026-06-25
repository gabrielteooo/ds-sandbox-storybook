import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { useState } from 'react';
import { ChipThemeProvider } from './ChipThemeProvider';
import { DsChipBadge } from './DsChipBadge';
import { DS_CHIP_PANEL, type DsChipSize } from './chipPanelMetrics';
import './component.css';

export { DS_CHIP_PANEL } from './chipPanelMetrics';
export { ChipThemeProvider } from './ChipThemeProvider';
export { DsChipBadge, type DsChipBadgeProps } from './DsChipBadge';
export { DS_CHIP_SIZES, type DsChipSize } from './chipPanelMetrics';

const DEFAULT_LABEL = 'Overdue EDO';

export interface DsChipProps {
  label?: string;
  /** Figma Size=Base | Small. */
  size?: DsChipSize;
  /** Figma With Badge=yes — leading count pill (base) or dot indicator (small). */
  withBadge?: boolean;
  badgeCount?: number | string;
  disabled?: boolean;
  /** Figma State=Pressed — selected / active filter chip. */
  selected?: boolean;
  defaultSelected?: boolean;
  onClick?: ButtonProps['onClick'];
  className?: string;
}

function chipClass(
  size: DsChipSize,
  withBadge: boolean,
  disabled: boolean,
  selected: boolean,
  className?: string,
) {
  return [
    'ds-chip',
    `ds-chip--${size}`,
    withBadge ? 'ds-chip--with-badge' : 'ds-chip--text-only',
    disabled ? 'ds-chip--disabled' : '',
    selected ? 'ds-chip--selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function labelClass(size: DsChipSize, selected: boolean) {
  if (size === 'small') {
    return 'ds-chip__label text-sm-strong';
  }

  return selected ? 'ds-chip__label text-base-strong' : 'ds-chip__label text-base-normal';
}

function mapSizeToAnt(size: DsChipSize): ButtonProps['size'] {
  return size === 'small' ? 'middle' : 'large';
}

export function DsChip({
  label = DEFAULT_LABEL,
  size = 'base',
  withBadge = true,
  badgeCount = 24,
  disabled = false,
  selected: selectedProp,
  defaultSelected = false,
  onClick,
  className,
}: DsChipProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selected = selectedProp ?? internalSelected;

  const handleClick: ButtonProps['onClick'] = (event) => {
    if (disabled) return;
    if (selectedProp === undefined) {
      setInternalSelected((prev) => !prev);
    }
    onClick?.(event);
  };

  return (
    <ChipThemeProvider>
      <span className={chipClass(size, withBadge, disabled, selected, className)}>
        <Button
          type="default"
          size={mapSizeToAnt(size)}
          disabled={disabled}
          aria-pressed={selected}
          onClick={handleClick}
        >
          {withBadge ? (
            <DsChipBadge size={size} count={badgeCount} disabled={disabled} />
          ) : null}
          <span className={labelClass(size, selected)}>{label}</span>
        </Button>
      </span>
    </ChipThemeProvider>
  );
}

export default DsChip;
