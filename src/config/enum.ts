/** 网络请求返回Code，状态枚举 */
export enum EnumApiCode {
  /** 请求成功 */
  success = 0,
  /** 非法操作 */
  fail = 1,
  /** 服务异常 */
  serviceError = 2,
  /** 请求失败 */
  requestError = 3,
  /** token失效 */
  tokenInvalid = 401,
  /** 账号不存在 */
  accountNotExist = -1004,
  /** 未知错误 */
  unknown = -999
}

export enum EnumAbout {
  /** 关于我们 */
  About = 2,
  /** 用户协议 */
  User = 1,
  /** 隐私协议 */
  Privacy = 0
}
