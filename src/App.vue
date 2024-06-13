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
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('是否需要版本更新：', res.hasUpdate)
  })

  updateManager.onUpdateReady(function (_res) {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })

  updateManager.onUpdateFailed(function (_res) {
    // 新的版本下载失败
    uni.showModal({
      title: '提示',
      content: '新版小程序下载失败\n请自行退出程序，手动卸载本程序，再运行',
      confirmText: '知道了'
    })
  })
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
