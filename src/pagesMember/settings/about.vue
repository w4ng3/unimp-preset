<template>
  <view class="uv-content">
    <uv-parse :content="richText" :selectable="true" :tagStyle="style"></uv-parse>
  </view>
</template>

<script lang="ts" setup>
import type { EnumAbout } from '@/config/enum'
import uvParse from '@/components/uv-parse/uv-parse.vue'

// 页面参数
const query = defineProps<{
  type: EnumAbout
  title: string
}>()

const richText = ref<string>('<div></div>')
const style = {
  p: 'color:white',
  img: 'border-radius: 20rpx;width: 100%;margin-top: 10rpx;display: block;'
}

onLoad(() => {
  uni.setNavigationBarTitle({ title: query.title || '关于' })
  // CommonApi.getPlicy({ type: query.type }).then((res) => {
  //   richText.value = res.data.content
  // })
})
</script>

<style lang="scss">
.uv-content {
  padding: 20rpx;
  color: white;
  font-size: 32rpx;
  line-height: 1.6;
}
</style>
