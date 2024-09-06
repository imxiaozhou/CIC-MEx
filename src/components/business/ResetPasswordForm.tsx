import { ReactElement } from 'react';
import {
  ProForm,
  ProFormInstance,
  ProFormText
} from '@ant-design/pro-components';
import { PasswordTips } from '@/components/business';
import { changePassword, getPasswordPolicyRegex } from '@/services/layouts';

interface IResetPassword {
  formItemCol?: number;
  form: ProFormInstance;
  onFinished?: () => void;
}

const ResetPassword = (props: IResetPassword): ReactElement => {
  const { formItemCol = 12, onFinished, form } = props;
  const [passwordPolicyRegex, setPasswordPolicyRegex] = useState<string>('');

  const formItemLayout = {
    labelCol: { span: formItemCol },
    wrapperCol: { span: formItemCol }
  };

  const handleFinish = async (values: any) => {
    await changePassword({
      currentPassword: values.OldPassword,
      newPassword: values.Password,
      confirmNewPassword: values.ConfirmPassword
    }).then((res) => {
      const { code } = res.payload.data;
      if (code === '0') {
        onFinished?.();
      }
    });
  };

  const getRegex = async () => {
    const { data } = await getPasswordPolicyRegex();
    setPasswordPolicyRegex(data?.regex);
  };
  useEffect(() => {
    getRegex();
  }, []);

  return (
    <ProForm
      {...formItemLayout}
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      submitter={false}
    >
      <ProFormText.Password
        label={$t('Current password')}
        placeholder={$t('Please enter')}
        name="OldPassword"
        rules={[
          {
            required: true
          },
          {
            max: 48,
            message: $t('Unable to enter more than (0) characters', [48])
          }
        ]}
      />
      <ProFormText.Password
        label={$t('New password')}
        placeholder={$t('Please enter')}
        name="Password"
        rules={[
          {
            required: true
          },
          {
            max: 48,
            message: $t('Unable to enter more than (0) characters', [48])
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              // 检查新密码是否与旧密码相同
              if (value && getFieldValue('OldPassword') === value) {
                return Promise.reject(
                  new Error(
                    $t('Your new password cannot be same as old password')
                  )
                );
              }
              // 检查密码强度
              const passwordRule = new RegExp(passwordPolicyRegex);
              const isSecure = passwordRule.test(value);
              if (!isSecure) {
                return Promise.reject(
                  new Error(
                    $t('This password is not secure. Try a different password')
                  )
                );
              }

              return Promise.resolve();
            }
          })
        ]}
      />
      <PasswordTips />
      <ProFormText.Password
        label={$t('Confirm New Password')}
        placeholder={$t('Please enter')}
        name="ConfirmPassword"
        dependencies={['Password']}
        rules={[
          {
            required: true
          },
          {
            max: 48,
            message: $t('Unable to enter more than (0) characters', [48])
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value) {
                const passwordRule = new RegExp(passwordPolicyRegex);
                const isSecure = passwordRule.test(value);

                // 检查新密码和确认新密码是否匹配
                if (getFieldValue('Password') !== value) {
                  return Promise.reject(
                    new Error(
                      $t('New Password and Confirm New Password does not match')
                    )
                  );
                } else if (!isSecure) {
                  return Promise.reject(
                    new Error(
                      $t(
                        'This password is not secure. Try a different password'
                      )
                    )
                  );
                }
                return Promise.resolve();
              }
              return Promise.resolve();
            }
          })
        ]}
      />
    </ProForm>
  );
};

export default ResetPassword;
