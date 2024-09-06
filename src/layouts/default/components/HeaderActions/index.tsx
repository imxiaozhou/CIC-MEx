import { Space } from 'antd';
import NoticeHeaderButton from './NoticeIcon';
import PersonalCenter from './PersonalCenter';
import HelpCenter from './HelpCenter';
import LogOut from './LogOut';
import AppCenter from './AppCenter';
import ZoomInAndOut from './ZoomInAndOut';

export default function HeaderActions() {
  return (
    <Space size={4}>
      <NoticeHeaderButton />
      <PersonalCenter />
      <HelpCenter />
      <LogOut />
      <AppCenter />
      <ZoomInAndOut />
    </Space>
  );
}
