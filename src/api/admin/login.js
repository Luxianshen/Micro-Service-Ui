import request from '@/router/axios'
import { getRefreshToken } from '@/utils/auth'
const baseAuthenticationUrl = '/api/auth/v1/authentication/'

const basicAuthorization = 'Basic ' + btoa('web_app:spring-microservice-exam-secret')

/**
 * 登录
 * @param identifier 账号
 * @param credential 密码
 * @param code 验证码
 * @param randomStr 随机数
 */
export function loginByUsername (identifier, credential, code, randomStr) {
  const loginType = 0
  return request({
    url: '/api/token/login',
    headers: {
      'Authorization': basicAuthorization
    },
    method: 'post',
    params: { userName: identifier, passWord: credential, randomStr, validCode: code, loginType: loginType }
  })
}

export function logout (accesstoken, refreshToken) {
  return request({
    url: baseAuthenticationUrl + 'removeToken',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/api/v1/user/info',
    method: 'get'
  })
}

/**
 * 刷新token
 */
export function refreshToken () {
  //  grant_type为refresh_token
  const grantType = 'refresh_token'
  const scope = 'read'
  const refreshToken = getRefreshToken()
  return request({
    url: '/api/auth/oauth/token',
    headers: {
      'Authorization': basicAuthorization
    },
    method: 'post',
    params: { grant_type: grantType, scope, refresh_token: refreshToken }
  })
}
