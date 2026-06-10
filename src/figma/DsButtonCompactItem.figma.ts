// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=3126-25865
// source=src/components/Button/DsButtonCompactItem.tsx
// component=DsButtonCompactItem
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Primary: 'primary',
  Default: 'secondary',
});
const size = instance.getEnum('Size', {
  Default: 'small',
  Small: 'x-small',
  Large: 'base',
});

const buttonInstance = instance.findInstance('Button');
let buttonCode = figma.code`<DsButton variant="${type}" size="${size}" label="Button" />`;

if (buttonInstance && buttonInstance.type === 'INSTANCE') {
  const template = buttonInstance.executeTemplate();
  if (template.example) {
    buttonCode = template.example;
  }
}

export default {
  example: figma.code`
    <DsButtonCompactItem>
      ${buttonCode}
    </DsButtonCompactItem>
  `,
  imports: [
    "import { DsButton, DsButtonCompactItem } from '../../components/Button'",
  ],
  id: 'ds-button-compact-item',
  metadata: { nestable: true },
};
