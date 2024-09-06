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
      style={{
        flex: '1',
        marginLeft: isContentLayout ? 12 : 0,
        overflowY: 'auto'
      }}
    >
      <ScrollBars>
        <Suspense fallback={<SkeletonNoSelected />}>
          <Outlet />
        </Suspense>
      </ScrollBars>
    </Content>
  );
}
