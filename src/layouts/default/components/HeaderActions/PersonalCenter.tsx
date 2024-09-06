import { Dropdown, Tooltip, Flex, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CustomIcon, FontSize, UserAvatar } from '@/components/proComponents';
import { CertificateDetails } from '@/components/business';
import { isCertificateExpired } from '@/utils';

const { Title, Text } = Typography;

const enum PersonalCenterMenuKeys {
  MyInfo = 'MY INFO',
  MyProfile = 'MY PROFILE',
  Setting = 'SETTING'
}

export default function PersonalCenterEntry() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useAppSelector(selectUserInfo);
  const cmCertificate = currentUser?.cmCertificate;
  const rmCertificate = currentUser?.rmCertificate;
  const isCmExpired = isCertificateExpired(cmCertificate);
  const isRmExpired = isCertificateExpired(rmCertificate);
  const showRound =
    (!cmCertificate && !rmCertificate) || isCmExpired || isRmExpired;

  const items: MenuProps['items'] = [
    {
      key: PersonalCenterMenuKeys.MyInfo,
      label: (
        <div style={{ display: 'inline-flex' }}>
          <div
            style={{
              marginRight: 10,
              position: 'relative',
              top: 15
            }}
          >
            <UserAvatar
              size={40}
              style={{ fontWeight: 700 }}
              user={{
                profileImageUrl: currentUser.profileImageUrl,
                profileImageDisplayName: currentUser.profileImageDisplayName
              }}
            />
          </div>

          <div>
            <Title level={4} style={{ fontWeight: 'bold' }}>
              {currentUser?.displayName}
            </Title>
            <Flex align="center">
              <Text>{currentUser?.emailAddress}</Text>
              <Tooltip title={$t('Certificate Details')}>
                <Text>
                  <CustomIcon
                    style={{
                      marginLeft: 5,
                      backgroundColor: showRound ? 'none' : '#E3FCEB',
                      borderRadius: '50%',
                      padding: 10,
                      transform: showRound ? 'none' : 'scale(.65)'
                    }}
                    name={showRound ? 'Round' : 'Award'}
                    custom={showRound ? '#EF1111' : '#006644'}
                    onClick={() => {
                      if (cmCertificate || rmCertificate) setIsOpen(true);
                    }}
                  />
                </Text>
              </Tooltip>
            </Flex>
          </div>
        </div>
      ),
      disabled: true
    },
    {
      key: PersonalCenterMenuKeys.MyProfile,
      icon: <CustomIcon name="User" />,
      label: (
        <FontSize size="s">
          <Text style={{ marginLeft: 10 }}> {$t('View My Profile')}</Text>
        </FontSize>
      )
    },
    {
      key: PersonalCenterMenuKeys.Setting,
      icon: <CustomIcon name="Setting" />,
      label: (
        <FontSize size="s">
          <Text style={{ marginLeft: 10 }}>{$t('Setting')}</Text>
        </FontSize>
      )
    }
  ];

  return (
    <>
      <Dropdown
        arrow
        placement="bottom"
        menu={{
          items,
          onClick: (e) => {
            switch (e.key) {
              case PersonalCenterMenuKeys.MyProfile:
                navigate('/account/center');
                break;
              case PersonalCenterMenuKeys.Setting:
                navigate('/account/settings');
                break;
            }
          }
        }}
      >
        <div style={{ cursor: 'pointer' }}>
          <UserAvatar
            size={48}
            style={{
              fontWeight: 700,
              cursor: 'pointer'
            }}
            user={{
              profileImageUrl: currentUser.profileImageUrl,
              profileImageDisplayName: currentUser.profileImageDisplayName
            }}
          />
        </div>
      </Dropdown>

      <CertificateDetails
        open={isOpen}
        certificateId="1"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
