// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=3126-27636
// source=src/components/Button/DsButtonCompactSeparator.tsx
// component=DsButtonCompactSeparator
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('Type', {
  Primary: 'primary',
  Default: 'secondary',
});
const orientation = instance.getEnum('Direction', {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
});

export default {
  example: figma.code`
    <DsButtonCompactSeparator
      variant="${variant}"
      orientation="${orientation}"
    />
  `,
  imports: [
    "import { DsButtonCompactSeparator } from '../../components/Button'",
  ],
  id: 'ds-button-compact-separator',
  metadata: { nestable: true },
};
