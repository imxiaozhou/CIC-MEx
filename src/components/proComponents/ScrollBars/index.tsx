import useInitSetting from '@/hooks/useInitSetting';
import React, { ReactElement } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface IScrollbars {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const ScrollBars = (props: IScrollbars): ReactElement => {
  const { children, ...othersProps } = props;
  const { isLightTheme } = useInitSetting();

  const renderThumb = () => {
    // renderThumb改变样式时被调用的函数，必须是函数
    const thumbStyle = {
      // 设置滚动条样式
      backgroundColor: isLightTheme
        ? 'rgb(0,0,0, 0.2)'
        : 'rgb(255,255,255, 0.2)',
      borderRadius: '4px'
    };
    return <div style={{ ...thumbStyle }} />;
  };

  const renderView = () => {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'scroll',
          marginRight: -7,
          marginBottom: -10
        }}
      />
    );
  };

  return (
    <Scrollbars
      renderView={renderView}
      renderThumbVertical={renderThumb}
      autoHide
      {...othersProps}
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollBars;
