/** 分页参数 */
declare interface IPage {
  /** 开始页数 */
  pageNum: number
  /** 默认条数 */
  pageSize: number
}

/** OSS STS */
interface ISTS {
  StatusCode: string
  AccessKeyId: string
  AccessKeySecret: string
  SecurityToken: string
  /** 临时凭证过期时间 */
  Expiration: string
}

/**
 * 性别枚举（0：男 1：女  2：保密）
 */
declare enum EnumGender {
  male = 0,
  female = 1,
  unknow = 2
}

/** 请求验证码 */
interface IsendCodeDto {
  phone: string
  /** 发送类型（0：注册；1：登录；2：修改手机号 3：重置密码） */
  type: 0 | 1 | 2 | 3
}

/**
 * 获取协议
 */
declare module Iplicy {
  interface dto {
    /** 发送类型(0：隐私协议 1：用户协议 2：关于我们) */
    type: 0 | 1 | 2
  }
  interface vo {
    content: string
  }
}
/**
 * 轮播公告
 */
declare module IadList {
  interface item {
    adId: number
    /** 类型（0：富文本 1：链接 2：帖子） */
    type: 0 | 1 | 2
    title: string
    content: string
    timestamp: number
  }
  interface listVo {
    list: item[]
  }
}

/**
 * 用户模块
 */
declare module Iuser {
  /** 用户信息 */
  interface profile {
    userId: number
    userToken: string // 用户令牌
    phone: string
    avatar: string
    nickname: string
    gender: EnumGender
    brief: string
    areaCode: string
    areaAddress: string
  }
  interface loginDto {
    /** 登录类型（0：验证码登录 1：密码登录 2：原生微信登录 3：微信小程序登录 4：苹果登录） */
    type: 0 | 1 | 2 | 3 | 4
    /** 微信小程序登录凭证 */
    miniproiCode?: string
    phone?: string
    password?: string
    /** 短信验证码 */
    code?: string
    wchatCode?: string
    appleCode?: string
  }
  interface loginVo extends profile {}

  type updateDto = Partial<Omit<profile, 'userId' | 'userToken' | 'phone'>>
  /** 注册 */
  interface registDto {
    /** 注册类型（0：常规注册 1：原生微信注册 2：微信小程序注册 3：苹果注册） */
    type: 0 | 1 | 2 | 3
    phone: string
    code: string
    password: string
    miniproiCode: string
    wchatCode?: string
    appleCode?: string
  }
  /** 重置密码 */
  type resetPwdDto = Pick<registDto, 'phone' | 'code' | 'password'>
  /** 修改密码 */
  interface updatePwdDto {
    // oldPassword: string
    code: string
    newPassword: string
  }
  /** 修改手机号 */
  interface updatePhoneDto {
    newPhone: string
    code: string
  }
}
