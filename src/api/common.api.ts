const prefix = '/common/'
export const CommonApi = {
  /** 发送验证码 */
  sendCode: (data: IsendCodeDto) => {
    return http({ url: prefix + 'sendCode', data })
  },
  /**
   * @description OSS 文件上传临时凭证获取
   * @param 0：用户头像 1：帖子附件
   */
  getOssSTS: () => http<ISTS>({ url: '/oss/sts' }),
  /** 获取协议 */
  getPlicy: (data: Iplicy.dto) => {
    return http<Iplicy.vo>({
      url: prefix + 'privacy',
      data
    })
  },
  /** 轮播公告列表 */
  adList: () => http<IadList.listVo>({ url: prefix + 'adList' })
}
