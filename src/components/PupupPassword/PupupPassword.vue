<!--
 *@FileDescription: 输入密码弹框
 *@author: 王東
 *@date: 2024-03-25
 -->
<template>
  <view>
    <wd-popup
      v-model="show"
      position="center"
      custom-style="width:700rpx;padding: 20px;border-radius: 20rpx;background: linear-gradient(180deg, #193c6e 0%, #0c2546 90%, #091e3a 100%);"
      @close="handleClose"
    >
      <view class="text-center text-md">请输入连接密码</view>
      <wd-gap></wd-gap>
      <wd-password-input
        :gutter="5"
        :model-value="password"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        :length="6"
      />
      <wd-gap></wd-gap>
      <wd-button size="large" @click="handleLink" block>连接</wd-button>
    </wd-popup>
    <!-- 数字键盘 -->
    <wd-number-keyboard
      :maxlength="6"
      v-model:visible="showKeyboard"
      v-model="password"
      :safeAreaInsetBottom="false"
    ></wd-number-keyboard>
  </view>
</template>
<script lang="ts" setup>
const keyId = ref('')
const show = ref<boolean>(false)

const handleClose = () => {
  password.value = ''
}

const password = ref<string>('')
const showKeyboard = ref<boolean>(false)

const emit = defineEmits<{ (e: 'linkBtn', keyId: string, password: string): void }>()
const handleLink = () => {
  // console.log(keyId.value, '输入密码 :>> ', password.value)
  emit('linkBtn', keyId.value, password.value)
}

defineExpose({
  keyId,
  show,
  password,
  showKeyboard
})
</script>
<style lang="scss" scoped></style>
