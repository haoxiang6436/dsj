import request from '@/utils/request.js'
// 获取文章分类
export const artGetChannelService = () => request.get('/my/cate/list')
// 添加文章分类
export const artAddChannelService = (data) => {
  return request.post('/my/cate/add', data)
}
// 更新文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
// 删除文章分类
export const artDelChannelService = (id) => {
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
// 获取文章列表
export const artGetManageService = (params) =>
  request.get('/my/article/list', { params })
// 发布文章
export const artAddArticleService = (data) =>
  request.post('/my/article/add', data)
// 获取文章详情
export const artGetArticleDetailsService = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })
// 更新文章信息
export const artUpdateArticleService = (data) =>
  request.put('/my/article/info', data)
// 删除文章
export const artDelArticleService = (id) =>
  request.delete('/my/article/info', {
    params: {
      id
    }
  })
