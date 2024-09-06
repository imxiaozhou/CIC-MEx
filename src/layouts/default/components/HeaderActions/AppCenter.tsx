import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CustomIcon } from '@/components/proComponents';
import { getGlobalParameter } from '@/services/user';
import { setAdminUrl, setUMAUrl } from '@/store/reducer/userSlice';

const enum AppCenterMenuKeys {
  MsgList = 'MSG LIST',
  UmaApp = 'UMA APP',
  AdminApp = 'ADMIN APP'
}

export default function AppCenter() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { adminUrl, umaUrl } = useAppSelector(selectUserReducer);

  const items: MenuProps['items'] = [
    {
      key: AppCenterMenuKeys.MsgList,
      label: $t('Message List'),
      icon: <CustomIcon name="Mail" />
    },
    {
      key: AppCenterMenuKeys.UmaApp,
      label: $t('UMA Application'),
      icon: <CustomIcon name="User" />
    },
    {
      key: AppCenterMenuKeys.AdminApp,
      label: $t('Web App for admin'),
      icon: <CustomIcon name="Grid" />
    }
  ];
  return (
    <Dropdown
      arrow
      placement="bottomRight"
      menu={{
        items,
        onClick: (e) => {
          switch (e.key) {
            case AppCenterMenuKeys.MsgList:
              navigate('/inbox');
              break;
            case AppCenterMenuKeys.UmaApp:
              if (umaUrl) {
                window.open(umaUrl);
              }
              break;
            case AppCenterMenuKeys.AdminApp:
              if (adminUrl) {
                window.open(adminUrl);
              }
              break;
          }
        }
      }}
    >
      <Button
        type="text"
        icon={<CustomIcon name="Grid" />}
        size="large"
        style={{ display: 'flex' }}
        className="toolbar-item-hover"
      />
    </Dropdown>
  );
}
