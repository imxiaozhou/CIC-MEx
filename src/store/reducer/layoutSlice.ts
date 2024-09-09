import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import config from '@/config';
import { PURGE } from 'redux-persist';
import i18n from '@/locales/index';

export interface LayoutState {
  isDarkMode: boolean;
  themeColor: string;
  collapsed: boolean;
  dateFormat: string;
  timezone: string;
  language: string;
  appearance: 'LIGHT' | 'REALDARK';
  fontSize: 'SMALL' | 'MEDIUM' | 'LARGE';

  serviceTimezone: string;

  detailMessageIdFromUrl: string;
  siderWidth: number | string;
  isZoomInAndOut: boolean;
  notRMCMUserRoleModalOpenStatus: boolean;
}

const initialState: LayoutState = {
  isDarkMode: false,
  themeColor: '#0A52C6',
  collapsed: false,
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  timezone: '+08:00',
  appearance: 'LIGHT',
  fontSize: 'MEDIUM',
  language: localStorage.getItem('i18nextLng') ?? config.lang,
  // 默认服务器时区是东八区（测试环境其实是0时区）
  serviceTimezone: '+08:00',

  detailMessageIdFromUrl: '',

  siderWidth: 400,
  isZoomInAndOut: false,
  notRMCMUserRoleModalOpenStatus: false
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload;
    },
    setDateFormat: (state, action: PayloadAction<string>) => {
      state.dateFormat = action.payload;
    },
    setTimeZone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
    setAppearance: (state, action: PayloadAction<'LIGHT' | 'REALDARK'>) => {
      state.appearance = action.payload;
    },
    setFontSize: (
      state,
      action: PayloadAction<'SMALL' | 'MEDIUM' | 'LARGE'>
    ) => {
      state.fontSize = action.payload;
    },
    setServiceTimezone: (state, action: PayloadAction<string>) => {
      state.serviceTimezone = action.payload;
    },
    setDetailMessageId: (state, action: PayloadAction<string>) => {
      state.detailMessageIdFromUrl = action.payload;
    },
    setSiderWidth: (state, action: PayloadAction<number | string>) => {
      state.siderWidth = action.payload;
    },
    setIsZoomInAndOut: (state, action: PayloadAction<boolean>) => {
      state.isZoomInAndOut = action.payload;
    },
    setNotRMCMUserRoleModalOpenStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.notRMCMUserRoleModalOpenStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.isDarkMode = state.isDarkMode ?? initialState.isDarkMode;
      state.themeColor = state.themeColor ?? initialState.themeColor;
      state.collapsed = initialState.collapsed;
      state.dateFormat = initialState.dateFormat;
      state.timezone = initialState.timezone;
      state.appearance = initialState.appearance;
      state.fontSize = initialState.fontSize;

      state.siderWidth = initialState.siderWidth;
      state.isZoomInAndOut = initialState.isZoomInAndOut;
      state.notRMCMUserRoleModalOpenStatus =
        initialState.notRMCMUserRoleModalOpenStatus;
    });
  }
});

export const {
  setCollapsed,
  setDarkMode,
  setThemeColor,
  setDateFormat,
  setLanguage,
  setAppearance,
  setFontSize,
  setTimeZone,
  setServiceTimezone,
  setDetailMessageId,
  setSiderWidth,
  setIsZoomInAndOut,
  setNotRMCMUserRoleModalOpenStatus
} = layoutSlice.actions;

export const selectCollapsed = (state: RootState) => state.layout.collapsed;
export const selectIsDarkMode = (state: RootState) => state.layout.isDarkMode;
export const selectThemeColor = (state: RootState) => state.layout.themeColor;
export const selectOriginDateFormat = (state: RootState) =>
  state.layout.dateFormat;
export const selectDateFormat = (state: RootState) =>
  state.layout.dateFormat.split(' ')?.[0];
export const selectTimeFormat = (state: RootState) =>
  state.layout.dateFormat.split(' ')?.[1];
export const selectLanguage = (state: RootState) => state.layout.language;
export const selectFontSize = (state: RootState) => state.layout.fontSize;
export const selectAppearance = (state: RootState) => state.layout.appearance;
export const selectSiderWidth = (state: RootState) => state.layout.siderWidth;
export const selectIsZoomInAndOut = (state: RootState) =>
  state.layout.isZoomInAndOut;

export const selectTimeZone = (state: RootState) => {
  let timezone = state.layout.timezone || '+08:00';
  let [h, m] = timezone.split(':');
  if (h?.length === 2) {
    h = `+0${h.split('+')?.[1]}`;
  }
  return `${h}:${m}`;
};

export const selectServiceTimezone = (state: RootState) =>
  state.layout.serviceTimezone;
export const selectLayoutStore = (state: RootState) => state.layout;

export default layoutSlice.reducer;
