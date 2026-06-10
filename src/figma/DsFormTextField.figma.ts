// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=515-43853
// source=src/components/Form/DsFormTextField.tsx
// component=DsFormTextField
import figma from 'figma';

const instance = figma.selectedInstance;

const labelBlock = instance.findInstance('Input Label Vertical');
const label = labelBlock?.getString('Text') ?? 'Input Label';

const mark = labelBlock?.getEnum('Mark', {
  None: 'default',
  Optional: 'optional',
  Required: 'required',
});
const labelMode = mark ?? 'default';
const showTooltip = labelBlock?.getEnum('Tooltip', {
  True: true,
  False: false,
}) ?? false;
const showHelpIcon = labelBlock?.getBoolean('Show help icon') ?? false;

const input = instance.findInstance('Input / Basic');
const placeholder = input?.getString('Text') ?? 'Type here';

const captionBlock = instance.findInstance('Input Caption');
const caption = captionBlock?.getString('Text');
const showCaption = Boolean(captionBlock?.visible !== false && caption);
const captionStatus = captionBlock?.getEnum('Status', {
  Default: 'default',
  Error: 'error',
  Warning: 'warning',
}) ?? 'default';

export default {
  example: figma.code`
    <FormThemeProvider>
      <DsFormTextField
        label="${label}"
        labelMode="${labelMode}"
        placeholder="${placeholder}"
        showTooltip={${showTooltip}}
        showHelpIcon={${showHelpIcon}}
        ${showCaption ? figma.code`caption="${caption}"` : ''}
        ${showCaption ? figma.code`captionStatus="${captionStatus}"` : ''}
      />
    </FormThemeProvider>
  `,
  imports: [
    "import { DsFormTextField, FormThemeProvider } from '../../components/Form'",
  ],
  id: 'ds-form-text-field',
  metadata: { nestable: true },
};
