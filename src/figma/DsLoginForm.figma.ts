// url=https://www.figma.com/design/9EWHgAT1kDwK3NmfT8hBFk/MCP-DS-Sandbox?node-id=516-42635
// source=src/components/Form/component.tsx
// component=DsLoginForm
import figma from 'figma';

const instance = figma.selectedInstance;

const checkbox = instance.findInstance('Checkbox');
const rememberLabel = checkbox?.getString('Text') ?? 'Remember me';

const submitButton = instance.findInstance('Button');
const submitLabel = submitButton?.getString('Button Text') ?? 'Log in';

export default {
  example: figma.code`
    <FormThemeProvider>
      <DsLoginForm
        rememberLabel="${rememberLabel}"
        submitLabel="${submitLabel}"
        onFinish={(values) => console.log(values)}
      />
    </FormThemeProvider>
  `,
  imports: [
    "import { DsLoginForm, FormThemeProvider } from '../../components/Form'",
  ],
  id: 'ds-login-form',
};
