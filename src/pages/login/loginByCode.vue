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
    </wd-cell-group>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>登录</wd-button>
    </view>
  </wd-form>
  <view class="tips">
    <wd-checkbox v-model="checkRef" checked-color="#f00">
      阅读并同意
      <text @tap.stop="navigateTo(`/pagesMember/settings/about?type=${EnumAbout.Privacy}&title=隐私协议`)">
        《隐私协议》
      </text>
      和
      <text @tap.stop="navigateTo(`/pagesMember/settings/about?type=${EnumAbout.User}&title=用户协议`)">
        《用户协议》
      </text>
    </wd-checkbox>
  </view>
</template>

<script lang="ts" setup>
import { EnumAbout } from '@/config/enum'
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
  if (!isPhone(model.phone!)) {
    toast.error('请输入正确的手机号')
  } else if (countDown.value === 60) {
    countDownTimer()
    CommonApi.sendCode({ phone: model.phone!, type: 3 })
  }
}

/** 表单提交和校验 */
const model = reactive<Iuser.loginDto>({
  phone: '',
  code: '',
  type: 0
})

const form = ref()

const handleSubmit = () => {
  if (!checkRef.value) {
    uni.showToast({ icon: 'none', title: '请先阅读并同意《隐私协议》和《用户协议》' })
  } else {
    form.value
      .validate()
      .then(({ valid, _errors }) => {
        if (valid) {
          sureToLogin()
        }
      })
      .catch((error: any) => {
        console.log(error, 'error')
      })
  }
}

const sureToLogin = async () => {
  uni.showLoading({ title: '正在登录', mask: true })
  const { data } = await UserApi.login({
    type: 0,
    phone: model.phone
  })
  uni.hideLoading()
  // 保存会员信息
  const memberStore = useMemberStore()
  memberStore.setProfile(data)
  // 成功提示
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    // 页面跳转
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)
}

const checkRef = ref<boolean>(false)
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.footer {
  padding: 80rpx;
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;

  text {
    color: rgb(187, 40, 47);
  }
}
</style>
