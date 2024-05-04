import type ClUpload from '@/components/cl-upload/cl-upload.vue'
import PostCard from '@/components/PostCard/PostCard.vue'
import ShowCard from '@/components/ShowCard/ShowCard.vue'
import PupupPassword from '@/components/PupupPassword/PupupPassword.vue'

import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    ClUpload: typeof ClUpload
    PostCard: typeof PostCard
    ShowCard: typeof ShowCard
    PupupPassword: typeof PupupPassword
  }
}

// 组件实例类型声明
export type IShowCard = InstanceType<typeof ShowCard>
export type IPostCard = InstanceType<typeof PostCard>
export type IPupupPassword = InstanceType<typeof PupupPassword>
