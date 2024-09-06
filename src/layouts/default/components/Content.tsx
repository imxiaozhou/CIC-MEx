import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { ScrollBars, SkeletonNoSelected } from '@/components/proComponents';

const { Content } = Layout;

interface Props {
  isContentLayout: boolean;
}

export default function LayoutContent({ isContentLayout }: Readonly<Props>) {
  return (
    <Content
      className="site-content"
      style={isContentLayout ? { marginLeft: 12 } : {}}
    >
      <ScrollBars>
        <Suspense fallback={<SkeletonNoSelected />}>
          <Outlet />
        </Suspense>
      </ScrollBars>
    </Content>
  );
}
