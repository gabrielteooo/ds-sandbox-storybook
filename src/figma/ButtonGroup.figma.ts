// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=3126-27821
// source=src/components/Button/component.tsx
// component=DsButtonGroup
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('Type', {
  Primary: 'primary',
  Default: 'secondary',
});
const size = instance.getEnum('Size', {
  Default: 'default',
  Small: 'small',
  Large: 'large',
});
const direction = instance.getEnum('Direction', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});

export default {
  example: figma.code`
    <DsButtonGroup
      variant="${variant}"
      size="${size}"
      direction="${direction}"
    />
  `,
  imports: ["import { DsButtonGroup } from '../../components/Button'"],
  id: 'ds-button-group',
};
