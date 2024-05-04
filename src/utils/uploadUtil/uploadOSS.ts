// 上传文件到OSS， 包含直传：ossUpload 和 STS：ossUploadBySTS 两种方式
import { config } from './config.js'
import { Base64 } from './Base64.js'
import { Crypto } from './crypto.js'
import './hmac.js'
import './sha1.js'
import type { IUploadFile, IUploadFileSTS, IUploadFileResult } from './upload'

const getPolicyBase64 = function () {
  const date = new Date()
  date.setHours(date.getHours() + config.timeout)
  const srcT = date.toISOString()
  const policyText = {
    expiration: srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ['content-length-range', 0, 100 * 1024 * 1024] // 设置上传文件的大小限制,100mb
    ]
  }
  const policyBase64 = Base64.encode(JSON.stringify(policyText))
  return policyBase64
}

const getSignature = function (policyBase64: string, accessKeySecret: string) {
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accessKeySecret, {
    asBytes: true
  })
  const signature = Crypto.util.bytesToBase64(bytes)
  return signature
}

/**
 * @description oss客户端直传
 * @returns 文件信息
 */
export const ossUpload = function (params: IUploadFile) {
  if (!params.filePath || params.filePath.length < 9) {
    uni.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false
    })
    return
  }
  // !!! 此处有坑，微信小程序里获取的 filePath 类似 http://tmp/67NkkCId5Z6b21e45f7d2670fbb25bf8fad7652596a6.png，可以获取到后缀 .png
  // 而 h5 端获取的 filePath 没有后缀，需要自行处理，暂不处理h5端
  const suffix = params.filePath.split('.').pop()?.toLowerCase() ?? ''
  const name = new Date().getTime() + Math.floor(Math.random() * 150) + '.' + suffix
  const aliyunFileKey = params.dir + name
  const aliyunServerURL = config.uploadImageUrl
  const accessid = config.OSSAccessKeyId
  const policyBase64 = getPolicyBase64()
  const signature = getSignature(policyBase64, config.AccessKeySecret)
  uni.uploadFile({
    url: aliyunServerURL,
    filePath: params.filePath,
    name: 'file',
    formData: {
      key: aliyunFileKey,
      policy: policyBase64,
      OSSAccessKeyId: accessid,
      signature: signature,
      success_action_status: '200'
    },
    success: function (res) {
      if (res.statusCode != 200) {
        params.failc('上传错误:' + JSON.stringify(res))
      } else {
        // params.success(aliyunServerURL + '/' + aliyunFileKey)
        const resp: IUploadFileResult = {
          code: 200,
          msg: '操作成功',
          data: {
            attachId: name,
            domain: aliyunServerURL,
            link: aliyunServerURL + '/' + aliyunFileKey,
            name: name,
            originalName: name
          }
        }
        params.successc(resp)
      }
    },
    fail: function (err) {
      if (params.failc) {
        params.failc(err)
      }
    }
  })
}

/**
 * @description 上传文件到阿里云oss, sts方式
 * @returns 文件信息
 */
export const ossUploadBySTS = ({ filePath, dir, stsinfo, successc, failc }: IUploadFileSTS) => {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false
    })
    return
  }
  const suffix = filePath.split('.').pop()?.toLowerCase() ?? ''
  //图片名字 可以自行定义，这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  const name = new Date().getTime() + Math.floor(Math.random() * 150) + '.' + suffix
  const aliyunFileKey = dir + name
  const aliyunServerURL = config.uploadImageUrl
  const accessid = stsinfo.accessKeyId
  const policyBase64 = getPolicyBase64()
  const signature = getSignature(policyBase64, stsinfo.accessKeySecret) //获取签名

  uni.uploadFile({
    url: aliyunServerURL, //开发者服务器 url
    filePath: filePath, //要上传文件资源的路径
    name: 'file', //必须填file
    formData: {
      key: aliyunFileKey,
      policy: policyBase64,
      OSSAccessKeyId: accessid,
      signature: signature,
      'x-oss-security-token': stsinfo.stsToken,
      success_action_status: '200'
    },
    success: function (res) {
      if (res.statusCode != 200) {
        failc('上传错误:' + JSON.stringify(res))
      } else {
        // successc(aliyunServerURL + '/' + aliyunFileKey)
        const resp: IUploadFileResult = {
          code: 200,
          msg: '操作成功',
          data: {
            attachId: name,
            domain: aliyunServerURL,
            link: aliyunServerURL + '/' + aliyunFileKey,
            name: name,
            originalName: name
          }
        }
        successc(resp)
      }
    },
    fail: function (err) {
      // @ts-ignore
      err.wxaddinfo = aliyunServerURL
      failc(err)
    }
  })
}
