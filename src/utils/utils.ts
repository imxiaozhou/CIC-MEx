import axios from 'axios';
import { CustomNotification } from '@/components/proComponents';
import { AppDispatch, store } from '@/store';

export const CM_RM_STATUS = {
  CM: 'CONFIDENTIAL',
  RM: 'RESTRICTED'
};

export const CM_RM_TYPE = {
  cm: 'CM',
  rm: 'RM'
};

export const CREATE_EMAIL_TYPE = {
  createCm: 'CreateCm',
  createRm: 'CreateRm',
  draft: 'Draft',
  upgradation: 'Upgradation',
  reply: 'Reply',
  replyAll: 'ReplyAll',
  forward: 'Forward'
};

export const getMessageTypeLabel = (key: string) => {
  if (!key) {
    return '';
  }
  return CM_RM_STATUS[key as 'CM' | 'RM'];
};

export const cmIsStatus = (value: string) => value === CM_RM_TYPE.cm;
export const rmIsStatus = (value: string) => value === CM_RM_TYPE.rm;

export function isLightMode(
  appearance: 'light' | 'realDark' | 'system'
): boolean {
  let theme = appearance === 'light' ? 'light' : 'realDark';
  return theme === 'light';
}

/**
 * 扁平化树数据为数组
 * @param data
 * @param nodeKey
 * @returns
 */
export function flatArrTree(
  nodeKey: string,
  parent: string | undefined,
  data: object[] = []
) {
  let newData = JSON.parse(JSON.stringify(data));
  if (newData.length === 0) {
    return [];
  }
  let arr: Object[] = [];
  for (let leaf of newData) {
    const child = leaf[nodeKey];
    if (child) {
      const flatChild: Object[] = flatArrTree(nodeKey, leaf.key, child);
      delete leaf[nodeKey];
      arr = [...arr, { ...leaf, _parent_: parent }, ...flatChild];
    } else {
      arr.push({ ...leaf, _parent_: parent });
    }
  }
  return arr;
}

export const getUserProfileUrl = (email: string) => {
  const { origin } = location;
  let curOrigin =
    import.meta.env.MODE === 'development'
      ? 'http://10.89.104.58:8000'
      : origin;
  let imgUrl = `${curOrigin}/sma-adm/api/mail/sma-preview-user-profile-pic?email=${email}&timestamp=${new Date().getTime()}`;
  return imgUrl;
};

// 切换菜单/ 侧边标签时，重置邮件列表的筛选参数等等, 重置search的搜索参数




export const downloadFiles = (href: string, fileName: string): void => {
  const minDisplayTime = 500;
  const startTime = Date.now();

  const notificationKey = CustomNotification.info({
    message: $t('Downloading 1 attachment...'),
    iconType: 'download'
  });

  axios
    .get(href, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('tokens') as string)?.token
        }`
      }
    })
    .then((response) => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

      setTimeout(() => {
        CustomNotification.destroy(notificationKey);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        CustomNotification.success({
          message: $t('Downloaded 1 attachment.'),
          iconType: 'download'
        });
      }, remainingTime);
    })
    .catch(() => {
      CustomNotification.destroy(notificationKey);

      CustomNotification.error({
        message: $t('Downloaded 1 attachment failed'),
        duration: 2
      });
    });
};
