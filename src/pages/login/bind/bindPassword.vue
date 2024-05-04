<template>
  <wd-form ref="form" :model="model">
    <wd-toast />
    <div style="height: 20rpx"></div>
    <wd-cell-group border>
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

const model = reactive<{ password: string; password2: string }>({
  password: '',
  password2: ''
})

const form = ref()

const handleSubmit = () => {
  form.value
    .validate()
    .then(({ valid, _errors }) => {
      if (valid) {
        // UserApi.setPassword({
        // password: model.password
        // }).then(() => {
        toast.success('设置成功')
        setTimeout(() => {
          // uni.navigateBack()
          uni.switchTab({ url: '/pages/my/my' })
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
