const prefix = '/post/'
export const PostApi = {
  /** 帖子列表 */
  list: () => http({ url: prefix + 'list' }),
  /** 根据id查询帖子 */
  getPostById: (id: number) => http({ url: prefix + 'id', data: { id } }),
  /** 发布帖子 */
  addPost: (data) => {
    return http({ url: prefix + 'savePost', data }, true)
  },
  /** 删除帖子 */
  delPost: (data) => {
    return http({ url: prefix + 'deletePost', data })
  },
  /** 发布评论 */
  addComment: (data) => {
    return http({ url: prefix + 'comment', data })
  },
  /** 删除评论 */
  delComment: (commentId: number) => {
    return http({ url: prefix + 'deleteComment', data: { commentId } })
  },
  /** 点赞 */
  like: (data) => {
    return http({ url: prefix + 'like', data })
  },
  /** 根据id查询评论 */
  getCommentById: (data: IPage & { postId: number }) => {
    return http({ url: prefix + 'post/comment', data })
  }
}
