/** Figma Form / Login (22726:4626) — spacing from Form / Login node */
export const DS_FORM_PANEL = {
  /** Outer padding on Basic: Login canvas */
  loginPaddingPx: 24,
  /** Gap between username, password, utility row, and actions block */
  itemGapPx: 24,
  /** Gap between full-width Log in button and “Or Register now!” row */
  actionsGapPx: 4,
  /** Gap between “Or” label and register link */
  registerGapPx: 4,
  /** Field width — matches Input / Select default (360px) */
  fieldWidthPx: 360,
  /** Login form field width (inputs stretch to 100%) */
  loginWidthPx: 360,
  /** Figma Input / Basic & Password — Base 40px */
  inputHeightPx: 40,
  inputFontSizePx: 16,
  inputLineHeightPx: 24,
  /** Figma Basic text field canvas (22737:7148) */
  basicTextPaddingPx: 40,
  /** Figma Form / Vertical gallery (515:43856) */
  variantsWidthPx: 360,
  variantsPaddingPx: 24,
  labelToControlGapPx: 8,
  /** Figma Input Label Vertical — info / help icon (16px) */
  labelInfoIconSizePx: 16,
  labelHelpIconSizePx: 16,
  /** Figma Input Caption — 2px top padding */
  captionPaddingTopPx: 2,
  textareaHeightPx: 64,
} as const;

/** Form outer width = field width + horizontal padding (box-sizing: border-box). */
export function dsFormOuterWidthPx(
  fieldWidthPx: number,
  paddingPx: number,
): number {
  return fieldWidthPx + paddingPx * 2;
}

/** Slider marks on variants form (Figma 22737:6240) */
export const DS_FORM_VARIANTS_SLIDER_MARKS: Record<number, string> = {
  0: '0',
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
};
