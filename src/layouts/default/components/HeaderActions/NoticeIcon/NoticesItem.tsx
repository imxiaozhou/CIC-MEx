import {
  Avatar,
  Card,
  Flex,
  ModalProps,
  Space,
  Typography,
  Button
} from 'antd';
import Icon from '@/components/Icons';
import { iconItems } from './type';
import './index.less';
import { UserAvatar } from '@/components/proComponents';

const { Title, Text } = Typography;

type CustomModalProps = ModalProps & {
  data: any;
  onBack: () => void;
};
const NoticesItem: React.FC<CustomModalProps> = (props) => {
  const { data, onBack } = props;
  let currentIcon = iconItems.find(
    (item) => item.type === data.notificationTemplateType
  );

  return (
    <Space direction="vertical" size={20}>
      <Button
        type="link"
        onClick={onBack}
        icon={<Icon type="LeftOutlined" />}
        style={{ paddingLeft: 0 }}
      >
        {$t('Back')}
      </Button>
      <Space size="small">
        <Avatar
          size={24}
          draggable={false}
          gap={0}
          style={{
            background: currentIcon?.background,
            fontSize: 16,
            lineHeight: '20px'
          }}
          icon={
            <Icon
              type={currentIcon?.icon}
              style={{ color: currentIcon?.color }}
            />
          }
        />
        <Title level={5} style={{ marginBottom: 0 }}>
          {data?.title}
        </Title>
      </Space>
      <Card style={{ width: 420 }}>
        <Flex gap="middle" align="center">
          <UserAvatar
            size={48}
            style={{
              fontWeight: 'bold',
              fontSize: '20px'
            }}
            user={{
              profileImageDisplayName: data.profileImageDisplayName,
              profileImageUrl: data.profileImageUrl
            }}
          />
          <Flex vertical={true}>
            <Text
              style={{
                fontSize: '16px',
                color: '#666869'
              }}
            >
              {data?.userName}
            </Text>
            <Text
              style={{
                fontSize: '14px',
                color: '#666869'
              }}
            >
              {data?.position} | {data?.tenantName}
            </Text>
            <Text
              style={{
                fontSize: '14px',
                color: '#666869'
              }}
            >
              {data?.email}
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Space direction="vertical" size={2}>
        {data?.content}
      </Space>
    </Space>
  );
};

export default NoticesItem;
