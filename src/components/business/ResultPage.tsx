import { Result, Layout, theme, Image } from 'antd';
import { Logo } from '@/layouts/default/components';
const { Header } = Layout;

interface Iprops {
  title: string;
  subTitle: string;
  img: string;
}
export default function ResultPage({ title, subTitle, img }: Readonly<Iprops>) {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const $t = useTranslations();

  return (
    <Layout
      className="web-result-page"
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: colorBgContainer
      }}
    >
      <Header
        style={{
          padding: '0 24px',
          display: 'flex',
          backgroundColor: colorBgContainer,
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 998
        }}
      >
        <Logo />
      </Header>
      <Result
        icon={<Image src={img} preview={false} width={320} />}
        title={$t(title)}
        subTitle={$t(subTitle)}
      />
    </Layout>
  );
}
