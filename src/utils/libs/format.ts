/** 格式化数字，大于1000的返回多少k,保留1位小数 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString()
  }
  return (num / 1000).toFixed(1) + 'k'
}

/** 隐藏手机号中间4位 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * @description 格式化时长
 * @param {number} second 秒数
 * @returns {string} 返回格式：xx小时xx分钟，不足一小时不显示小时
 */
export const format4second = (second: number): string => {
  const hour = Math.floor(second / 3600)
  const minute = Math.floor((second % 3600) / 60)
  if (hour === 0 && minute === 0) return '小于一分钟'
  return `${hour ? hour + '小时' : ''}${minute ? minute + '分钟' : ''}`
}

/** 格式化距离 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return distance + 'm'
  }
  return (distance / 1000).toFixed(1) + 'km'
}

/** 分割时间成小时片段 */
export function splitTimeSections(shareTimes: string[]) {
  const result: string[] = []
  shareTimes.forEach((shareTime) => {
    const [start, end] = shareTime.split('-')
    for (let i = parseInt(start); i < parseInt(end); i++) {
      result.push(`${(i < 10 ? '0' : '') + i}:00-${(i + 1 < 10 ? '0' : '') + (i + 1)}:00`)
    }
  })
  return result
}
/**
 * 合并时间：将相邻的小时片段合并
 * @param {string} shareTime 时间段字符串，逗号分隔
 * @example '06:00-07:00,07:00-08:00,10:00-11:00,11:00-12:00'
 * @returns '06:00-08:00,10:00-12:00'
 */
export function convert2TimeRanges(shareTime: string): string {
  if (!shareTime) {
    return '未设置'
  }
  const hourlyData = shareTime.split(',')
  const hourRanges = hourlyData.map((range) => {
    const [startHour, endHour] = range.split('-').map((time) => parseInt(time))
    return [startHour, endHour]
  })
  hourRanges.sort((a, b) => a[0] - b[0])
  const timeRanges: string[] = []
  let startHour = hourRanges[0][0]
  let endHour = hourRanges[0][1]

  for (let i = 1; i < hourRanges.length; i++) {
    if (hourRanges[i][0] === endHour) {
      // 连续的小时，更新结束时间
      endHour = hourRanges[i][1]
    } else {
      // 非连续的小时，添加区间并重新设置起始时间
      timeRanges.push(`${startHour}:00-${endHour}:00`)
      startHour = hourRanges[i][0]
      endHour = hourRanges[i][1]
    }
  }
  // 添加最后一个区间
  timeRanges.push(`${startHour}:00-${endHour}:00`)
  const result = timeRanges.join(',')
  if (result === '0:00-0:00') {
    return '24小时'
  } else return result
}
