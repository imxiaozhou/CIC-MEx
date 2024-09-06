import { Dropdown, Button, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CustomIcon, CustomNotification } from '@/components/proComponents';

const { Title, Text } = Typography;

const enum HelpCenterMenuKeys {
  HelpCenter = 'HELP CENTER',
  FAQs = 'FAQs',
  ContactUs = 'CONTACT US'
}

export default function HelpCenter() {
  const navigate = useNavigate();

  const colorPrimary = useAppSelector(selectThemeColor);

  const items: MenuProps['items'] = [
    {
      key: HelpCenterMenuKeys.HelpCenter,
      icon: <CustomIcon name="HelpCircle" />,
      label: (
        <Title level={5} style={{ fontWeight: 'bold' }}>
          {$t('Help Center')}
        </Title>
      )
    },
    {
      key: HelpCenterMenuKeys.FAQs,
      icon: <CustomIcon name="Info" />,
      label: <Text>{$t('FAQs')}</Text>
    },
    {
      type: 'divider'
    },
    {
      key: HelpCenterMenuKeys.ContactUs,
      label: (
        <>
          <Title level={5}>{$t('Contact Us')}</Title>
          <Space align="center">
            <CustomIcon name="Mail" />
            <Text style={{ color: colorPrimary, cursor: 'pointer' }}>
              enquiry@sma_ogcio.gover.hk
            </Text>
          </Space>
        </>
      )
    }
  ];

  const handleMenuClick = (e: { key: any }): void => {
    switch (e.key) {
      case HelpCenterMenuKeys.HelpCenter:
        navigate('/help-center');
        break;
      case HelpCenterMenuKeys.FAQs:
        navigate('/FAQs');
        break;
      case HelpCenterMenuKeys.ContactUs:
        navigator.clipboard.writeText('enquiry@sma_ogcio.gover.hk').then(() => {
          CustomNotification.info({
            message: $t('The email address has been copied'),
            iconType: 'copy',
            duration: 2
          });
        });
        break;
    }
  };

  return (
    <Dropdown
      arrow
      placement="bottom"
      menu={{
        items,
        onClick: handleMenuClick
      }}
    >
      <Button
        size="large"
        type="text"
        icon={<CustomIcon name="HelpCircle" />}
        style={{ display: 'flex' }}
        className="toolbar-item-hover"
      />
    </Dropdown>
  );
}
