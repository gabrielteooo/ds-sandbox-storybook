// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=508-37318
// source=src/components/Alert/component.tsx
// component=DsAlert
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Error: 'error',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
});
const showIcon = instance.getBoolean('Icon');
const showDescription = instance.getBoolean('description');
const closable = instance.getBoolean('Close Icon');

export default {
  example: figma.code`
    <DsAlert
      layout="basic"
      type="${type}"
      showIcon={${showIcon}}
      showDescription={${showDescription}}
      closable={${closable}}
    />
  `,
  imports: ["import { DsAlert } from '../../components/Alert'"],
  id: 'ds-alert',
  metadata: { nestable: true },
};
