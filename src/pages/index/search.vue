<template>
  <view>
    <view class="top-box"></view>
    <view class="search-box">
      <image src="/static/left.png" mode="" @tap="toggleBack"></image>
      <view class="input-box">
        <input type="text" placeholder="搜索" placeholder-class="placeholder" />
      </view>
      <!-- #ifndef MP-WEIXIN  -->
      <text>搜索</text>
      <!-- #endif -->
    </view>
    <view class="content">
      <view class="title">
        <text>历史搜索</text>
        <view class="clear-box">
          <image src="/static/del.png" mode=""></image>
          <text>清空</text>
        </view>
      </view>
      <view class="child">
        <view class="item" v-for="(item, index) in historyList" :key="index">
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view class="content">
      <view class="title">
        <text>热门搜索</text>
      </view>
      <view class="child">
        <view
          class="item"
          :class="item.type == 2 ? 'item-a' : ''"
          v-for="(item, index) in hotList"
          :key="index"
        >
          <image v-if="item.img" :src="item.img" mode=""></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view class="content">
      <view class="title">
        <text>热门推荐</text>
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="cover-box">
            <view class="label" :class="'label-' + index">
              <text>{{ index }}</text>
            </view>
            <image :src="item.img" mode=""></image>
          </view>
          <view class="item-info-box">
            <text>{{ item.name }}</text>
            <view>
              <image :src="index > 2 ? '/static/huo_.png' : '/static/huo.png'" mode=""></image>
              <text :style="index > 2 ? 'color:#B1B1B1' : ''">{{ item.number }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const historyList = ref([
  {
    name: '绑定'
  },
  {
    name: '故障'
  }
])
const hotList = ref([
  {
    name: '充电',
    type: 1
  },
  {
    name: '购桩',
    type: 1
  },
  {
    name: '共享',
    type: 1
  },
  {
    name: '橙子西西98',
    img: 'https://img0.baidu.com/it/u=844566040,2098535717&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    type: 2
  },
  {
    name: '嘎肥猫儿',
    img: 'https://img1.baidu.com/it/u=428577822,2972406465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    type: 2
  }
])
const list = ref([
  {
    name: '只有衣服知道你的秘密',
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F26%2F20150126180540_s3MKe.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1697367177&t=3c715d3557637550726b85ee463e9e3b',
    number: 1202
  },
  {
    name: '寇牌时尚，“衣”见钟情',
    img: 'https://img1.baidu.com/it/u=2105100716,2855077603&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    number: 2001
  },
  {
    name: '今日穿过的衣服，某一时化为过往',
    img: 'https://img1.baidu.com/it/u=3410833644,4045980764&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    number: 2332
  }
])

const toggleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.top-box {
  height: 44px;
}

.search-box {
  display: flex;
  /*  #ifndef MP-WEIXIN  */
  justify-content: space-between;
  /* #endif */
  align-items: center;
  margin: 0 24rpx;
  height: 44px;
}

.search-box image {
  width: 50rpx;
  height: 50rpx;
  flex-shrink: 0;
}

.search-box > text {
  flex-shrink: 0;
  color: #999;
}

.input-box {
  display: flex;
  align-items: center;
  // background: #fff;
  background-color: #dddada;
  height: 72rpx;
  border-radius: 72rpx;
  padding: 0 30rpx;
  /*  #ifndef MP-WEIXIN  */
  width: 100%;
  /* #endif */
  margin: 0 24rpx;
}

.input-box input {
  font-size: 30rpx;
  color: black;
  width: 100%;
}

.input-box .placeholder {
  color: #c6c6c6;
}

.input-box image {
  width: 48rpx;
  height: 48rpx;
}

.content {
  margin: 24rpx;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24rpx 0;
}

.title > text {
  font-size: 30rpx;
  font-weight: bold;
}

.clear-box {
  color: #868686;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.clear-box image {
  width: 32rpx;
  height: 32rpx;
  margin-right: 2rpx;
}

.child {
  display: flex;
  flex-wrap: wrap;
}

.child .item {
  // background: #fff;
  background-color: rgb(180, 212, 212);
  font-size: 28rpx;
  height: 62rpx;
  border-radius: 54rpx;
  padding: 0 28rpx;
  color: #525252;
  margin: 0 24rpx 20rpx 0;
  display: flex;
  align-items: center;
}

.child .item-a {
  padding: 0 28rpx 0 14rpx;
}

.child .item image {
  width: 40rpx;
  height: 40rpx;
  border-radius: 40rpx;
  margin-right: 10rpx;
}

.list {
  // background: #fff;
  background-color: rgb(180, 212, 212);
  border-radius: 24rpx;
  padding: 15rpx 30rpx;
}

.list .item {
  display: flex;
  padding: 15rpx 0;
}

.item-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #333333;
}

.item-info-box > text {
  -webkit-text-stroke-width: 0.1px;
  font-size: 30rpx;
}

.item-info-box > view {
  color: #ff4466;
  -webkit-text-stroke-width: 0.3px;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.item-info-box > view image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 4rpx;
}

.cover-box {
  position: relative;
}

.cover-box .label {
  position: absolute;
  top: 0;
  left: 0;
  width: 44rpx;
  height: 44rpx;
  z-index: 1;
  border-top-left-radius: 14rpx;
  border-bottom-right-radius: 14rpx;
  text-align: center;
  line-height: 44rpx;
  color: #fff;
  font-size: 28rpx;
  -webkit-text-stroke-width: 0.1px;
}

.label-0 {
  background: #e05345;
}

.label-1 {
  background: #eb9941;
}

.label-2 {
  background: #edc744;
}

.label-3 {
  background: #696765;
}

.cover-box image {
  width: 120rpx;
  height: 120rpx;
  flex-shrink: 0;
  border-radius: 14rpx;
  margin-right: 30rpx;
}
</style>
