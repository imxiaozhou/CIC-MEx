import dayjs from 'dayjs';
import { Suspense } from 'react';
import { ConfigProvider, type ConfigProviderProps } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/index';
import Loading from '@/components/Loading';
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
  const lang = useAppSelector(selectLanguage);
  return (
    <ConfigProvider locale={locales[lang] as unknown as Locale}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  );
}

export default AdminApp;
