/** Default menu options (5 items — no scrollbar until a 6th is added). */
export const DS_SELECT_DEFAULT_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'carrot', label: 'Carrot' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
] as const;

/** Demo list with 8 items — scrollbar appears (listHeight shows 5 rows). */
export const DS_SELECT_SCROLL_OPTIONS = [
  ...DS_SELECT_DEFAULT_OPTIONS,
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

/** Figma menu row height 40px × 5 visible rows */
export const DS_SELECT_LIST_HEIGHT = 200;
