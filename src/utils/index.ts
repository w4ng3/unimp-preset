import { isPhone, isStrongPassword, isBankCard } from './libs/verify'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import {
  formatNumber,
  formatPhone,
  formatDistance,
  splitTimeSections,
  convert2TimeRanges,
  format4second
} from './libs/format'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

/** 页面跳转 */
export const $router = {
  push: (url: string, params?: Object) => {
    if (params) {
      const keyValuePairs = <string[]>[]
      for (const key in params) {
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key)) {
          if (typeof params[key] === 'object') {
            params[key] = JSON.stringify(params[key])
          }
          keyValuePairs.push(`${key}=${params[key]}`)
        }
      }
      url = url + '?' + keyValuePairs.join('&')
    }
    uni.navigateTo({ url })
  },
  back: (delta: number = 1) => uni.navigateBack({ delta })
}

/** sleep 方法 */
const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true)
    }, ms)
  )
/**
 * @description 获取字符串长度
 * @param str 字符串
 * @param fontSize 字体大小
 */
const getLenPx = (str: string, fontSize: number) => {
  const str_leng = str.replace(/[^\x00-\xff]/gi, 'aa').length
  return (str_leng * fontSize) / 2
}

export const $u = {
  isPhone,
  isBankCard,
  isStrongPassword,
  formatNumber,
  formatPhone,
  formatDistance,
  format4second,
  dayjs: dayjs,
  sleep,
  getLenPx,
  splitTimeSections,
  convert2TimeRanges
}
