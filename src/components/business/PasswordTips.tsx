import { getGlobalParameter } from '@/services/user';
import { Typography } from 'antd';

const { Paragraph, Text } = Typography;

const PasswordTips: React.FC = () => {
  const { sanitize } = useSanitize();
  const [passwordTips, setPasswordTips] = useState<any>();

  const getPasswordPolicyTip = async (): Promise<void> => {
    const { glbPrmValue5 } = await getGlobalParameter({
      type: 'FAQ_SUPPORT',
      code: 'PASSWORD_POLICY'
    });
    setPasswordTips(glbPrmValue5);
  };

  useEffect(() => {
    getPasswordPolicyTip();
  }, []);
  return (
    <Paragraph>
      <Text style={{ fontWeight: 600 }}>{$t('Password Tips')}</Text>
      <div dangerouslySetInnerHTML={{ __html: sanitize(passwordTips) }} />
    </Paragraph>
  );
};

export default PasswordTips;
