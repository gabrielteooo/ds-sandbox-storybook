// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=388-11597
// source=src/components/Form/inputCaption.tsx
// component=InputCaption
import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getString('Text');
const status = instance.getEnum('Status', {
  Default: 'default',
  Error: 'error',
  Warning: 'warning',
});

export default {
  example: figma.code`
    <InputCaption text="${text}" status="${status}" />
  `,
  imports: ["import { InputCaption } from '../../components/Form/inputCaption'"],
  id: 'input-caption',
  metadata: { nestable: true },
};
