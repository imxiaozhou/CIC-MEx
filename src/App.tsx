import { Suspense } from 'react';
import { ConfigProvider, type ConfigProviderProps } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/index';
import Loading from '@/components/Loading';
import i18n from '@/locales';

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
