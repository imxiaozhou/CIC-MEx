import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { Header, Content, NavHeader, Footer } from './components';
import { menus, type MenuItem } from '@/config/menuConfig';
import { flatArrTree } from '@/utils/utils';

export default function DefaultLayout() {
  const { pathname } = useLocation();

  const flatMenus = flatArrTree('children', undefined, menus) as MenuItem[];

  const currentRouterLayoutType =
    flatMenus.filter((i) => i.key === pathname)?.[0]?.['layout'] ?? 'default';
  console.log(currentRouterLayoutType, 'currentRouterLayoutType');

  const isContentLayout = currentRouterLayoutType === 'content';

  return (
    <>
      <Header />
      <Layout
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Layout style={{ marginTop: 10 }}>
          <NavHeader />
          <Layout>
            <Content isContentLayout={isContentLayout} />
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
