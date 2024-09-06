import React, { useEffect } from 'react';
import { Switch, ConfigProvider, theme } from 'antd';
const { darkAlgorithm } = theme;

export function DarkModeSwitch() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  return (
    <Switch
      checked={isDarkMode}
      checkedChildren="🌜"
      unCheckedChildren="🌞"
      onChange={(checked) => dispatch(setDarkMode(checked))}
    />
  );
}

export function DarkModeConfigProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? [darkAlgorithm] : undefined
      }}
    >
      {children}
    </ConfigProvider>
  );
}
