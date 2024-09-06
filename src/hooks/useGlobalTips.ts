import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

const message = {} as unknown as MessageInstance;
const notification = {} as unknown as NotificationInstance;
const modal = {} as unknown as Omit<ModalStaticFunctions, 'warn'>;

export default function useGlobalTips() {
  const staticFunction = App.useApp();
  Object.assign(message, staticFunction.message);
  Object.assign(modal, staticFunction.modal);
  return null;
}

export { message, notification, modal };
