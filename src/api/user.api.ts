const prefix = '/user/'
export const UserApi = {
  /** 账户登录 */
  login: (data: Iuser.loginDto) => {
    return http<Iuser.loginVo>({ url: prefix + 'login', data })
  },
  /** 注册 */
  register: (data: Iuser.registDto) => http({ url: prefix + 'regist', data }),
  /** 获取用户信息 */
  getUserInfo: () => http<Iuser.profile>({ url: prefix + 'getUserInfo' }),
  /** 修改用户信息 */
  updateUserInfo: (data: Iuser.updateDto) => {
    return http({ url: prefix + 'updateUserInfo', data })
  },
  /** 修改手机号 */
  updatePhone: (data: Iuser.updatePhoneDto) => {
    return http({ url: prefix + 'updatePhone', data })
  },
  /** 重置密码 */
  resetPassword: (data: Iuser.resetPwdDto) => {
    return http({ url: prefix + 'resetPassword', data })
  },
  /** 修改密码 */
  updatePassword: (data: Iuser.updatePwdDto) => {
    return http({ url: prefix + 'updatePassword', data })
  },
  /** 退出登录 */
  logout: () => http({ url: prefix + 'logout' })
}
