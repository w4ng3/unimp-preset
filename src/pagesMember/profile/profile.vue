<!--
 *@FileDescription: 编辑个人信息
 -->
<script setup lang="ts">
import { UserApi } from '@/api/user.api'
import { ossUploadBySTS } from '@/utils/uploadUtil/uploadOSS'
import type { IUploadFileResult } from '@/utils/uploadUtil/upload'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 获取会员信息
const memberStore = useMemberStore()
// 获取个人信息
let profile = ref({} as Iuser.profile)

onLoad(() => {
  profile.value = { ...memberStore.profile }
})

// 修改头像
const onAvatarChange = (e: any) => {
  // 获取到微信头像临时地址
  const { avatarUrl } = e.detail

  CommonApi.getOssSTS().then((res) => {
    const stsinfo = {
      accessKeyId: res.data.AccessKeyId,
      accessKeySecret: res.data.AccessKeySecret,
      stsToken: res.data.SecurityToken
    }
    ossUploadBySTS({
      filePath: avatarUrl,
      dir: 'cdz/avatar/',
      stsinfo,
      successc: (resp: IUploadFileResult) => {
        uni.hideLoading()
        const avatar = resp.data.link
        profile.value!.avatar = avatar
        memberStore.profile!.avatar = avatar
        // console.log('上传成功 :>> ', avatar)
      },
      failc: () => {
        uni.showToast({ icon: 'error', title: '上传失败' })
      }
    })
  })
}

// 修改性别
const onGenderChange: UniHelper.RadioGroupOnChange = (ev) => {
  // 性别（0：男 1：女  2：保密）
  profile.value.gender = Number(ev.detail.value)
}

// 修改城市
const onFullLocationChange: UniHelper.RegionPickerOnChange = (ev) => {
  profile.value.areaAddress = ev.detail.value.join(' ')
  profile.value.areaCode = ev.detail.code!.join(',')
}
// 点击保存提交表单
const onSubmit = async () => {
  const { nickname, gender, brief, areaCode, areaAddress } = profile.value
  const res = await UserApi.updateUserInfo({
    nickname,
    gender,
    brief,
    areaCode,
    areaAddress,
    avatar: profile.value.avatar
  })
  if (res.code === 0) {
    memberStore.setProfile(profile.value)
    uni.showToast({ icon: 'success', title: '保存成功' })
    setTimeout(() => {
      uni.navigateBack()
    }, 400)
  } else {
    uni.showToast({ icon: 'error', title: '保存失败' })
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <button class="avatar__wrapper" :plain="true" open-type="chooseAvatar" @chooseavatar="onAvatarChange">
        <view class="image" v-if="!profile?.avatar">
          <wd-icon size="100rpx" color="#5dcaab" name="fill-camera"></wd-icon>
        </view>
        <image v-else class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </button>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="nickname" placeholder="请填写昵称" v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="0" color="#27ba9b" :checked="profile?.gender === 0" />
              男
            </label>
            <label class="radio">
              <radio value="1" color="#27ba9b" :checked="profile?.gender === 1" />
              女
            </label>
            <label class="radio">
              <radio value="2" color="#27ba9b" :checked="profile?.gender === 2" />
              保密
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">签名</text>
          <input class="input" type="text" placeholder="请输入签名" v-model="profile.brief" />
        </view>
        <view class="form-item">
          <text class="label">地区</text>
          <!-- #ifdef MP-WEIXIN -->
          <!-- 该城市选择器在h5不支持 -->
          <picker
            class="picker"
            mode="region"
            :value="profile.areaCode?.split(',')"
            @change="onFullLocationChange"
          >
            <view v-if="profile.areaCode">{{ profile.areaAddress }}</view>
            <view class="placeholder" v-else>请选择所在地区</view>
          </picker>
          <!-- #endif -->
          <!-- #ifdef H5 -->
          <view v-if="profile.areaCode">{{ profile.areaAddress }}</view>
          <view class="placeholder" v-else>暂不支持设置</view>
          <!-- #endif -->
        </view>
      </view>
      <button @tap="onSubmit" class="form-button">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://riddler.oss-cn-shanghai.aliyuncs.com/up/202310040205551.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__wrapper {
    border: 0 none !important;
  }

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
