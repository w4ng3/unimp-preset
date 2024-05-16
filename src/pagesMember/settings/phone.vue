<template>
  <wd-form ref="form" :model="model">
    <wd-toast />
    <wd-gap></wd-gap>
    <wd-input label="已绑定手机号" v-model="phoneComputed" readonly label-width="90px" />
    <wd-gap></wd-gap>
    <wd-cell-group border>
      <wd-input
        label="新手机号"
        label-width="90px"
        prop="newPhone"
        clearable
        :maxlength="11"
        v-model="model.newPhone"
        placeholder="请输入要换绑的手机号"
        :rules="phoneRule"
      />
      <wd-gap></wd-gap>
      <wd-input
        type="number"
        label="验证码"
        :maxlength="6"
        label-width="90px"
        prop="code"
        v-model="model.code"
        placeholder="请输入验证码"
        :rules="codeRule"
        use-suffix-slot
      >
        <template v-slot:suffix>
          <wd-button @click="sendCode" size="medium" :disabled="countDown !== 60">{{ codeBtnStr }}</wd-button>
        </template>
      </wd-input>
    </wd-cell-group>
    <view class="pt-40 px-40">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
const toast = useToast()
/** 显示手机号 */
const memberStore = useMemberStore()
const phoneComputed = computed(() => {
  // 手机号中间4位隐藏
  return $u.formatPhone(memberStore.profile.phone)
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
  if (!$u.isPhone(model.newPhone)) {
    toast.error('请输入正确的手机号')
  } else if (countDown.value === 60) {
    countDownTimer()
    CommonApi.sendCode({ phone: memberStore.profile.phone, type: 3 })
  }
}

/** 表单提交和校验 */
const model = reactive<{
  code: string
  newPhone: string
}>({
  code: '',
  newPhone: ''
})

const form = ref()
const { codeRule, phoneRule } = useFormRule()
const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, _errors }) => {
      if (valid) {
        // toast.success('校验通过')
        UserApi.updatePhone(model).then(() => {
          memberStore.profile.phone = model.newPhone
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
  padding: 0 20rpx;
}
</style>
