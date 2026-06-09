// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=376-26847
// source=src/components/Button/component.tsx
// component=DsButton
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Button Text');
const variant = instance.getEnum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Link: 'link',
  Danger: 'danger',
});
const size = instance.getEnum('Size', {
  Base: 'base',
  Small: 'small',
  'X-Small': 'x-small',
});
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Focused: 'focused',
  Disabled: 'disabled',
});
const disabled = state === 'disabled';
const iconOnly = instance.getEnum('Content', {
  Basic: false,
  'Icon Only': true,
});
const hasIcon = instance.getBoolean('Icon');

const iconFrame = hasIcon || iconOnly ? instance.findInstance('icon frame') : null;
let iconCode;
if (iconFrame && iconFrame.type === 'INSTANCE') {
  iconCode = iconFrame.executeTemplate().example;
}

export default {
  example: figma.code`
    <DsButton
      variant="${variant}"
      size="${size}"
      label="${label}"
      iconOnly={${iconOnly}}
      disabled={${disabled}}
      ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    />
  `,
  imports: ["import { DsButton } from '../../components/Button'"],
  id: 'ds-button',
  metadata: { nestable: true },
};
