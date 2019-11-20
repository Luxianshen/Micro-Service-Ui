import request from '@/router/axios'

const BasicUrl = '/api/v1/auth/menu/'

/**
 * 保存权限信息
 * @param {*} permission
 */
export const save = permission => {
  return request({
    url: BasicUrl + 'save',
    data: permission,
    method: 'post'
  })
}

/**
 * 更新权限信息
 * @param {*} permission
 */
export const update = permission => {
  return request({
    url: '/auth/menu/update',
    data: permission,
    method: 'post'
  })
}

/**
 * 获取权限详情
 * @param {*} id
 */
export const get = id => {
  return request({
    url: '/auth/menu/get',
    data: {
      id: id
    },
    method: 'post'
  })
}

/**
 * 删除权限信息
 * @param {*} id
 */
export const remove = id => {
  return request({
    url: '/auth/menu/delete',
    data: {
      id: id
    },
    method: 'post'
  })
}

/**
 * 分页查询权限信息
 * @param {*} params
 */
export const page = params => {
  return request({
    url: BasicUrl + 'page',
    data: params,
    method: 'post'
  })
}
