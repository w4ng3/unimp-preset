<!--
 *@FileDescription: 图片组件，有错误占位图
 *@author: 王東
 -->
<template>
  <image
    class="image"
    :src="imgSrc"
    mode="aspectFill"
    :disabled="false"
    :controls="false"
    @error="imgerror"
  ></image>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    cloudType: {
      type: String,
      default: 'oss'
    }
  },
  data() {
    return {
      imgSrc: ''
    }
  },
  mounted() {
    this.setCloudFunction()
  },
  methods: {
    imgerror(_even) {
      // 加载错误的占位图，（滑稽）
      this.imgSrc = `https://cdn.jsdelivr.net/gh/w4ng3/wiki-image@main/img/huaji.png`
    },
    setCloudFunction() {
      const fileType = this.src.split('.').pop()
      const IMAGE_REGEXP = /(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i
      if (IMAGE_REGEXP.test(fileType)) {
        return (this.imgSrc = this.src)
      }
      // 若是视频格式，则截取第一帧做封面图
      switch (this.cloudType) {
        case 'oss':
          this.imgSrc = this.src + '?x-oss-process=video/snapshot,t_0,f_jpg'
          break
        case 'process':
          this.imgSrc = this.src + '?ci-process=snapshot&time=0.01'
          break
        case 'vframe':
          this.imgSrc = this.src + '?vframe/jpg/offset/0'
          break
        default:
          this.imgSrc = this.src
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
}
</style>
