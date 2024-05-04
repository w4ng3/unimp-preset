// import type { MapMarker } from '@uni-helper/uni-app-types'
interface IMapMarker {
  id: number
  title: string
  latitude: number
  longitude: number
  label?: any
  iconPath?: string
}
interface IOpenLocation {
  latitude: number
  longitude: number
  name?: string
  address?: string
}

/**
 * @description 定位相关
 */
export const useLocation = () => {
  //我的位置
  const myPos = reactive({
    latitude: 32.053802,
    longitude: 118.891116
  })
  // 地图中心位置及标记点
  const mapRac = reactive({
    latitude: 32.053802,
    longitude: 118.891116,
    markers: <any>[],
    polyline: <any>[]
  })
  const addMarkers = (marker: IMapMarker) => {
    mapRac.markers.push({
      id: marker.id,
      title: '',
      width: 40,
      height: 50,
      latitude: marker.latitude,
      longitude: marker.longitude,
      iconPath: marker.iconPath == 'default' ? undefined : '/static/images/marker.png',
      label: {
        content: marker.title ?? '充电桩',
        color: '#000',
        fontSize: 12,
        x: -(0.5 * $u.getLenPx(marker.title, 12)),
        y: 5,
        textAlign: 'center'
      }
    })
  }

  const addPolyline = ({ lat1, lon1, lat2, lon2 }) => {
    mapRac.polyline.push({
      points: [
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 }
      ],
      color: '#FF0000DD',
      width: 10,
      dottedLine: true
    })
  }

  /** 使用应用内置地图查看位置。 */
  const openMap = (pos: IOpenLocation) => {
    uni.openLocation({
      latitude: pos.latitude, //要去的纬度-地址
      longitude: pos.longitude, //要去的经度-地址
      name: pos.name,
      address: pos.address
    })
  }

  /** 获取用户的当前设置。 */
  const authLocation = () => {
    uni.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          /* 用户授权成功时走这里 */
          console.log('已授权')
        } else if (res.authSetting['scope.userLocation'] === undefined) {
          /* 用户未授权时走这里 */
          console.log('没有授权')
        } else {
          /* 用户拒绝了授权后走这里 */
          console.log('拒绝了授权 false')
        }
      }
    })
  }

  /** 获取当前位置 */
  const getMyPosition = () => {
    return new Promise<UniApp.GetLocationSuccess>((resolve, reject) => {
      uni.getLocation({
        type: 'gcj02', // wgs84/gcj02 ?
        success: (res) => {
          console.log('我的当前位置', res)
          myPos.latitude = res.latitude
          myPos.longitude = res.longitude
          resolve(res)
        },
        fail: (err) => {
          uni.showModal({
            title: '请求授权当前位置',
            content: '我们需要获取地理位置信息，为您推荐附近的充电桩',
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                //#ifdef MP-WEIXIN
                uni.openSetting().then((res) => {
                  console.log('opensetting res :>> ', res)
                  if (res[1].authSetting['scope.userLocation'] === true) {
                    uni.getLocation({
                      type: 'gcj02',
                      success: function (res) {
                        myPos.latitude = res.latitude
                        myPos.longitude = res.longitude
                        resolve(res)
                      }
                    })
                  } else {
                    uni.showToast({
                      icon: 'none',
                      title: '您拒绝了授权当前位置'
                    })
                    reject(err)
                  }
                })
                //#endif
              } else if (res.cancel) {
                uni.showToast({
                  icon: 'none',
                  title: '您拒绝了授权当前位置'
                })
                reject(err)
              }
            }
          })
        }
      })
    })
  }

  /** 打开地图选择位置 */
  const chooseLocation = () => {
    return new Promise<UniApp.ChooseLocationSuccess>((resolve, reject) => {
      uni.chooseLocation({
        latitude: mapRac.latitude,
        longitude: mapRac.longitude,
        success: (res) => {
          // console.log('wx.chooseLocation res=', res)
          mapRac.latitude = res.latitude
          mapRac.longitude = res.longitude
          resolve(res)
        },
        fail: function (err) {
          // console.log('取消 :>> ', err)
          reject(err)
        }
      })
    })
  }
  return {
    myPos,
    mapRac,
    openMap,
    getMyPosition,
    addMarkers,
    chooseLocation,
    authLocation,
    addPolyline
  }
}
