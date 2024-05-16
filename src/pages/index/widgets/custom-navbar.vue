<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- logo文字 -->
    <view class="flex items-center h-64 pl-30 pt-20">
      <image class="w-50 h-50" src="/static/images/wx.png"></image>
      <text class="logo-text">亲民 · 快捷 · 共享</text>
    </view>
    <!-- 搜索条 -->
    <view class="flex-center pr-24">
      <view class="search flex-1" @tap="toggleSearch">
        <text class="icon-search">请输入关键词</text>
      </view>
      <image src="/static/images/add.png" mode="scaleToFill" class="w-60 h-60" @tap="navToEditPost" />
    </view>
  </view>
</template>

<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const navToEditPost = () => {
  uni.navigateTo({ url: '/pages/index/send-post' })
}

const toggleSearch = () => {
  uni.navigateTo({ url: '/pages/index/search' })
}
</script>

<style lang="scss" scoped>
/* 自定义导航条 */
.navbar {
  background-color: pink;
  @apply flex flex-col pt-20;
  background-size: cover;
  .logo-text {
    flex: 1;
    line-height: 28rpx;
    color: #fff;
    margin: 2rpx 0 0 20rpx;
    padding-left: 20rpx;
    border-left: 1rpx solid #fff;
    font-size: 26rpx;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #fff;
    font-size: 32rpx;
    line-height: 36rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .icon-search {
    &::before {
      font-size: 36rpx;
      margin-right: 10rpx;
    }
  }
  .icon-scan {
    font-size: 30rpx;
    padding: 15rpx;
  }
}
</style>
