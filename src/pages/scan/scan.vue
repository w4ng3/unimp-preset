<template>
  <div @click="closeOutside" class="flex flex-col h-full">
    <wd-search
      placeholder-left
      :hide-cancel="hideRight"
      cancel-txt="搜索"
      placeholder="请输入关键字"
      v-model="searchRef"
      @search="search"
      @clear="clear"
      @cancel="cancel"
      @change="change"
    />
    <wd-drop-menu>
      <wd-drop-menu-item title="任务距离" v-model="menuRac.distance" :options="option1" />
      <wd-drop-menu-item title="开始时间" v-model="menuRac.startTime" :options="option1" />
      <wd-drop-menu-item title="任务时长" v-model="menuRac.taskDuration" :options="option1" />
    </wd-drop-menu>
    <!-- tabs -->
    <div class="tabs">
      <span class="item" v-for="(title, index) in tabs" :key="title" @tap="activeIndex = index">
        {{ title }}
      </span>
      <!-- 游标 -->
      <div class="cursor" :style="{ left: activeIndex * 50 + 15 + '%' }"></div>
    </div>
    <!-- 滑动容器 -->
    <swiper class="swiper" :current="activeIndex" @change="activeIndex = $event.detail.current">
      <swiper-item>
        <TaskList />
      </swiper-item>
      <swiper-item>
        <TaskList />
      </swiper-item>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { useQueue } from 'wot-design-uni'
import TaskList from './widgets/TaskList.vue'

// tabs 数据
const tabs = ref(['任务列表', '我的任务'])
// tab高亮下标
const activeIndex = ref(0)

// 搜索
const useSearchEffect = () => {
  const searchRef = ref<string>('')
  const hideRight = computed(() => {
    return searchRef.value.length <= 0
  })
  const search = () => {
    console.log('search')
  }
  function clear() {
    console.log('重置')
  }
  function cancel() {
    console.log('搜索')
  }
  function change({ value }) {
    console.log('输入', value)
  }
  return {
    searchRef,
    hideRight,
    search,
    clear,
    cancel,
    change
  }
}
const { searchRef, search, clear, cancel, change, hideRight } = useSearchEffect()

// 下拉菜单
const useDropMenuEffect = () => {
  const { closeOutside } = useQueue()

  const menuRac = reactive({
    /** 位置距离 */
    distance: 0,
    /** 开始时间 */
    startTime: 0,
    /** 任务时长 */
    taskDuration: 0,
    /** 城市 */
    city: 0,
    /** 服务分类 */
    serviceType: 0
  })
  const option1 = [
    { label: '全部', value: 0 },
    { label: '500米内', value: 1 },
    { label: '1公里内', value: 2 },
    { label: '5公里内', value: 3 },
    { label: '10公里内', value: 4 }
  ]
  return {
    closeOutside,
    menuRac,
    option1
  }
}
const { closeOutside, menuRac, option1 } = useDropMenuEffect()
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

// tabs
.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;

  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #262626;
  }

  .cursor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20%;
    height: 6rpx;
    padding: 0 50rpx;
    background-color: #27ba9b;
    /* 过渡效果 */
    transition: all 0.4s;
  }
}
</style>
