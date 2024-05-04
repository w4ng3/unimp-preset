import { createPinia } from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(createUnistorage())
// 重写reset方法，因为setup写法的 $reset方法无效
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    // console.log('初始值 :>> ', initialState)
    store.$patch(initialState)
  }
})

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/member'
