<script setup lang="ts">
import { themeVars } from '@/styles/wotThemeVars'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 获取会员信息
const memberStore = useMemberStore()

const avatar = computed(() => {
  return memberStore.profile?.avatar ?? '/static/images/default-a.png'
})

onShow(() => {
  // UserApi.getUserInfo().then((res) => {
  //   memberStore.profile = res.data
  // })
  getUnReadNum()
})

// 未读消息数
const noReadNum = ref(0)
const getUnReadNum = async () => {
  // const { data } = await CommonApi.getUnreadNum()
  // noReadNum.value = data.num
  // if (data.num) {
  //   uni.showTabBarRedDot({
  //     index: 3
  //   })
  // } else {
  //   uni.hideTabBarRedDot({
  //     index: 3
  //   })
  // }
}
</script>

<template>
  <wd-config-provider theme="light" :theme-vars="themeVars">
    <scroll-view class="viewport" scroll-y>
      <view class="mt-20 mb-60 relative" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
        <view class="flex px-30 gap-20">
          <navigator class="" url="/pagesMember/settings/settings" hover-class="none">
            <image src="/static/icons/setting.png" class="h-60 w-60" mode="scaleToFill" />
          </navigator>
          <navigator class="relative" url="/pages/my/message" hover-class="none">
            <view
              v-if="noReadNum"
              class="absolute bottom-1 right-1 p-5 rounded-1 bg-red-700 z-10 text-[20rpx] text-center"
            >
              {{ noReadNum }}
            </view>
            <image src="/static/icons/notice.png" class="h-60 w-60" mode="scaleToFill" />
          </navigator>
        </view>
      </view>
      <view class="h-80"> </view>
      <section class="mx-24">
        <view class="h-auto m-linear-box">
          <section class="flex h-120 px-20" v-if="memberStore.profile">
            <!-- 已登录 -->
            <navigator url="/pagesMember/profile/profile" hover-class="none">
              <image class="user-avatar" mode="aspectFill" :src="avatar"></image>
            </navigator>
            <view class="pl-10">
              <view class="truncate text-xl text-white">
                {{ memberStore.profile.nickname }}
              </view>
              <view class="text-md text-white">{{ memberStore.profile.phone }}</view>
            </view>
          </section>
          <section class="flex h-120 px-20" v-else>
            <!-- 未登录 -->
            <navigator url="/pages/login/login" hover-class="none">
              <image
                class="user-avatar"
                style="filter: grayscale(100%)"
                mode="aspectFill"
                src="/static/images/default-a.png"
              ></image>
            </navigator>
            <navigator url="/pages/login/login" class="pl-10">
              <view class="truncate text-xl"> 未登录 </view>
              <view class="text-md">点击登录账号</view>
            </navigator>
          </section>
          <!-- 菜单-->
          <section>
            <wd-cell
              size="large"
              title="基本信息"
              icon="/static/icons/base1.png"
              is-link
              to="/pagesMember/profile/profile"
            />
            <wd-cell size="large" title="我的发帖" is-link icon="/static/icons/base4.png" />
            <wd-cell size="large" title="XX订单" is-link icon="/static/icons/base6.png" />
            <wd-cell size="large" title="XX记录" is-link icon="/static/icons/base8.png" />
          </section>
        </view>
      </section>
    </scroll-view>
  </wd-config-provider>
</template>

<style lang="scss">
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png');
  background-size: 100% auto;
}

/* 用户信息 */
.update {
  padding: 3rpx 10rpx 1rpx;
  color: rgba(255, 255, 255, 0.8);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  margin-right: 10rpx;
  border-radius: 30rpx;
}
.navigator {
  text-align: center;
  font-size: 24rpx;
  color: #333;
  &::before {
    display: block;
    font-size: 60rpx;
    color: #ff9545;
  }
}

.icon-img {
  display: block;
  box-sizing: border-box;
  width: 50rpx;
  height: 50rpx;
  transform: translate(-2rpx, 5rpx);
}

.user-avatar {
  transform: translate(0, -100rpx);
  width: 180rpx;
  height: 180rpx;
  border-radius: 100%;
  border: 2px solid white;
}

:deep(.badge) {
  display: inline-block;
  border: none !important;
  border-radius: 100%;
}

:deep(.wd-cell__title) {
  color: white !important;
}
</style>
