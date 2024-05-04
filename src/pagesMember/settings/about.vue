<template>
  <view style="padding: 20rpx">
    <rich-text :nodes="strings"></rich-text>
  </view>
</template>

<script lang="ts" setup>
import type { EnumAbout } from '@/config/enum'
import { onLoad } from '@dcloudio/uni-app'

// 页面参数
const query = defineProps<{
  type: EnumAbout
  title: string
}>()

const strings = ref<string>('<div>这是一段HTML代码</div>')

onLoad(() => {
  uni.setNavigationBarTitle({ title: query.title || '关于' })
  // CommonApi.getPlicy({ type: query.type }).then((res) => {
  //   console.log('res :>> ', res)
  //   strings.value = res.data
  // })
})
</script>

<style lang="scss"></style>
