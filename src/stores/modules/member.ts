import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<Iuser.profile>({
      userId: 114514,
      userToken: '114514',
      phone: '19070654275',
      nickname: '王東',
      avatar: 'https://cdn.jsdelivr.net/gh/wardendon/wiki-image@main/img/huaji.png',
      gender: 1,
      brief: '火烧火燎的感觉正在飘散',
      areaCode: '320000,320100,320113',
      areaAddress: '江苏省 南京市 栖霞区'
    })

    // 保存会员信息，登录时使用
    const setProfile = (val: Iuser.profile) => {
      profile.value = val
    }

    return { profile, setProfile }
  },
  {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)
