import React from 'react';
import { Button, Flex } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderAction: React.FC = () => {
  const navigate = useNavigate();
  const locatiom = useLocation();
  const isLogin = locatiom.pathname !== '/login' && locatiom.pathname !== '/home';
  //   const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  //   console.log(isAuthenticated,'isAuthenticated')


  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleListMaterial = () => {
    window.location.href = 'https://yourwebsite.com/list-material';
  };
  const goMaterial = () => {
    navigate('/mater');
  };

  return (
    <Flex justify='space-between' align='center'>
      <div>
        <img alt="MEx" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          {isLogin ?
            <Button type='link' style={{ color: '#000' }} onClick={goMaterial}>
              Material Exchange
            </Button> :
            <Button type='link' style={{ color: '#000' }} onClick={goMaterial}>
              Material Exchange Features
            </Button>
          }
          {
            isLogin ?
              <Button type='link' style={{ color: '#000' }}>
                Dashboard
              </Button> :
              <Button type='link' style={{ color: '#000' }}>
                Features
              </Button>
          }
          {
            isLogin ?
              <Button type='link' style={{ color: '#000' }}>
                My Listings
              </Button> :
              <Button type='link' style={{ color: '#000' }}>
                How to Use
              </Button>
          }
          {isLogin ?
            <Button type='link' style={{ color: '#000' }}>
              FAQ
            </Button> :
            <Button type='link' style={{ color: '#000' }}>
              About Us
            </Button>
          }

        </div>
      </div>

      {/* 右侧内容 */}
      <div>
        <Button onClick={handleSignUp} type="link" style={{ marginRight: '8px', color: '#000' }}>
          Sign Up
        </Button>
        <Button onClick={handleLogin} type="link" style={{ marginRight: '8px', color: '#000' }}>
          Login
        </Button>
        <Button onClick={handleListMaterial} type='primary' style={{ marginRight: '8px', background: '#FF6617' }}>
          List Your Material
        </Button>
      </div>
    </Flex>
  );
};

export default HeaderAction;