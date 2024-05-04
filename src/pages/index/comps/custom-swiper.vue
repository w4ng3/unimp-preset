<script setup lang="ts">
const activeIndex = ref(0)
// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
}
// 定义 props 接收
defineProps<{
  list: IadList.item[]
}>()

const tapSwiper = (item: IadList.item) => {
  if (item.type === 0) {
    uni.navigateTo({ url: `/pages/web/rich?content=${JSON.stringify(item.content)}&title=${item.title}` })
  } else if (item.type === 1) {
    uni.navigateTo({ url: `/pages/web/web?url=${encodeURIComponent(item.content)}&title=${item.title}` })
  } else if (item.type === 2) {
    uni.navigateTo({ url: `/pages/index/post-detail?postId=${item.content}` })
  }
}
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.adId">
        <!-- <navigator :url="item.content" hover-class="none" class="navigator"> -->
        <image mode="aspectFill" class="image" :src="item.cover" @tap="tapSwiper(item)"></image>
        <!-- </navigator> -->
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.adId"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.carousel {
  // height: 100%;
  height: 360rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
  }
}
</style>
