import request from '@/router/axios'

const baseUserUrl = '/api/v1/userClient/'

/**
 * 新增客户端
 * @param {*} userClient
 */
export const save = userClient => {
  return request({
    url: baseUserUrl + 'save',
    data: userClient,
    method: 'post'
  })
}

/**
 * 更新客户端信息
 * @param {} userClient
 */
export const update = userClient => {
  return request({
    url: baseUserUrl + 'update',
    data: userClient,
    method: 'post'
  })
}

/**
 * 获取客户端详情
 * @param {*} id
 */
export const get = id => {
  return request({
    url: baseUserUrl + 'get',
    data: {
      id: id
    },
    method: 'post'
  })
}

/**
 * 删除客户端信息
 * @param {*} id
 */
export const remove = id => {
  return request({
    url: baseUserUrl + 'delete',
    data: {
      id: id
    },
    method: 'post'
  })
}

/**
 * 分页查询用户信息
 * @param {*} pageParam
 */
export const page = pageParam => {
  return request({
    url: baseUserUrl + 'page',
    data: pageParam,
    method: 'post'
  })
}
