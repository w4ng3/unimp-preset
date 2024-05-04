// 验证手机号
export const isPhone = (phone: string): boolean => {
  return /^1[3456789]\d{9}$/.test(phone)
}

// 验证密码强度，必须包含数字、字母、允许特殊字符
export const isStrongPassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(password)
}

/** 是否是银行卡号 */
export const isBankCard = (val: string): boolean => {
  return /^[1-9]\d{9,29}$/.test(val)
}
