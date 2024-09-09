import { Layout } from 'antd';
const { Footer } = Layout;

export default function LayoutHeader() {
  return (
    <Footer
      style={{
        background: 'black',
        height: '8%',
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      Footer
    </Footer>
  );
}
