import { Form } from 'antd';
import type { FormProps } from 'antd';
import type { ReactNode } from 'react';
import { DsButton } from '../Button/component';
import { DsCheckbox } from '../Checkbox/component';
import { DsInput } from '../Input/component';
import '../Button/component.css';
import '../Checkbox/component.css';
import '../Input/component.css';
import { DS_FORM_PANEL, dsFormOuterWidthPx } from './formPanelMetrics';
import './component.css';

/** Figma Form layouts (516:42634 vertical login) */
export type DsFormLayout = 'vertical' | 'horizontal' | 'inline';

export const DS_FORM_LAYOUTS: DsFormLayout[] = ['vertical', 'horizontal', 'inline'];

export interface DsFormProps extends Omit<FormProps, 'children'> {
  layout?: DsFormLayout;
  className?: string;
  children?: ReactNode;
}

export interface DsLoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export interface DsLoginFormProps {
  className?: string;
  disabled?: boolean;
  initialValues?: Partial<DsLoginFormValues>;
  onFinish?: (values: DsLoginFormValues) => void;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  rememberLabel?: string;
  forgotPasswordLabel?: string;
  forgotPasswordHref?: string;
  submitLabel?: string;
  registerPrefix?: string;
  registerLabel?: string;
  registerHref?: string;
  showRemember?: boolean;
  showForgotPassword?: boolean;
  showRegister?: boolean;
}

function formRootClass(layout: DsFormLayout, className?: string) {
  return ['ds-form', `ds-form--${layout}`, className].filter(Boolean).join(' ');
}

export function DsForm({ layout = 'vertical', className, ...formProps }: DsFormProps) {
  return (
    <Form
      layout={layout}
      className={formRootClass(layout, className)}
      {...formProps}
    />
  );
}

export function DsLoginForm({
  className,
  disabled = false,
  initialValues,
  onFinish,
  usernamePlaceholder = 'Username',
  passwordPlaceholder = 'Password',
  rememberLabel = 'Remember me',
  forgotPasswordLabel = 'Forgot password',
  forgotPasswordHref = '#',
  submitLabel = 'Log in',
  registerPrefix = 'Or',
  registerLabel = 'Register now!',
  registerHref = '#',
  showRemember = true,
  showForgotPassword = true,
  showRegister = true,
}: DsLoginFormProps) {
  return (
    <DsForm
      name="ds-login"
      layout="vertical"
      className={['ds-form--login', className].filter(Boolean).join(' ')}
      style={{
        maxWidth: dsFormOuterWidthPx(
          DS_FORM_PANEL.loginWidthPx,
          DS_FORM_PANEL.loginPaddingPx,
        ),
      }}
      initialValues={{ remember: true, ...initialValues }}
      onFinish={onFinish}
      disabled={disabled}
      requiredMark={false}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <DsInput
          kind="basic"
          size="base"
          placeholder={usernamePlaceholder}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <DsInput
          kind="password"
          size="base"
          placeholder={passwordPlaceholder}
          disabled={disabled}
        />
      </Form.Item>

      {(showRemember || showForgotPassword) && (
        <Form.Item className="ds-form__utility-item">
          <div className="ds-form__utility-row">
            {showRemember ? (
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <DsCheckbox label={rememberLabel} disabled={disabled} />
              </Form.Item>
            ) : (
              <span />
            )}
            {showForgotPassword ? (
              <a
                className="ds-form__link ds-form__link--forgot text-sm-normal"
                href={forgotPasswordHref}
              >
                {forgotPasswordLabel}
              </a>
            ) : null}
          </div>
        </Form.Item>
      )}

      <Form.Item className="ds-form__actions-item">
        <div className="ds-form__actions">
          <div className="ds-form__submit">
            <DsButton
              variant="primary"
              size="small"
              label={submitLabel}
              htmlType="submit"
              disabled={disabled}
            />
          </div>
          {showRegister ? (
            <div className="ds-form__register">
              <span className="ds-form__register-prefix text-sm-normal">
                {registerPrefix}
              </span>
              <a
                className="ds-form__link ds-form__link--register"
                href={registerHref}
              >
                {registerLabel}
              </a>
            </div>
          ) : null}
        </div>
      </Form.Item>
    </DsForm>
  );
}

export default DsForm;
