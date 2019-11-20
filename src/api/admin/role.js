import request from '@/router/axios'

const BasicUrl = '/api/v1/auth/role/'

/**
 * 保存信息
 * @param {*} param0
 */
export const save = info => {
  return request({
    url: BasicUrl + 'save',
    data: info,
    method: 'post'
  })
}

/**
 * 更新信息
 * @param {*} param0
 */
export const update = info => {
  return request({
    url: BasicUrl + 'update',
    data: info,
    method: 'post'
  })
}

/**
 * 获取信息
 * @param {*} id
 */
export const get = id => {
  return request({
    url: BasicUrl + 'get',
    data: {
      id: id
    },
    method: 'post'
  })
}

/**
 * 删除系统信息
 * @param {*} id
 */
export const remove = id => {
  return request({
    url: BasicUrl + 'delete',
    data: {
      id: id
    },
    method: 'post'
  })
}

/**
 * 分页查询系统信息
 * @param {*} page
 */
export const page = page => {
  return request({
    url: BasicUrl + 'page',
    data: page,
    method: 'post'
  })
}

/**
 * 获取用户列表（含授权状态）
 * @param {*} page
 */
export const authUserPage = page => {
  return request({
    url: BasicUrl + 'authUserPage',
    data: page,
    method: 'post'
  })
}

/**
 * 授权角色给用户
 * @param {*} params
 */
export const grant = params => {
  return request({
    url: BasicUrl + 'grant',
    data: params,
    method: 'post'
  })
}

/**
 * 取消用户角色授权
 * @param {*} params
 */
export const revoke = params => {
  return request({
    url: BasicUrl + 'revoke',
    data: params,
    method: 'post'
  })
}

/**
 * 获取权限树
 * @param {*} params
 */
export const findAuthPermissionTree = params => {
  return request({
    url: BasicUrl + 'findAuthPermissionTree',
    data: params,
    method: 'post'
  })
}
