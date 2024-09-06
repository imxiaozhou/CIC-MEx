import { Link } from 'react-router-dom';
import { Space, Typography, Image } from 'antd';

const { Title } = Typography;

export default function LayoutLogo() {
  const themeColor = useAppSelector(selectThemeColor);
  const $t = useTranslations();
  // true - 展示logo图片   false -不展示logo图片
  return (
    <Link className="logo" to="/inbox">
      <Space>
        <Title className="logo_text" level={5} style={{ color: themeColor }}>
          {$t('MEx')}
        </Title>
      </Space>
    </Link>
  );
}
