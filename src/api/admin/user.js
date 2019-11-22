import request from '@/router/axios'

const baseUserUrl = '/api/v1/user/'

/**
 * 新增用户
 * @param {*} user
 */
export const save = user => {
  return request({
    url: baseUserUrl + 'register',
    data: user,
    method: 'post'
  })
}

/**
 * 更新用户信息
 * @param {} user
 */
export const update = user => {
  return request({
    url: baseUserUrl + 'update',
    data: user,
    method: 'post'
  })
}

/**
 * 获取用户详情
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
 * 删除用户信息
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

/**
 * 修改密码
 * @param {*} params
 */
export const changeAuth = params => {
  return request({
    url: baseUserUrl + 'changeAuth',
    data: params,
    method: 'post'
  })
}
