import { Button, Tooltip } from 'antd';
import { CustomIcon, CustomModal } from '@/components/proComponents';

export default function LogOut() {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const handleLogout = (): void => {
   
  };
  const $t = useTranslations();
  return (
    <>
      <Tooltip title={$t('Log Out')}>
        <Button
          size="large"
          type="text"
          icon={<CustomIcon name="Logout" />}
          onClick={() => setIsLogout(true)}
          style={{ display: 'flex' }}
          className="toolbar-item-hover"
        />
      </Tooltip>
      <CustomModal
        title={$t('Are you sure to logout?')}
        open={isLogout}
        type="warning"
        onOk={handleLogout}
        onCancel={() => setIsLogout(false)}
      />
    </>
  );
}
