import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import localConfig from '@/config';
import { notificationProps } from '@/config/common';
import { store, persistor } from '@/store';
import { downloadStreamFile } from '@/utils';
import { CustomNotification } from '@/components/proComponents';

type HttpStatusCode = keyof typeof localConfig.api.status;
type LangConfig = keyof typeof localConfig.langConfig;

class Request {
  private instance: AxiosInstance;

  private baseConfig: AxiosRequestConfig = {
    baseURL: localConfig.api.baseUrl,
    timeout: localConfig.api.timeout
  };

  public constructor(config: AxiosRequestConfig = {}) {
    // 创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        const tokens = JSON.parse(localStorage.getItem('tokens') as string);
        if (tokens?.token) {
          config.headers.Authorization = `Bearer ${tokens.token}`;
          const lang = selectLanguage(store.getState());
          config.data.lang =
            localConfig.langConfig[lang as LangConfig] ?? 'ENG';
          // 未登录、登录失效 跳转登录页逻辑待优化
          // const userInfo = selectUserInfo(store.getState())
          // if (!userInfo.userId && !userInfo.emailAddress) {
          //   persistor.purge(); // 清楚硬盘（如：localStorage）中的所有数据
          //   location.replace('/login')
          // }
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(new Error(error));
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<SuccessResponse>) => {
        const { headers, data } = response;
        if (headers['content-type']?.includes('application/json')) {
          const { code, msg } = data.status;
          // 服务端自定义的一套状态码，并不是真实的http状态码，如果处理http状态码错误，请至下面error错误函数中修改
          if (code !== 0) {
            const errorText =
              $t(msg) ||
              localConfig.api.status[code as HttpStatusCode] ||
              'HTTP响应错误';
            code === 401 && persistor.purge(); // 退出登录
            CustomNotification.error({
              ...notificationProps,
              message: errorText
            });
            return Promise.reject(new Error(errorText));
          }
        }
        return response;
      },
      (error) => {
        // 这里处理http状态码错误
        if (error?.code !== 'ERR_CANCELED') {
          CustomNotification.error({
            ...notificationProps,
            message: `${error.message}, 请检查网络或联系管理员`
          });
        }

        return Promise.reject(new Error(error));
      }
    );
  }

  /**
   * Get 请求
   */
  public get<ResData = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<ResData>> {
    return this.instance
      .get<SuccessResponse<ResData>>(url, config)
      .then(({ data }) => data)
      .catch((err) => err);
  }

  /**
   * Post 请求
   */
  public post<Params = any, ResData = any>(
    url: string,
    data: Params,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<ResData>> {
    return this.instance
      .post<SuccessResponse<ResData>>(url, data, config)
      .then(({ data }) => data)
      .catch((err) => err);
  }

  /**
   * 获取Blob数据
   */

  public blob<Params = any>(
    url: string,
    data: Params,
    config?: AxiosRequestConfig
  ): Promise<{
    blob: Blob;
    filename?: string;
    fileType?: string;
  }> {
    return this.instance
      .post(url, data, { responseType: 'blob', ...config })
      .then((res) => {
        const { data, headers } = res;
        const fileType = headers['content-type'];
        const filename = headers['content-disposition'].split('=')[1];
        return { blob: data, filename: decodeURIComponent(filename), fileType };
      });
  }

  /**
   * 请求流数据文件并直接下载
   */
  public async download<Params = any>(
    url: string,
    data: Params,
    config?: AxiosRequestConfig
  ) {
    const { blob, filename, fileType } = await this.blob(url, data, config);
    downloadStreamFile(blob, filename, fileType);
    return { blob, filename, fileType };
  }

  /**
   * 应对其他情况的请求方法，如: 需要返回整个response.data 等。
   * @param {AxiosRequestConfig} config
   * @returns {AxiosResponse.data} return response.data
   */
  public request<ResData = any>(config: AxiosRequestConfig) {
    return this.instance
      .request<SuccessResponse<ResData>>(config)
      .then((response) => response.data);
  }
}

export default new Request();
