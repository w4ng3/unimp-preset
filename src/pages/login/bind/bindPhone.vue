<template>
  <wd-form ref="form" :model="model">
    <wd-toast />
    <div style="height: 20rpx"></div>
    <wd-cell-group border>
      <wd-input
        label="手机号"
        label-width="90px"
        prop="newPhone"
        clearable
        :maxlength="11"
        v-model="model.newPhone"
        placeholder="请输入要绑定的手机号"
        :rules="passRule"
      />
      <wd-input
        type="number"
        label="验证码"
        :maxlength="10"
        label-width="90px"
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
    </wd-cell-group>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>绑定</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
const toast = useToast()
const memberStore = useMemberStore()

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
  if (!isPhone(model.newPhone)) {
    toast.error('请输入正确的手机号')
  } else if (countDown.value === 60) {
    countDownTimer()
    CommonApi.sendCode({ phone: memberStore.profile.phone, type: 3 })
  }
}

/** 表单提交和校验 */
const passRule = [{ required: true, message: '请填写手机号' }]

const model = reactive<{
  code: string
  newPhone: string
}>({
  code: '',
  newPhone: ''
})

const form = ref()

const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, _errors }) => {
      if (valid) {
        // UserApi.updatePhone(model).then(() => {
        // memberStore.profile.phone = model.newPhone
        toast.success('绑定成功')
        setTimeout(() => {
          uni.redirectTo({ url: '/pages/login/bind/bindPassword' })
        }, 500)
        // })
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
