import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { KGRequestConfig } from './types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

class KGRequest {
  instance: AxiosInstance

  constructor(config: KGRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = localCache.getCache(LOGIN_TOKEN)
        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: KGRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: KGRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: KGRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: KGRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: KGRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default KGRequest
