import request from '@/router/axios'

const BasicUrl = '/api/transmit/'

/**
 * 保存接口信息
 * @param {*} tranmist
 */
export const save = tranmist => {
  return request({
    url: BasicUrl + 'save',
    data: tranmist,
    method: 'post'
  })
}

/**
 * 更新接口信息
 * @param {*} tranmist
 */
export const update = tranmist => {
  return request({
    url: BasicUrl + 'update',
    data: tranmist,
    method: 'post'
  })
}

/**
 * 获取接口详情
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
 * 删除接口信息
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
 * 分页查询接口信息
 * @param {*} params
 */
export const page = params => {
  return request({
    url: BasicUrl + 'page',
    data: params,
    method: 'post'
  })
}
