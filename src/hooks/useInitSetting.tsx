const useInitSetting = () => {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const collapsed = useAppSelector(selectCollapsed);
  const themeColor = useAppSelector(selectThemeColor);

  return {
    initialState: {},
    isLightTheme: !isDarkMode,
    colorPrimary: themeColor,
    collapsed: collapsed
  };
};

export default useInitSetting;
