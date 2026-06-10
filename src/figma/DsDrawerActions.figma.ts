// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=7031-61749
// source=src/components/Drawer/DsDrawerActions.tsx
// component=DsDrawerActions
import figma from 'figma';

const instance = figma.selectedInstance;

const tertiaryBtn = instance.findInstance('Tertiary Button');
const secondaryBtn = instance.findInstance('Secondary Button');
const primaryBtn = instance.findInstance('Primary Button');

const cancelText = tertiaryBtn?.getString('Button Text') ?? 'Cancel';
const secondaryActionLabel = secondaryBtn?.getString('Button Text') ?? 'Button';
const primaryActionLabel = primaryBtn?.getString('Button Text') ?? 'Button';

export default {
  example: figma.code`
    <DsDrawerActions
      cancelText="${cancelText}"
      secondaryActionLabel="${secondaryActionLabel}"
      primaryActionLabel="${primaryActionLabel}"
    />
  `,
  imports: ["import { DsDrawerActions } from '../../components/Drawer'"],
  id: 'ds-drawer-actions',
  metadata: { nestable: true },
};
