import { Layout } from 'antd';
const { Footer } = Layout;

export default function LayoutHeader() {
  const dispatch = useAppDispatch();

  const handleChangelang = (lng: any) => {
    dispatch(setLanguage(lng));
  };

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
