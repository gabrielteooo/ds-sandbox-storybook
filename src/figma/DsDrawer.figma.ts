// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=513-39439
// source=src/components/Drawer/component.tsx
// component=DsDrawer
import figma from 'figma';

const instance = figma.selectedInstance;

const placement = instance.getEnum('Placement', {
  Right: 'right',
  Left: 'left',
  Top: 'top',
  Bottom: 'bottom',
}) ?? 'right';
const title = instance.getString('Title');
const closable = instance.getBoolean('Close Icon');
const showSecondary = instance.getBoolean('Button Outline');
const showPrimary = instance.getBoolean('Button Primary');
const showFooter = showSecondary || showPrimary;

const actions = instance.findInstance('Drawer_Actions');
const tertiaryBtn = actions?.findInstance('Tertiary Button');
const secondaryBtn = actions?.findInstance('Secondary Button');
const primaryBtn = actions?.findInstance('Primary Button');

const cancelText = tertiaryBtn?.getString('Button Text') ?? 'Cancel';
const secondaryActionLabel = secondaryBtn?.getString('Button Text') ?? 'Button';
const primaryActionLabel = primaryBtn?.getString('Button Text') ?? 'Button';

export default {
  example: figma.code`
    <DsDrawer
      open={true}
      title="${title}"
      placement="${placement}"
      closable={${closable}}
      showFooter={${showFooter}}
      cancelText="${cancelText}"
      secondaryActionLabel="${secondaryActionLabel}"
      primaryActionLabel="${primaryActionLabel}"
      onClose={() => {}}
    />
  `,
  imports: ["import { DsDrawer } from '../../components/Drawer'"],
  id: 'ds-drawer',
};
