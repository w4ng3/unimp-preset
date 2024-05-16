<template>
  <wd-form ref="form" :model="model">
    <wd-toast />
    <wd-gap></wd-gap>
    <wd-cell-group border>
      <wd-input
        type="number"
        label="手机号"
        :maxlength="11"
        label-width="60px"
        prop="phone"
        v-model="model.phone"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { required: true, pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ]"
      >
      </wd-input>
      <wd-gap></wd-gap>
      <wd-input
        label="密码"
        label-width="60px"
        prop="password"
        :maxlength="20"
        show-password
        clearable
        v-model="model.password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </wd-cell-group>
    <view class="flex justify-between mt-40 mb-40 px-30 text-sm">
      <navigator url="/pages/login/resetPassword" open-type="navigate">忘记密码 </navigator>
      <navigator url="/pages/login/loginByCode" open-type="navigate">验证码登录 </navigator>
    </view>
    <view class="p-60">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
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

const model = reactive<{
  phone: string
  password: string
}>({
  phone: '',
  password: ''
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
    type: 1,
    phone: model.phone,
    password: model.password
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
  padding: 0 20rpx;
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
