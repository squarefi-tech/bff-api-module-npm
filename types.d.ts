import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    context?: {
      isRetryRequest?: boolean;
      bypassUnauthorizedHandler?: boolean;
      appEnvironment?: AppEnviroment;
    };
  }
}
