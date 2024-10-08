import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { initReactI18next } from 'react-i18next';
// i18next-browser-languagedetector插件 这是一个 i18next 语言检测插件，用于检测浏览器中的用户语言，
import LanguageDetector from 'i18next-browser-languagedetector';
import crc32 from 'crc/crc32';
// 引入需要实现国际化的简体、繁体、英文三种数据的json文件
import zhCN from 'antd/locale/zh_CN';
import zhHK from 'antd/locale/zh_TW';
import enGB from 'antd/locale/en_GB';
import localZh_CN from 'scan/zh-CN.json'; // 本地翻译中文文件
import localZh_HK from 'scan/zh-HK.json'; // 本地翻译中文粤语文件
import localEn_GB from 'scan/en-GB.json'; // 本地翻译英文文件
import config from '@/config';

const resources = {
  cn: {
    translation: localZh_CN,
    ...zhCN
  },
  hk: {
    translation: localZh_HK,
    ...zhHK
  },
  en: {
    translation: localEn_GB,
    ...enGB
  }
};

i18n
  .use(LanguageDetector) // 嗅探当前浏览器语言 zh-CN
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({
    // 初始化
    resources, // 本地多语言数据
    fallbackLng: config.lang ?? 'en', // 默认当前环境的语言
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie']
    }
  });

// --------这里是i18next-scanner新增的配置-------------
export const $t = (key: string, params?: any[]): string => {
  let k = key ?? '';
  const hashKey = `K${crc32(k).toString(16)}`; // 将中文转换成crc32格式去匹配对应的json语言包
  let words = i18n.t(hashKey);
  if (words === hashKey) {
    words = k;
  }

  // 配置传递参数的场景, 目前仅支持数组
  if (Array.isArray(params)) {
    const reg = /\((\d)\)/g;
    words = words.replace(reg, (a: string, b: number) => {
      return params[b];
    });
  }
  return words;
};

export default i18n;
