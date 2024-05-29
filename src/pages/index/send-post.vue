<template>
  <view class="px-30 pt-30">
    <view class="m-linear-box px-20 py-24">
      <wd-textarea
        :maxlength="500"
        show-word-limit
        v-model="contentRef"
        placeholder="请输入内容"
        custom-class="text-cus"
        :show-confirm-bar="false"
        :noBorder="true"
        custom-textarea-container-class="text-co-cus"
      />
      <view class="m-color py-10">添加标签（#开头，空格结尾）</view>
      <input
        :maxlength="50"
        class="tag-input"
        type="text"
        placeholder-class="placeholder"
        placeholder="请添加标签（非必需）"
        v-model="tagRef"
      />
      <view class="m-color py-10">每次最多9张图片或视频</view>
      <view>
        <cl-upload
          v-model="list"
          cloudType="oss"
          action="oss_sts"
          @onSuccess="onSuccess"
          deleteImg="/static/images/delete.png"
          :max="9"
          :listStyle="{
            columns: 3,
            columnGap: '20rpx',
            rowGap: '20rpx',
            padding: '0rpx',
            height: '200rpx',
            radius: '20rpx'
          }"
        ></cl-upload>
      </view>
    </view>
    <view class="mt-100">
      <wd-button size="large" block @click="sendPost"> 发布 </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
const contentRef = ref('')
const tagRef = ref('')

interface IResource {
  path: string
  type: 'image' | 'video'
  poster?: string
}
// 图片视频列表
const list = ref<IResource[]>([])

const onSuccess = (reslut: any) => {
  // 把服务端返回的图片地址添加到list中与组件数据同步
  list.value.push({
    path: reslut.data.link,
    type: reslut.data.type
  })
}

const sendPost = async () => {
  const tagsFilter = tagRef.value.split(' ').filter((tag) => tag.startsWith('#'))
  const validTag = tagsFilter.map((tag) => tag.slice(1)).join(',')
  const resourceJson = list.value.map((item) => {
    if (item.type === 'image') {
      return {
        type: 0, // 0：图片 1：视频：
        url: item.path
      }
    } else {
      return {
        type: 1,
        url: item.path,
        videoCoverUrl: `${item.path}?x-oss-process=video/snapshot,t_1,f_jpg`
      }
    }
  })
  const dto = {
    content: contentRef.value,
    labels: validTag,
    resourceJson
  }

  await PostApi.addPost(dto)
  setTimeout(() => {
    uni.navigateBack()
    uni.showToast({
      title: '已发布',
      icon: 'success',
      duration: 2000
    })
  }, 1000)
}
</script>

<style lang="scss">
.text-cus {
  padding: 20rpx;
  border-radius: 10px;
}

.tag-input {
  // background-color: #112438;
  background-color: $uni-bg-color;
  display: block;
  height: 76rpx;
  border-radius: 20rpx;
  padding: 0 20rpx;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 26rpx;
  .uni-input-placeholder {
    color: #86909a;
  }
}

:deep(.text-co-cus) {
  background-color: transparent !important;
}
</style>
