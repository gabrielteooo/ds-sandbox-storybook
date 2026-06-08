export const DS_TABLE_ROW_STATES = ['default', 'split', 'selected', 'error', 'disabled'] as const;
export type DsTableRowState = (typeof DS_TABLE_ROW_STATES)[number];

export const DS_TABLE_ROW_STATE_CLASS: Record<DsTableRowState, string> = {
  default: 'ds-table__row--default',
  split: 'ds-table__row--split',
  selected: 'ds-table__row--selected',
  error: 'ds-table__row--error',
  disabled: 'ds-table__row--disabled',
};

export function getDsTableRowClassName(state: DsTableRowState): string {
  return DS_TABLE_ROW_STATE_CLASS[state];
}
