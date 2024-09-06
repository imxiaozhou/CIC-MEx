import {  Layout, theme } from 'antd';
import Logo from './Logo';
const { Header } = Layout;

interface Props {
  isNewWindow: boolean;
}
export default function LayoutHeader() {
  const {
    token: { colorBgContainer, colorBorderSecondary }
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: '0 24px',
        backgroundColor: colorBgContainer,
        borderBottom: `1px solid ${colorBorderSecondary}`,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 998
      }}
    >
      <Logo />
    </Header>
  );
}
