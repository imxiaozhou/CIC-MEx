import { notificationProps } from '@/config/common';
import { notification, type NotificationArgsProps } from 'antd';
import CustomIcon from '../CustomIcon';
import './index.less';

interface InfoProps extends NotificationArgsProps {
  iconType: 'refresh' | 'junk' | 'deleted' | 'upload' | 'copy' | 'download';
}
interface SuccessProps extends NotificationArgsProps {
  iconType?: 'tickfilled' | 'upload' | 'tag' | 'restore' | 'download';
}

const CustomNotification = () => {
  return {
    success: (props: SuccessProps): number => {
      const key = new Date().getTime();

      const iconMap = {
        tickfilled: { key: 'TickFilled', custom: 'transparent' },
        upload: { key: 'Attachment', custom: '#ffffff' },
        tag: { key: 'Tag', custom: '#ffffff' },
        restore: { key: 'Restore', custom: '#ffffff' },
        download: { key: 'Download', custom: '#ffffff' }
      };

      const iconType = props.iconType ?? 'tickfilled';
      notification.success({
        ...notificationProps,
        ...props,
        icon: (
          <CustomIcon
            name={iconMap[iconType].key}
            custom={iconMap[iconType].custom}
            className={iconType === 'tickfilled' ? 'setFillColorWhite' : ''}
            isNeedScale={iconType === 'upload'}
          />
        ),
        key: key
      });

      return key;
    },
    info: (props: InfoProps): number => {
      const key = new Date().getTime();

      const iconMap = {
        refresh: { key: 'Refreshing', custom: '#0A52C6' },
        junk: { key: 'Junk', custom: '#ffffff' },
        deleted: { key: 'Deleted', custom: '#ffffff' },
        upload: { key: 'Attachment', custom: '#ffffff' },
        copy: { key: 'Copy', custom: '#fff' },
        download: { key: 'Download', custom: '#ffffff' }
      };
      notification.info({
        ...notificationProps,
        ...props,
        icon: (
          <CustomIcon
            name={iconMap[props.iconType].key}
            custom={iconMap[props.iconType].custom}
            isNeedScale={true}
          />
        ),
        key: key
      });

      return key;
    },
    warning: (props: NotificationArgsProps): number => {
      const key = new Date().getTime();
      notification.warning({
        ...notificationProps,
        ...props,
        icon: <CustomIcon name="InfoFilled" />,
        key: key
      });

      return key;
    },
    error: (props: NotificationArgsProps): number => {
      const key = new Date().getTime();
      notification.error({
        ...notificationProps,
        ...props,
        icon: <CustomIcon name="AlertTriangle" custom="#fff" />,
        key: key
      });

      return key;
    },

    destroy: (key?: number) => {
      if (key) {
        // 关闭单个notification
        notification.destroy(key);
      } else {
        // 关闭全部notification
        notification.destroy();
      }
    }
  };
};

export default CustomNotification();
