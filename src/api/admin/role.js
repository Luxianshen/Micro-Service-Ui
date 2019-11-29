import request from '@/router/axios'

const BasicUrl = '/api/v1/auth/role/'
const BasicApiUrl = '/api/transmit/api/'

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
export const addUser = params => {
  return request({
    url: BasicUrl + 'addUser',
    data: params,
    method: 'post'
  })
}

/**
 * 删除用户角色
 * @param {*} params
 */
export const removeUser = params => {
  return request({
    url: BasicUrl + 'removeUser',
    data: params,
    method: 'post'
  })
}

/**
 * 授权权限给角色
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
 * 取消角色权限
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
 * 授权接口给角色
 * @param {*} params
 */
export const grantApi = params => {
  return request({
    url: BasicApiUrl + 'grant',
    data: params,
    method: 'post'
  })
}

/**
 * 取消角色接口
 * @param {*} params
 */
export const revokeApi = params => {
  return request({
    url: BasicApiUrl + 'revoke',
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
