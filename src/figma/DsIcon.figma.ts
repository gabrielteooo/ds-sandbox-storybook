// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=472-11122
// source=src/icons/DsIcon.tsx
// component=DsIcon
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('Type', {
  Solid: 'solid',
  Regular: 'regular',
  Light: 'light',
});

// Figma stores FA glyphs as unicode in the "icon" text layer; map via layer name in Dev Mode.
// Default to magnifying-glass — the icon used on Button instances in this library.
const iconText = instance.findText('icon');
const name = iconText && iconText.type !== 'ERROR' ? 'magnifying-glass' : 'magnifying-glass';

export default {
  example: figma.code`<DsIcon name="${name}" variant="${variant}" />`,
  imports: ["import { DsIcon } from '../icons/DsIcon'"],
  id: 'ds-icon',
  metadata: { nestable: true },
};
