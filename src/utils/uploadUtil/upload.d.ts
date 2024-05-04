export interface IUploadFile {
  /** 文件路径 */
  filePath: string
  /** 上传的目录 */
  dir: string
  /** 成功回调 */
  successc: Function
  /** 失败回调 */
  failc: Function
}
export interface IUploadFileSTS extends IUploadFile {
  /** OSS临时凭证信息 */
  stsinfo: {
    accessKeyId: string
    accessKeySecret: string
    stsToken: string
  }
}
/** 上传方法的回调，用于配合 cl-upload 组件使用*/
// 有空可以优化下组件，去掉不必要的参数
export interface IUploadFileResult {
  code: number
  msg: string
  data: {
    attachId: string
    domain: string
    /** 图片链接 */
    link: string
    name: string
    originalName: string
  }
}
