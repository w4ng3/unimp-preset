<template>
  <view class="uv-content">
    <uv-parse :content="richText" :selectable="true" :tagStyle="style"></uv-parse>
  </view>
</template>

<script lang="ts" setup>
import uvParse from '@/components/uv-parse/uv-parse.vue'

const query = defineProps<{
  title: string
}>()
const richText = ref('')

onLoad(() => {
  uni.setNavigationBarTitle({ title: query.title })
  const _this = getCurrentInstance()
  // #ifdef MP-WEIXIN
  // @ts-ignore #小程序有效，h5无法运行
  const eventChannel = _this.ctx.getOpenerEventChannel()
  eventChannel.on('rich-text', (data: string) => {
    richText.value = data
  })
  // #endif
})

const style = {
  p: 'color:white',
  img: 'border-radius: 20rpx;width: 100%;margin-top: 10rpx;display: block;'
}
</script>

<style lang="scss">
// 统一设置全文样式
.uv-content {
  padding: 20rpx;
  color: white;
  font-size: 32rpx;
  line-height: 1.6;
}
</style>
