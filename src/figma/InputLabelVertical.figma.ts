// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=388-11598
// source=src/components/Form/inputLabelVertical.tsx
// component=InputLabelVertical
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Text');
const mark = instance.getEnum('Mark', {
  None: 'none',
  Optional: 'optional',
  Required: 'required',
});
const showTooltip = instance.getEnum('Tooltip', {
  True: true,
  False: false,
});
const showHelpIcon = instance.getBoolean('Show help icon');

export default {
  example: figma.code`
    <InputLabelVertical
      label="${label}"
      mark="${mark}"
      showTooltip={${showTooltip}}
      showHelpIcon={${showHelpIcon}}
    />
  `,
  imports: ["import { InputLabelVertical } from '../../components/Form/inputLabelVertical'"],
  id: 'input-label-vertical',
  metadata: { nestable: true },
};
