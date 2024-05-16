const prefix = '/post/'
export const PostApi = {
  /** 帖子列表 */
  list: () => http({ url: prefix + 'list' }),
  /** 根据id查询帖子 */
  getPostById: (id: number) => http({ url: prefix + 'id', data: { id } })
}
