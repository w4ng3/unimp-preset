/** buffer转16进制 */
export const buf2hex = (buffer: ArrayBuffer) => {
  return Array.prototype.map.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2)).join('')
}
/** 字符串转16进制 */
function stringToUTF16(str: string) {
  let val = ''
  for (let i = 0; i < str.length; i++) {
    // 将 str 每个字符转成数字，在转成16进制字符串
    if (val == '') {
      val = str.charCodeAt(i).toString(16)
    } else {
      val += str.charCodeAt(i).toString(16)
    }
  }
  return val
}

/** CRC验证:将每两个字符转为16进制数，并相加；取低位，255-低位数，转16进制字符串。 */
export const checkSum = (str: string) => {
  let itotal = 0
  const len = str.length
  let num = 0
  // 将每两个字符转为16进制数，并相加。
  while (num < len) {
    const s = str.substring(num, num + 2)
    itotal += parseInt(s, 16)
    num = num + 2
  }
  // console.log('itotal:' + itotal)
  const mode = itotal % 256 //取低位
  // console.log('mode:' + mode)
  let bbc = (255 - mode).toString(16)
  const iLen = bbc.length
  if (iLen % 2 != 0) {
    bbc = '0' + bbc
  }
  return bbc.toUpperCase()
}

/**
 * @description 登录密码字符串拼接
 * @param {string} pass 密码
 * @param {string} openId 用户openId，该项目用手机号表示
 */
export const getPwdCommondStr = (pass: string, openId: string) => {
  const p1 = 'A02400'
  let wid = stringToUTF16(openId)
  const dis = 32 - wid.length / 2
  if (dis > 0) {
    for (let i = 0; i < dis; i++) {
      wid = '00' + wid
    }
  }
  const crc = checkSum(p1 + pass + wid)
  // console.log('密码CRC计算：' + crc)
  const pwd = p1 + pass + wid + crc
  return pwd
}
