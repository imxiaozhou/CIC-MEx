export interface DataItem {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: string;
  userName: string;
  email: string;
  tenantName: string;
  position: string;
  notificationTemplateType: 'SYSTEM' | 'TENANT';
  notificationType: string;
}

export interface IconItemsType {
  icon: 'SettingOutlined' | 'EyeOutlined';
  color: string;
  type: 'SYSTEM' | 'TENANT';
  background: string;
}

export const iconItems: IconItemsType[] = [
  {
    icon: 'SettingOutlined',
    color: '#403294',
    type: 'SYSTEM',
    background: '#EAE6FF'
  },
  {
    icon: 'EyeOutlined',
    color: '#00804A',
    type: 'TENANT',
    background: '#E3FCEB'
  }
];
