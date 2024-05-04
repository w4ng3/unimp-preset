<template>
  <view class="w-full h-184 py-10 flex-center gap-10">
    <image mode="aspectFill" :src="cover" class="w-150 h-150 rounded-md" />
    <view class="pl-10 flex-1 text-md flex flex-col justify-around overflow-hidden">
      <view class="text-ellipsis">{{ item.name }}</view>
      <view class="text-ellipsis text-gray-400 text-sm">编号：{{ item.chargerNumber }}</view>
      <view class="text-ellipsis text-gray-400 text-sm">共享时段：{{ shareTimeCpt }}</view>
      <view class="text-ellipsis text-gray-400 text-sm">单价：{{ item.unitPrice }} 元/度</view>
    </view>
    <view class="w-120 flex flex-col gap-16 justify-center items-center">
      <wd-icon name="/static/images/location.png" custom-style="width:44rpx;height:60rpx"></wd-icon>
      <view class="text-[30rpx] text-gray-400 self-end">{{ distance }}</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
type Props = {
  // item: Icharger.item
  item: any
}

const props = withDefaults(defineProps<Props>(), {})

const cover = computed(() => {
  const imgs = props.item.imgs ? props.item.imgs.split(',') : []
  return imgs.length > 0 ? imgs[0] : 'https://cdn.jsdelivr.net/gh/w4ng3/wiki-image@main/img/huaji.png'
})

const shareTimeCpt = computed(() => {
  return $u.convert2TimeRanges(props.item.shareTime)
})

const distance = computed(() => {
  return $u.formatDistance(props.item.distance ?? 0)
})
</script>
<style lang="scss" scoped></style>
