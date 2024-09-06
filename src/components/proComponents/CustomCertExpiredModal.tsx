import CustomModal from './CustomModal';
import { Typography, Button, Space } from 'antd';

const { Title, Text } = Typography;

interface Props {
  isCmType: boolean;
  certExpiredModalOpen: boolean;
  setCertExpiredModalOpen: (b: boolean) => void;
}
const CertExpiredModal = ({
  isCmType = false,
  certExpiredModalOpen,
  setCertExpiredModalOpen
}: Props) => {
  return (
    <CustomModal
      type="warning"
      title={
        <Title level={4} style={{ fontWeight: 700 }}>
          {isCmType
            ? $t('CM Certificate Expired')
            : $t('RM Certificate Expired')}
        </Title>
      }
      open={certExpiredModalOpen}
      footer={
        <Button
          type="primary"
          onClick={() => {
            setCertExpiredModalOpen(false);
          }}
          style={{ width: 160, textAlign: 'center' }}
        >
          {$t('OK')}
        </Button>
      }
      onCancel={() => setCertExpiredModalOpen(false)}
      width={784}
      content={
        <Space direction="vertical" align="center">
          <Title level={5}>
            {$t(
              'Your message certification has expired, preventing you from composing new messages. Please contact your admin to renew it.'
            )}
          </Title>
        </Space>
      }
    />
  );
};

export default CertExpiredModal;
