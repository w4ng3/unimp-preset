<script setup lang="ts">
import CustomNavbar from './comps/custom-navbar.vue'
import CustomSwiper from './comps/custom-swiper.vue'

// 页面加载请求数据
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getPostsData(), getSwpierData()])
  isLoading.value = false
})

// 是否加载中标记
const isLoading = ref(false)
// 下拉刷新状态
const isTriggered = ref(false)

// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开启动画
  isTriggered.value = true
  await Promise.all([getPostsData(), getSwpierData()])
  isTriggered.value = false
}
// 滚动触底事件
const onScrolltolower = () => {
  if (loadState.value === 'finished') {
    // console.log('没有更多了 ')
    return
  } else {
    getPostsData(++postPageNum.value)
  }
}

/** 轮播图 */
const swiperList = ref<IadList.item[]>([])
const getSwpierData = async () => {
  const { data } = await CommonApi.adList()
  swiperList.value = data.list
}

/** 帖子 */
const postList = ref<any[]>([])
const { onLoadList: getPostsData, pageNum: postPageNum, loadState } = usePull2Refresh(postList, '/post/list')

const tapLike = (id: number, isLiked: boolean, callback: Function) => {
  if (isLiked) {
    // 取消点赞
    ForumApi.like({ postId: id, isLike: 0 })
    callback()
  } else {
    // 点赞
    ForumApi.like({ postId: id, isLike: 1 })
    callback()
  }
}

const ontapPost = (id: number) => {
  uni.navigateTo({ url: `/pages/index/post-detail?postId=${id}` })
}
</script>

<template>
  <!-- <wd-config-provider theme="dark" :theme-vars="themeVars"></wd-config-provider> -->
  <view class="viewport">
    <!-- 自定义搜索栏 -->
    <custom-navbar></custom-navbar>
    <!-- 滚动容器 -->
    <scroll-view
      refresher-enabled
      scroll-y
      class="scroll-view"
      :refresher-triggered="isTriggered"
      @refresherrefresh="onRefresherrefresh"
      @scrolltolower="onScrolltolower"
    >
      <custom-swiper :list="swiperList"></custom-swiper>
      <!-- 帖子 List -->
      <block v-for="post in postList" :key="post.postId">
        <PostCard @tapLike="tapLike" @tap="ontapPost(post.postId)" :post="post"></PostCard>
        <view class="h-12"></view>
      </block>
      <wd-loadmore v-if="loadState == 'loading'" :state="loadState" />
    </scroll-view>
  </view>
</template>

<style lang="scss">
:deep(.wd-loadmore__text) {
  color: white;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
  margin-top: 12rpx;
  padding: 0 20rpx;
}
</style>
