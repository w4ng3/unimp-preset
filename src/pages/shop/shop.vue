<script setup lang="ts">
const tagList = ['社会化抚养', '法笑']
const onMyEvent = (e: UniHelper.TouchEvent) => {
  console.log('onMyEvent :>> ', e.target)
}
</script>

<template>
  <view>
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
  </view>
  <view class="my-iconf flex">
    <view class="icon icon-brightness1"></view>
    <wd-icon class-prefix="icon" name="home" />
    <wd-icon class-prefix="icon" name="down" size="300rpx" color="#f00" />
  </view>
  <!-- #ifdef MP-WEIXIN -->
  <news-card imageUrl="" title="睡前消息暑期版" date="2023-6-25" :tags="tagList" @myevent="onMyEvent" />
  <!-- #endif -->
</template>

<style lang="scss">
.icon {
  font-size: 200rpx;
  color: purple;
}
</style>
