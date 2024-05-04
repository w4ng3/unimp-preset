/** 蓝牙相关 */
export const useBluetooth = () => {
  const deviceId = ref('') //设备id
  let uuid = '' //服务id
  const characteristics = ref('') //特征值
  // const message = ref(null)
  // const messageHex = ref(null)
  // const readCode = ref('')
  // const readCodeMsg = ref('')
  // const renwu = ref('1')

  /**
   * @description 初始化蓝牙模块
   * 其他蓝牙相关 API 必须在 uni.openBluetoothAdapter 调用之后使用。否则 API 会返回错误（errCode=10000）。
   */
  const open = () => {
    uni.openBluetoothAdapter({
      success: function (res) {
        console.log('是否开启蓝牙', res)
      },
      fail: function (msg) {
        console.log(msg)
      }
    })
  }
  /** 停止搜索 */
  const stop = () => {
    uni.stopBluetoothDevicesDiscovery({
      success(res) {
        console.log('停止搜索---', res)
      }
    })
  }

  /**
   * @description 搜索蓝牙设备
   */
  const search = () => {
    // const that = this
    uni.startBluetoothDevicesDiscovery({
      success: function (res) {
        console.log('搜索设备---', res)
        uni.onBluetoothDeviceFound(function (el) {
          console.log('new device list has founded')
          console.log(el)
          // console.log(that.ab2hex(el.devices[0].advertisData));
          //找到对应蓝牙设备名字

          if (el.devices[0].name == 'xxxxxxx') {
            // if (el.devices[0].name == "zhaogpnov") {
            console.log('成功-------', el)
            //成功后存储设备id
            // that.deviceId = el.devices[0].deviceId
            // that.stop() //关闭搜索 第三步方法名
          }
        })
      }
    })
  }
  /** 连接蓝牙 */
  const initBlue = () => {
    uni.createBLEConnection({
      deviceId: deviceId.value,
      success: (res) => {
        console.log('连接成功---', JSON.stringify(res))
        //需延时连接，不然会报错
        setTimeout(function () {
          uni.getBLEDeviceServices({
            deviceId: deviceId.value,
            success: (res) => {
              console.log('获取蓝牙设备所有服务', res)
              // uuid = res.services[0].uuid
              uuid = res.services[2].uuid
              huoqu() //第五步方法名
            }
          })
        }, 1000)
      }
    })
  }
  /** 获取蓝牙信息 */
  function huoqu() {
    uni.getBLEDeviceCharacteristics({
      deviceId: deviceId.value,
      serviceId: uuid,
      success: (res) => {
        console.log(res)
        characteristics.value = res.characteristics[0].uuid
        console.log('获取--------', res)
      },
      fail: (res) => {
        console.log('失败1--------', res)
      }
    })
  }

  /** 获取蓝牙信息 */
  function getInfo() {
    uni.getBLEDeviceCharacteristics({
      deviceId: deviceId.value,
      serviceId: uuid,
      success: (res) => {
        characteristics.value = res.characteristics[0].uuid
        console.log('获取--------', res)
      },
      fail: (res) => {
        console.log('失败1--------', res)
      }
    })
  }

  /** 监听：启用低功耗蓝牙设备特征值变化时的notify功能 */
  function updateNotify() {
    uni.notifyBLECharacteristicValueChange({
      deviceId: deviceId.value,
      serviceId: uuid,
      characteristicId: characteristics.value,
      state: true,
      success: (res) => {
        console.log(res)
        if (res.errMsg == 'notifyBLECharacteristicValueChange:ok') {
          console.log('开启消息监听------', res)
          // uni.hideLoading();
          // this.cut = false;
          // this.BLEValue();
          listenMessage()
        }
      },
      fail: (res) => {
        console.log('失败1--------', res)
      }
    })
  }
  // 将16进制的内容转成我们看得懂的字符串内容
  function hexCharCodeToStr(hexCharCodeStr) {
    const trimedStr = hexCharCodeStr.trim()
    const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
    const len = rawStr.length
    if (len % 2 !== 0) {
      alert('存在非法字符!')
      return ''
    }
    let curCharCode
    const resultStr = []
    for (let i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16)
      // @ts-ignore
      resultStr.push(String.fromCharCode(curCharCode))
    }
    return resultStr.join('')
  }

  //监听发送过来的消息
  function listenMessage() {
    uni.onBLECharacteristicValueChange((res) => {
      console.log('发送过来的数据---------', res)
      // 结果里有个value值，该值为 ArrayBuffer 类型，所以在控制台无法用肉眼观察到，必须将该值转换为16进制
      const resHex = ab2hex(res.value)
      console.log(resHex)
      // 最后将16进制转换为ascii码，就能看到对应的结果
      const result = hexCharCodeToStr(resHex)
      console.log(result)
    })
  }
  /** 关闭蓝牙连接 */
  function disconnect() {
    uni.closeBLEConnection({
      deviceId: deviceId.value,
      success: (res) => {
        console.log(res, '断开连接')
      }
    })
  }
  /** 获取蓝牙设备信息 */
  function getBluetoothDevices() {
    console.log('获取蓝牙设备')
    uni.getBluetoothDevices({
      success: (res) => {
        console.log('获取蓝牙设备成功:' + res)
        // this.bluetooth = res.devices
        // this.bluetooth.forEach((item) => {
        //   this.isLink.push(0)
        // })
      }
    })
  }
  /** ascll转换 */
  function strtoascii(str, fix = '&#') {
    if (str.length < 1) {
      return false
    }
    const arr = str.split('')
    let txt = ''
    arr.forEach(function (v: any, _i: any) {
      txt += fix + v.charCodeAt()
      // @ts-ignore
      txt = Number(txt)
    })
    return txt
  }

  /** 二进制转换 */
  function strToBinary(str) {
    const result = []

    const list = str.split('')
    console.log(list)
    for (let i = 0; i < list.length; i++) {
      if (i != 0) {
        // result.push("");
      }

      const item = list[i]

      const binaryStr = item.charCodeAt().toString(2)
      // @ts-ignore
      result.push(binaryStr)
    }

    return result
  }

  /** 发送二进制数据 */
  function writeBLECharacteristicValue() {
    const msg = '>y t s 1 \r'
    // 向蓝牙设备发送一个0x00的16进制数据
    const buffer = new ArrayBuffer(msg.length)
    const dataView = new DataView(buffer)
    // dataView.setUint8(0, 0)
    for (let i = 0; i < msg.length; i++) {
      // @ts-ignore
      dataView.setUint8(i, msg.charAt(i).charCodeAt())
    }
    uni.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: deviceId.value,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: uuid,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristics.value,
      // 这里的value是 ArrayBuffer 类型
      // @ts-ignore
      value: buffer,
      writeType: 'writeNoResponse',
      success: (res) => {
        // that.returnMessage = res.errMsg
        console.log('发送成功-----', res)
      },
      fail: (res) => {
        // that.returnMessage = res.errMsg
        console.log('发送失败-----', res)
      },

      complete: (res) => {
        console.log('发送消息结束----', res)
      }
    })
  }

  // ArrayBuffer转16进度字符串示例
  function ab2hex(buffer) {
    const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    })
    return hexArr.join('')
  }

  //获取buffer
  function getBuffer(str) {
    if (!str) {
      return new ArrayBuffer(str.length)
    }
    const buffer = new ArrayBuffer(str.length)
    const dataView = new DataView(buffer)
    let ind = 0
    for (let i = 0, len = str.length; i < len; i += 2) {
      const code = parseInt(str.substr(i, 2), 16)
      dataView.setUint8(ind, code)
      ind++
    }
    return buffer
  }

  /** 读取设备二进制数据 */
  function readBLECharacteristicValue() {
    // console.log('进入读取');
    // setTimeout(()=>{
    uni.readBLECharacteristicValue({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: deviceId.value,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: uuid,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristics.value,
      success: (res) => {
        console.log('读取成功:', res)
      },
      fail: (res) => {
        console.log('读取失败:', res)
      }
    })
  }

  return {
    open,
    stop,
    search,
    initBlue,
    getBuffer,
    readBLECharacteristicValue,
    writeBLECharacteristicValue,
    disconnect,
    updateNotify,
    getInfo,
    getBluetoothDevices,
    strtoascii,
    strToBinary
  }
}
