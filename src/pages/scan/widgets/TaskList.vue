<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 定义 porps
const props = withDefaults(defineProps<{ type: number }>(), {
  type: 0
})

// 请求参数
const queryParams: Required<any> = {
  page: 1,
  pageSize: 10,
  type: props.type
}

// 列表
const taskList = ref<any[]>([])
// 是否加载中标记，用于防止滚动触底触发多次请求
const isLoading = ref(false)
// 获取列表数据
const getData = async () => {
  // 如果数据出于加载中，退出函数
  if (isLoading.value) return
  // 退出分页判断
  if (isFinish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  // 发送请求前，标记为加载中
  isLoading.value = true
  // 发送请求
  // const res = await getXXXAPI(queryParams)
  const res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // 发送请求后，重置标记
  isLoading.value = false
  // 数组追加
  taskList.value.push(...res)
  // 分页条件
  if (res.length >= queryParams.pageSize) {
    // 页码累加
    queryParams.page++
  } else {
    // 分页已结束
    isFinish.value = true
  }
}

onMounted(() => {
  getData()
})

// 是否分页结束
const isFinish = ref(false)
// 是否触发下拉刷新
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 重置数据
  queryParams.page = 1
  taskList.value = []
  isFinish.value = false
  // 加载数据
  await getData()
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <scroll-view
    enable-back-to-top
    scroll-y
    class="list"
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="getData"
  >
    <div class="card" v-for="item in taskList" :key="item">
      <div class="status"> {{ item }} </div>
    </div>
    <!-- 底部提示文字 -->
    <div class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ isFinish ? '没有更多数据~' : '正在加载...' }}
    </div>
  </scroll-view>
</template>
<style lang="scss">
.list {
  height: 100%;
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: pink;
    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
