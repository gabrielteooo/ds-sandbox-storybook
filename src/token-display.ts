/** Storybook display label — strips leading `--` from CSS custom property names */
export function formatTokenDisplay(cssVar: string): string {
  return cssVar.replace(/^--/, '');
}
