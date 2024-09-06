import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import svgr from 'vite-plugin-svgr';

import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// import { theme } from 'antd';

// const { getDesignToken } = theme;
// const { colorPrimary } = getDesignToken();

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    define: {},
    server: {
      port: 8000,
      // host: 127.0.1.1, //pnpm run dev --host 127.0.1.1

      proxy: {
        // '/sma-adm': {
        //   target:
        //     process.env.VITE_SMA_APP_BACKEND_URL || 'http://10.89.104.58:8000',
        //   changeOrigin: true
        // }
      },

      open: false
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        scan: resolve(__dirname, './scan')
      }
    },
    plugins: [
      react(),
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
      svgr(),
      splitVendorChunkPlugin(),
      AutoImport({
        imports: ['react'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/hooks', 'src/locales', 'src/store/reducer'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            '@primary-color': '#0A52C6'
          },
          javascriptEnabled: true
        }
      }
    }
  };
});
