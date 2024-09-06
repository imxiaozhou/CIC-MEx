import { Link } from 'react-router-dom';
import { Space, Typography, Image } from 'antd';

const { Title } = Typography;

export default function LayoutLogo() {
  const themeColor = useAppSelector(selectThemeColor);
  const $t = useTranslations();
  // true - 展示logo图片   false -不展示logo图片
  const [showImg, setShowImg] = useState<boolean>(true);
  return (
    <Link className="logo" to="/inbox">
      <Space>
        {showImg ? (
          <Image
            src="/sma-adm/public/service/sma-web-logo"
            alt="avatar"
            onError={() => {
              setShowImg(false);
            }}
            preview={false}
            style={{
              width: 72,
              height: 40,
              borderRadius: 4,
              overflow: 'hidden'
            }}
          />
        ) : null}
        <Title className="logo_text" level={5} style={{ color: themeColor }}>
          {$t('Secure Messaging Application')}
        </Title>
      </Space>
    </Link>
  );
}
