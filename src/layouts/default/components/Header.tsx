import { Button, Layout } from 'antd';
const { Header } = Layout;

export default function LayoutHeader() {
  const dispatch = useAppDispatch();
  const $t = useTranslations();
  const handleChangelang = (lng: any) => {
    dispatch(setLanguage(lng));
  };

  return (
    <Header
      style={{
        background: 'green',
        height: '3vh',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button type="link" style={{ color: '#fff' }}>
        {$t('Text')}
      </Button>
      <Button
        type="link"
        style={{ color: '#fff' }}
        onClick={() => handleChangelang('hk')}
      >
        繁
      </Button>
      <Button
        type="link"
        style={{ color: '#fff' }}
        onClick={() => handleChangelang('cn')}
      >
        简
      </Button>
      <Button
        type="link"
        style={{ color: '#fff' }}
        onClick={() => handleChangelang('en')}
      >
        英
      </Button>
    </Header>
  );
}
