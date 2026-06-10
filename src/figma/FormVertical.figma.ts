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

const showLabel =
  instance.getEnum('Label', { True: true, False: false }) ??
  instance.getBoolean('Label') ??
  true;
const showCaption =
  instance.getEnum('Caption', { True: true, False: false }) ??
  instance.getBoolean('Caption') ??
  false;

const labelBlock = instance.findInstance('Input Label Vertical');

let label = 'Input Label';
let mark: string = 'none';
let showTooltip = false;
let showHelpIcon = false;

if (labelBlock && labelBlock.type === 'INSTANCE') {
  label = labelBlock.getString('Text') ?? label;
  const labelMark = labelBlock.getEnum('Mark', {
    None: 'none',
    Optional: 'optional',
    Required: 'required',
  });
  if (labelMark) mark = labelMark;
  showTooltip =
    labelBlock.getEnum('Tooltip', {
      True: true,
      False: false,
    }) ?? false;
  showHelpIcon = labelBlock.getBoolean('Show help icon') ?? false;
}

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
