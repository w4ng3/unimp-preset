<template>
  <view>
    <web-view :webview-styles="webviewStyles" :src="web_url"></web-view>
  </view>
</template>

<script lang="ts" setup>
const query = defineProps<{
  url: string
  title: string
}>()

const web_url = ref('')

onLoad(() => {
  web_url.value = decodeURIComponent(query.url)
  uni.setNavigationBarTitle({ title: query.title })
})

const webviewStyles = {
  progress: {
    color: '#FF3333'
  }
}
</script>
