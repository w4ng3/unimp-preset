import { EnumApiCode } from '@/config/enum'
import { useMemberStore } from '@/stores'
/** 返回参数类型 */
type Data<T> = {
  code: EnumApiCode
  msg: string
  data: T
}

// 请求基地址
const baseURL = import.meta.env.VITE_API_URL
// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时
    options.timeout = 10_000
    options.dataType = 'json'
    // 3. 添加小程序端请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    options.header.Authorization = memberStore.profile.userToken
    // 包装请求参数
    // options.data = {
    //   timestamp: Date.now(),
    //   clientType: 2,
    //   apiVer: import.meta.env.API_VER || 'v1.0.0',
    //   clientVer: import.meta.env.CLIENT_VER || 'v1.0.0',
    //   token: memberStore.profile?.userToken ?? '',
    //   body: options.data
    // }
  }
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)

// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 */

// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions, useLoading = false) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    if (useLoading) {
      uni.showLoading({ title: '', mask: true })
    }
    uni.request({
      method: 'POST', // 默认 POST 请求
      ...options,

      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        const resp = res.data as Data<T>
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (resp.code === EnumApiCode.success) {
            // if (useLoading) uni.hideLoading()
            resolve(resp)
          } else if (resp.code === EnumApiCode.tokenInvalid) {
            // uni.showToast({ icon: 'error', title: '登录失效' })
            // 清理用户信息，重定向到登录页
            const memberStore = useMemberStore()
            memberStore.$reset()
            uni.redirectTo({ url: '/pages/login/login' })
            reject(res)
          } else if (resp.code === EnumApiCode.accountNotExist) {
            uni.navigateTo({ url: '/pages/login/sign' })
          } else {
            showApiError(resp.code, resp.msg)
            reject(res)
          }
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'error',
            title: (res.data as Data<T>).msg || '请求错误'
          })
          reject(res)
        }
      },

      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试'
        })
        reject(err)
      }
    })
  })
}

/**
 * 根据后端返回的错误码，显示对应的错误提示
 */
const showApiError = (code: EnumApiCode, msg: string) => {
  switch (code) {
    case EnumApiCode.fail:
      msg = '非法操作'
      break
    case EnumApiCode.serviceError:
      msg = '服务异常'
      break
    case EnumApiCode.requestError:
      msg = '请求失败'
      break
    case EnumApiCode.tokenInvalid:
      msg = '登录失效'
      break
    default:
      if (msg === '') {
        msg = '未知错误'
      }
      break
  }
  uni.showToast({
    icon: 'error',
    title: msg
  })
}
