<!--
 *@FileDescription: 帖子组件
 *@author: 王東
 *@date: 2024-03-14
 -->
<template>
  <view class="post-card h-auto p-20 relative">
    <view class="flex">
      <wd-img
        width="110rpx"
        height="110rpx"
        mode="aspectFill"
        radius="20rpx"
        :src="!!post.userInfo.avatar ? post.userInfo.avatar : '/static/images/post-default.png'"
      />
      <view class="pl-20">
        <view class="font-bold m-color text-xl">{{ post.userInfo?.nickname }}</view>
        <block v-for="(tag, index) in tagList" :key="index">
          <text class="pr-10 m-color text-md">{{ tag }}</text>
        </block>
      </view>
    </view>

    <view class="absolute top-25 right-35"><slot></slot></view>

    <view class="text-md ellipsis4 leading-snug">
      {{ post.content }}
    </view>
    <block v-if="post.resourceList?.length">
      <view :class="`g-container-${gNum}`">
        <view
          v-for="(res, index) in post.resourceList"
          :key="index"
          :class="`g-item-${gNum}`"
          class="relative"
        >
          <!-- 图片，点击查看大图 -->
          <block v-if="res.type === 0">
            <image
              lazy-load
              class="w-full h-full rounded-md"
              mode="aspectFill"
              :src="res.url"
              @click.stop="onTapImage(res.url)"
            ></image>
          </block>
          <block v-else-if="res.type === 1">
            <video
              class="w-full h-full"
              :src="res.url"
              :show-fullscreen-btn="false"
              :controls="false"
              :show-center-play-btn="false"
              :poster="res.videoCoverUrl"
            />
            <view class="absolute top-0 left-0 video-mask">
              <wd-icon name="play-circle" size="84rpx" color="white"></wd-icon>
            </view>
          </block>
        </view>
      </view>
    </block>
    <block v-if="post.commentList?.length">
      <view class="rounded-md h-auto p-20 text-sm bg-blur">
        <view v-for="item in post.commentList" :key="item.commentId">
          <!-- 回复 -->
          <view v-if="item.type" class="ellipsis2">
            <text class="font-bold m-color">
              {{ item.userName }}
              回复
              {{ item.replyUserName }}
            </text>
            : {{ item.content }}
          </view>
          <!-- 评论 -->
          <view v-else class="ellipsis2">
            <text class="font-bold m-color">{{ item.userName }}</text>
            : {{ item.content }}
          </view>
        </view>
      </view>
    </block>
    <!-- 底部信息 -->
    <view class="flex justify-between pt-5">
      <view class="text-gray-400 text-sm">{{ timeCpt }}</view>
      <view class="flex gap-20 text-sm text-blue-500">
        <view @click.stop="tapLike" class="flex items-center gap-10">
          <image
            class="w-30 h-30"
            :src="isLiked ? '/static/images/like-active.png' : '/static/images/like.png'"
            mode="scaleToFill"
          />
          <view>{{ likeNumCpt }}</view>
        </view>
        <view class="flex items-center gap-10">
          <image class="w-32 h-32" src="/static/images/comment.png" mode="scaleToFill" />
          <text> {{ commentNumCpt }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
/** 组件属性 */
type Props = {
  // post: Iforum.Post
  post: any
}
// const props = withDefaults(defineProps<Props>(), {})
const props = defineProps<Props>()

/** 事件传递 */
const emit = defineEmits<{
  (e: 'tapLike', id: number, isLiked: boolean, callback: Function): void
}>()
// 点赞
const isLiked = ref(!!props.post.isLike)
const likeNum = ref(props.post.likeNumber)
const tapLike = () => {
  emit('tapLike', props.post.postId, isLiked.value, () => {
    isLiked.value = !isLiked.value
    if (isLiked.value) {
      likeNum.value += 1
    } else {
      likeNum.value -= 1
    }
  })
}

/** 标签 */
const tagList = computed(() => {
  let labels = props.post.labels
  return labels ? labels.split(',') : []
})
/** 九宫格布局样式 */
const gNum = computed(() => {
  // 枚举九宫格布局，适配 1、2、3、4张图的布局（>4则用3）
  let num = props.post.resourceList?.length ?? 1
  if (num > 4) num = 3
  return num
})

const onTapImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: props.post.resourceList.filter((item) => item.type === 0).map((item) => item.url)
  })
}

/** 底部栏数据格式化 */
const timeCpt = computed(() => {
  let format = $u.dayjs(props.post.timestamp).format('YYYY-MM-DD HH:mm')
  let diffHour = $u.dayjs().diff($u.dayjs(props.post.timestamp), 'hour')
  if (diffHour < 24) return $u.dayjs(props.post.timestamp).fromNow()
  else return format
})
const likeNumCpt = computed(() => {
  return $u.formatNumber(likeNum.value)
})
const commentNumCpt = computed(() => {
  return $u.formatNumber(props.post.commentNumber)
})
</script>

<style lang="scss" scoped>
.post-card {
  border-radius: 20rpx;
  background-image: linear-gradient(to bottom, #37ecba 0%, #72afd3 100%);
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.bg-blur {
  background-color: rgba($color: #fff, $alpha: 0.2);
}

// wd-tag 的 custom-class 在小程序无效
.space {
  // margin: 5rpx 10rpx 10rpx 0rpx;
  font-size: 24rpx;
  padding-left: 20rpx !important;
  padding-right: 20rpx !important;
}
/** 枚举九宫格布局，适配 1、2、3、4张图的布局（>4则用3）*/
@each $num, $clo, $h in (1, 1, 300rpx), (2, 2, 160rpx), (3, 3, 140rpx), (4, 2, 200rpx) {
  .g-container-#{$num} {
    display: grid;
    grid-template-columns: repeat($clo, 1fr);
    column-gap: 24rpx;
    row-gap: 10rpx;
  }
  .g-item-#{$num} {
    height: $h;
    background-color: #f0f0f0;
    border-radius: 16rpx;
    overflow: hidden;
  }
}

.video-mask {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  font-weight: bold;
  height: 100%;
  width: 100%;
}
</style>
