import { AppDispatch } from '@/store';
import config from '@/config';

export const handleInitSwitch = (dispatch: AppDispatch) => {
  dispatch(setSelectedEmail(null));
  dispatch(resetCheckedEmails());
  dispatch(
    setComposeMailDraftId({
      draftMessageId: '',
      messageType: '',
      createType: ''
    })
  );
};

export const getActualSystemMessageTag = (pathname: string) => {
  let systemMessageTag = 'Inbox';
  let path = '/inbox';
  Object.entries(config.systemMessageTag).some(([key, value]) => {
    if (pathname.includes(key)) {
      systemMessageTag = value;
      path = `/${key}`;
      return true;
    }
    return false;
  });
  // 注意，这里Junk还是需要保留之前的Spam
  if (systemMessageTag === 'Junk') {
    systemMessageTag = 'Spam';
  }
  return { systemMessageTag, path };
};
