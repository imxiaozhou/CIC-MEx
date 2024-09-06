import dayjs from 'dayjs';
import { Suspense } from 'react';
import { ConfigProvider, type ConfigProviderProps } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/index';
import Loading from '@/components/Loading';
import useGlobalTips from '@/hooks/useGlobalTips';
import i18n from './locales';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Locale = ConfigProviderProps['locale'];

const locales = i18n.store.data;

function AdminApp() {
  useGlobalTips();
  const lang = useAppSelector(selectLanguage);

  useEffect(() => {
    i18n.changeLanguage(lang);
    dayjs.locale(lang === 'hk' ? 'zh-hk' : lang);
  }, [lang]);

  return (
    <ConfigProvider
      locale={locales[lang] as unknown as Locale}
      input={{ autoComplete: 'off' }}
    >
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  );
}

export default AdminApp;
