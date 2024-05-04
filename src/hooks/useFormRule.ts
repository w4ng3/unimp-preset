/**
 * Wot Design Uni 组件的表单校验规则
 */
export const useFormRule = () => {
  // 匹配6位数字
  const num6Rule = [{ required: true, message: '请填写6位数密码', pattern: /^\d{6}$/ }]

  const passwordRule = [
    { required: true, message: '请填写密码' },
    {
      required: true,
      message: '密码格式为6-12位字母数字组合',
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
      // pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,20}$/ 6-20位字母、数字、特殊字符组合
    }
  ]
  const phoneRule = [
    { required: true, message: '请填写手机号' },
    { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
  ]
  const codeRule = [{ required: true, message: '请填写验证码' }]

  /** 校验金额，保留两位小数 */
  const feeRule = [
    { required: true, message: '请输入金额' },
    { required: true, pattern: /^\d+(\.\d{1,2})?$/, message: '金额最多输入两位小数' }
  ]

  return { passwordRule, phoneRule, codeRule, num6Rule, feeRule }
}
