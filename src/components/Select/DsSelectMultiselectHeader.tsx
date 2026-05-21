export interface DsSelectMultiselectHeaderProps {
  onSelectAll: () => void;
  onClearAll: () => void;
}

/** Figma Select menu 4171:8655 — multiselect header actions */
export function DsSelectMultiselectHeader({
  onSelectAll,
  onClearAll,
}: DsSelectMultiselectHeaderProps) {
  return (
    <div className="ds-select-menu-header">
      <button
        type="button"
        className="ds-select-menu-header__action"
        onClick={onSelectAll}
      >
        Select all
      </button>
      <button
        type="button"
        className="ds-select-menu-header__action"
        onClick={onClearAll}
      >
        Clear all
      </button>
    </div>
  );
}

export default DsSelectMultiselectHeader;
