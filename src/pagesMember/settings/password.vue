<template>
  <wd-config-provider theme="light" :theme-vars="themeVars">
    <view class="px-80">
      <wd-form ref="form" :model="model">
        <wd-toast />
        <wd-gap></wd-gap>
        <wd-input :maxlength="11" no-border readonly v-model="phoneComputed" prefix-icon="phone"> </wd-input>
        <wd-gap></wd-gap>
        <view class="flex gap-20">
          <wd-input
            type="number"
            :maxlength="10"
            no-border
            prefix-icon="code"
            prop="code"
            v-model="model.code"
            placeholder="请输入验证码"
            :rules="codeRule"
          >
          </wd-input>
          <wd-button
            custom-style="border-radius: 10rpx; height:90rpx"
            @click="sendCode"
            :disabled="countDown !== 60"
          >
            {{ codeBtnStr }}
          </wd-button>
        </view>
        <wd-gap></wd-gap>
        <wd-input
          prefix-icon="lock-on"
          no-border
          prop="password"
          :maxlength="20"
          show-password
          clearable
          v-model="model.password"
          placeholder="请输入密码"
          :rules="passwordRule"
        />
        <view class="mt-50">
          <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
        </view>
      </wd-form>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/styles/wotThemeVars'
import { useToast } from 'wot-design-uni'
const toast = useToast()
/** 显示手机号 */
const memberStore = useMemberStore()
const phoneComputed = computed(() => {
  // 手机号中间4位隐藏
  return memberStore.profile?.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

/** 发送验证码，验证码按钮倒计时 */
const countDown = ref(60)
const codeBtnStr = computed(() => {
  return countDown.value === 60 ? '发送验证码' : `${countDown.value}秒后重发`
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
  if (countDown.value === 60) {
    countDownTimer()
    CommonApi.sendCode({ phone: memberStore.profile.phone, type: 3 })
  }
}

/** 表单提交和校验 */
const { codeRule, passwordRule } = useFormRule()

const model = reactive<{
  code: string
  password: string
}>({
  code: '',
  password: ''
})

const form = ref()

const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, _errors }) => {
      if (valid) {
        // toast.success('校验通过')
        UserApi.updatePassword({
          code: model.code,
          newPassword: model.password
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

<style lang="scss"></style>
