import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { Header,  Content, NavHeader } from './components';
import { menus, type MenuItem } from '@/config/menuConfig';
import { flatArrTree } from '@/utils/utils';

export default function DefaultLayout() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const flatMenus = flatArrTree('children', undefined, menus) as MenuItem[];

  const currentRouterLayoutType =
    flatMenus.filter((i) => i.key === pathname)?.[0]?.['layout'] ?? 'default';

  const isContentLayout = currentRouterLayoutType === 'content';

  const isDetailPath = pathname.includes('detail');




  return (
    <>
      <Header  />
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Layout
          style={{
            display: 'flex',
            overflowY: 'hidden',
            height: 'calc(100vh - 64px)',
            flex: 1
          }}
        >
          <NavHeader
          />
          <Layout style={{ height: '100%' }}>
         <Content isContentLayout={isContentLayout} />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
