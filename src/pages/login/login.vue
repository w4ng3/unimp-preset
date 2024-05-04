<script setup lang="ts">
import { UserApi } from '@/api/user.api'
import { EnumAbout } from '@/config/enum'

const checkRef = ref<boolean>(false)
// 获取 code 登录凭证
let miniproiCode = ''
onLoad(async () => {
  // const res = await wx.login()
  // miniproiCode = res.code // 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 code2Session，使用 code 换取 openid、unionid、session_key 等信息
})

// 授权登录
const sureToLogin = async () => {
  if (!checkRef.value) {
    uni.showToast({ icon: 'none', title: '请先阅读并同意《隐私协议》和《用户协议》' })
    return
  }
  uni.showLoading({ title: '正在登录', mask: true })
  const { data } = await UserApi.login({
    type: 3,
    miniproiCode
  })
  // const data = {
  //   userId: 114514,
  //   userToken: '114514',
  //   phone: '',
  //   nickname: '王東',
  //   avatar: 'https://cdn.jsdelivr.net/gh/wardendon/wiki-image@main/img/huaji.png',
  //   gender: 1,
  //   brief: '火烧火燎的感觉正在飘散',
  //   areaCode: '320000,320100,320113',
  //   areaAddress: '江苏省 南京市 栖霞区'
  // }
  uni.hideLoading()
  if (!data.phone) {
    // 首次登录，去填写个人信息
    const memberStore = useMemberStore()
    memberStore.setProfile(data)
    uni.redirectTo({
      url: '/pages/login/bind/bindPhone?userId=' + data.userId
    })
  } else {
    loginSuccess(data)
  }
}

const loginSuccess = (profile: Iuser.loginVo) => {
  // 保存会员信息
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  // 成功提示
  uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    // 页面跳转
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)
}

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="flex flex-col justify-center h-full py-2 px-5">
    <view class="flex-1 text-center">
      <image
        class="w-[220rpx] h-[220rpx] mt-[15vh]"
        src="//cdn.jsdelivr.net/gh/w4ng3/wiki-image@main/img/huaji.png"
      ></image>
    </view>
    <view class="login">
      <!-- 小程序端授权登录 -->
      <button class="button phone" @tap="sureToLogin">
        <text class="icon icon-phone"></text>
        一键登录/注册
      </button>
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <button @tap="navigateTo('/pages/login/loginByPassword')">
            <text class="icon icon-phone">密码登录</text>
          </button>
        </view>
      </view>
      <view class="tips">
        <wd-checkbox v-model="checkRef" checked-color="#2e62f6" shape="circle">
          阅读并同意
          <text
            @tap.stop="navigateTo(`/pagesMember/settings/about?type=${EnumAbout.Privacy}&title=隐私协议`)"
          >
            《隐私协议》
          </text>
          和
          <text @tap.stop="navigateTo(`/pagesMember/settings/about?type=${EnumAbout.User}&title=用户协议`)">
            《用户协议》
          </text>
        </wd-checkbox>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .extra {
    padding: 70rpx 70rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;

  text {
    color: $uni-color-primary;
  }
}
</style>
