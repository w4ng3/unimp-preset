<template>
  <view class="px-20 pt-30">
    <view class="m-linear-box px-20 py-10">
      <view class="flex pb-20">
        <wd-img
          width="110rpx"
          height="110rpx"
          mode="aspectFill"
          radius="20rpx"
          :src="postRef.userInfo.avatar ? postRef!.userInfo.avatar : '/static/images/post-default.png'"
        />
        <view class="pl-20">
          <view class="font-bold m-color text-xl">{{ postRef?.userInfo.nickname }}</view>
          <view class="text-sm">{{ timeCpt }}</view>
        </view>
      </view>
      <block v-for="(tag, index) in tagList" :key="index">
        <text class="pr-10 m-color text-md">#{{ tag }}</text>
      </block>
      <view class="text-md leading-snug"> {{ postRef?.content }} </view>
      <!-- 多媒体资源 -->
      <block v-for="(res, index) in postRef.resourceList" :key="index">
        <block v-if="res.type === 0">
          <image
            lazy-load
            :src="res.url"
            alt=""
            class="w-full rounded-md mt-10 overflow-hidden"
            mode="widthFix"
            @click.stop="onTapImage(res.url)"
          />
        </block>
        <block v-else-if="res.type === 1">
          <video
            class="w-full h-400 mt-10 rounded-md overflow-hidden"
            :src="res.url"
            :show-fullscreen-btn="true"
            :controls="true"
            :show-center-play-btn="true"
          />
        </block>
      </block>
    </view>
  </view>
</template>

<script lang="ts" setup>
const query = defineProps<{ postId: string }>()

onLoad(async () => {
  let { data: post } = await PostApi.getPostById(Number(query.postId))
  postRef.value = post
})

const postRef = ref<any>()
const tagList = computed(() => {
  let labels = postRef.value?.labels
  return labels ? labels.split(',') : []
})

const timeCpt = computed(() => {
  let format = $u.dayjs(postRef.value.timestamp).format('YYYY-MM-DD HH:mm')
  let diffHour = $u.dayjs().diff($u.dayjs(postRef.value?.timestamp), 'hour')
  if (diffHour < 24) return $u.dayjs(postRef.value?.timestamp).fromNow()
  else return format
})

const onTapImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: postRef.value!.resourceList.filter((item) => item.type === 0).map((item) => item.url)
  })
}
</script>

<style lang="scss"></style>
