import request from '@/utils/request'
/**
 * 获取系统列表
 */
// export const getSystemType = () => {
//   return request({
//     url: '/admin/combo/systemType',
//     method: 'post'
//   })
// }

/**
 * 获取权限类型
 */
export const getPermissionType = () => {
  return request({
    url: '/admin/combo/permissionType',
    method: 'post'
  })
}

/**
 * 获取机构类型
 */
export const getOrgType = () => {
  return request({
    url: '/admin/combo/orgType',
    method: 'post'
  })
}
