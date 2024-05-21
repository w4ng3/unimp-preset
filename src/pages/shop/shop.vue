<script setup lang="ts"></script>

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
</template>

<style lang="scss">
.icon {
  font-size: 200rpx;
  color: purple;
}
</style>
