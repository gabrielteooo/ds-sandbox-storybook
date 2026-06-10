// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-43856
// source=src/components/Form/formVertical.tsx
// component=FormVertical
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Text: 'Text',
  'Read-only': 'Read-only',
  Password: 'Password',
  Phone: 'Phone',
  Textarea: 'Textarea',
  Select: 'Select',
  DatePicker: 'DatePicker',
  TimePicker: 'TimePicker',
  InputNumber: 'InputNumber',
  Switch: 'Switch',
  Button: 'Button',
  Currency: 'Currency',
  Slider: 'Slider',
  'Drag and Drop': 'Drag and Drop',
  'Radio Buttons': 'Radio Buttons',
  'Radio Group': 'Radio Group',
  'Checkbox Group': 'Checkbox Group',
});
const showLabel = instance.getBoolean('Label') ?? true;
const showCaption = instance.getBoolean('Caption') ?? false;

const labelBlock = instance.findInstance('Input Label Vertical');
const label = labelBlock?.getString('Text') ?? 'Input Label';
const mark = labelBlock?.getEnum('Mark', {
  None: 'none',
  Optional: 'optional',
  Required: 'required',
}) ?? 'none';
const showTooltip = labelBlock?.getEnum('Tooltip', {
  True: true,
  False: false,
}) ?? false;
const showHelpIcon = labelBlock?.getBoolean('Show help icon') ?? false;

export default {
  example: figma.code`
    <FormThemeProvider>
      <FormVertical
        type="${type}"
        label="${label}"
        mark="${mark}"
        showLabel={${showLabel}}
        showTooltip={${showTooltip}}
        showHelpIcon={${showHelpIcon}}
        caption={${showCaption}}
      />
    </FormThemeProvider>
  `,
  imports: [
    "import { FormVertical, FormThemeProvider } from '../../components/Form'",
  ],
  id: 'form-vertical',
  metadata: { nestable: true },
};
