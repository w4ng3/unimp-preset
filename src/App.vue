<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  // #ifdef MP-WEIXIN
  // uni.getSystemInfoAsync({
  //   success(res) {
  //     console.log('systeminfo :>> ', res)
  //     const isIOS = res.platform == 'ios' ? true : false
  //   }
  // })
  // #endif
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
</script>

<style lang="scss">
// 全局样式
@import '@/styles/global.scss';
// wot-design 组件自定义样式
@import '@/styles/wot-theme.scss';
// iconfont- unicode 单色-字体图标
@import '@/styles/iconfont.css';
</style>
