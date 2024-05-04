<template>
  <wd-form ref="form" :model="model">
    <wd-toast />
    <div style="height: 20rpx"></div>
    <wd-cell-group border>
      <wd-input
        type="number"
        label="手机号"
        :maxlength="11"
        label-width="80px"
        prop="phone"
        v-model="model.phone"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ]"
      >
      </wd-input>
      <wd-input
        type="number"
        label="验证码"
        :maxlength="10"
        label-width="80px"
        prop="code"
        v-model="model.code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
        use-suffix-slot
      >
        <template v-slot:suffix>
          <wd-button @click="sendCode" size="medium" :disabled="countDown !== 60">{{ codeBtnStr }}</wd-button>
        </template>
      </wd-input>
      <wd-input
        label="密码"
        label-width="80px"
        prop="password"
        :maxlength="20"
        show-password
        clearable
        v-model="model.password"
        placeholder="请输入密码"
        :rules="passRule"
      />
      <wd-input
        label="确认密码"
        label-width="80px"
        prop="password2"
        :maxlength="20"
        show-password
        clearable
        v-model="model.password2"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '两次密码输入不一致', validator: validatorPass }]"
      />
    </wd-cell-group>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
const toast = useToast()

/** 发送验证码，验证码按钮倒计时 */
const countDown = ref(60)
const codeBtnStr = computed(() => {
  return countDown.value === 60 ? '获取验证码' : `${countDown.value}秒后重新获取`
})
const countDownTimer = () => {
  const timer = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearInterval(timer)
      countDown.value = 60
    }
  }, 1000)
}

const sendCode = () => {
  if (!isPhone(model.phone)) {
    toast.error('请输入正确的手机号')
  } else if (countDown.value === 60) {
    countDownTimer()
    CommonApi.sendCode({ phone: model.phone, type: 3 })
  }
}

/** 表单提交和校验 */
const passRule = [
  { required: true, message: '请填写密码' },
  {
    required: true,
    message: '密码长度不能小于6位且必须包含字母和数字',
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
  }
]
const validatorPass = (val: string) => {
  if (val === model.password) {
    return Promise.resolve()
  } else {
    return Promise.reject('两次密码输入不一致')
  }
}

const model = reactive<Iuser.resetPwdDto & { password2: string }>({
  phone: '',
  code: '',
  password: '',
  password2: ''
})

const form = ref()

const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, _errors }) => {
      if (valid) {
        // toast.success('校验通过')
        UserApi.resetPassword({
          phone: model.phone,
          code: model.code,
          password: model.password
        }).then(() => {
          toast.success('修改成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 500)
        })
      }
    })
    .catch((error: any) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.footer {
  padding: 80rpx;
}
</style>
