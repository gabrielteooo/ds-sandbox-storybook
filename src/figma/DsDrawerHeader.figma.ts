// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=7031-61723
// source=src/components/Drawer/DsDrawerHeader.tsx
// component=DsDrawerHeader
import figma from 'figma';

const instance = figma.selectedInstance;
const titleText = instance.findOne({ name: 'Drawer Title', type: 'TEXT' });
const title = titleText?.characters ?? 'Title';

export default {
  example: figma.code`
    <DsDrawerHeader title="${title}" />
  `,
  imports: ["import { DsDrawerHeader } from '../../components/Drawer'"],
  id: 'ds-drawer-header',
  metadata: { nestable: true },
};
