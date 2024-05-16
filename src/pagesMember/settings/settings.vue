<!--
 *@FileDescription: 设置页
 *@author: 王東
 -->
<script setup lang="ts">
import { EnumAbout } from '@/config/enum'

const memberStore = useMemberStore()

const phoneComputed = computed(() => {
  return $u.formatPhone(memberStore.profile.phone)
})
// 退出登录
const onLogout = () => {
  // 模态弹窗
  uni.showModal({
    content: '是否退出登录？',
    success: (res) => {
      if (res.confirm) {
        // 清理用户信息
        memberStore.$reset()
        uni.redirectTo({ url: '/pages/login/login' })
      }
    }
  })
}

const openWxSetting = () => {
  // #ifndef H5
  uni.openSetting()
  // #endif
}
</script>

<template>
  <view class="py-20 px-30 px-20">
    <view class="">
      <wd-cell size="large" title="修改密码" is-link to="/pagesMember/settings/password" />
      <wd-cell size="large" title="手机号" is-link to="/pagesMember/settings/phone" :value="phoneComputed" />
      <div class="h-10"></div>
      <wd-cell size="large" title="权限设置" is-link @click="openWxSetting" />
      <div class="h-10"></div>
      <wd-cell
        size="large"
        title="隐私协议"
        is-link
        :to="`/pagesMember/settings/about?type=${EnumAbout.Privacy}&title=隐私协议`"
      />
      <wd-cell
        size="large"
        title="用户协议"
        is-link
        :to="`/pagesMember/settings/about?type=${EnumAbout.User}&title=用户协议`"
      />
      <wd-cell
        size="large"
        title="关于我们"
        is-link
        :to="`/pagesMember/settings/about?type=${EnumAbout.About}&title=关于我们`"
      />
    </view>
    <!-- 操作按钮 -->
    <view class="px-30 pt-40">
      <wd-button type="error" block size="large" @click="onLogout">退出登录</wd-button>
    </view>
  </view>
</template>

<style lang="scss"></style>
