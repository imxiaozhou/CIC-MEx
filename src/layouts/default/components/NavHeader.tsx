import { Avatar, Button, Flex } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import NoticesDropdown from './HeaderActions/NoticeIcon';

export default function LayoutHeader() {
  const navigate = useNavigate();
  const locatiom = useLocation();
  const isLogin = locatiom.pathname !== '/login' && locatiom.pathname !== '/';
  const buttonStyle = { color: '#000' };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const goMaterial = () => {
    navigate('/material-exchange');
  };

  return (
    <Flex justify="space-between" align="center" style={{ height: '10vh' }}>
      <div>
        <img
          alt="MEx"
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <Button type="link" style={buttonStyle} onClick={goMaterial}>
            {isLogin ? 'Material Exchange' : 'Material Exchange Features'}
          </Button>
          <Button
            type="link"
            style={buttonStyle}
            onClick={isLogin ? () => navigate('/dashboard') : undefined}
          >
            {isLogin ? 'Dashboard' : 'Features'}
          </Button>
          <Button
            type="link"
            style={buttonStyle}
            onClick={isLogin ? () => navigate('/my-listings') : undefined}
          >
            {isLogin ? 'My Listings' : 'How to Use'}
          </Button>
          {isLogin && (
            <Button
              type="link"
              style={buttonStyle}
              onClick={() => navigate('/my-watchlist')}
            >
              My Watchlist
            </Button>
          )}
          <Button
            type="link"
            style={buttonStyle}
            onClick={isLogin ? () => navigate('/faqs') : undefined}
          >
            {isLogin ? 'FAQ' : 'About Us'}
          </Button>
        </div>
      </div>

      {/* 右侧内容 */}
      <Flex
        justify="space-between"
        align="center"
        style={{ height: '10vh', display: 'flex', flexDirection: 'row' }}
      >
        {isLogin ? (
          <Flex style={{ marginRight: '8px' }}>
            <NoticesDropdown />
            <NoticesDropdown />
            <Avatar size={32} icon="user" style={{ marginTop: '4px' }} />
          </Flex>
        ) : (
          <>
            <Button
              onClick={handleSignUp}
              type="link"
              style={{ marginRight: '8px', color: '#000' }}
            >
              Sign Up
            </Button>
            <Button
              onClick={handleLogin}
              type="link"
              style={{ marginRight: '8px', color: '#000' }}
            >
              Login
            </Button>
          </>
        )}
        <Button type="primary" style={{ background: '#FF6617' }}>
          List Your Material
        </Button>
      </Flex>
    </Flex>
  );
}
