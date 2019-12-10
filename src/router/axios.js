import axios from 'axios'
import store from '../store'
import { getToken, setToken, getRefreshToken } from '@/utils/auth'
import { isNotEmpty } from '@/utils/util'
import { refreshToken } from '@/api/admin/login'
import { Message } from 'element-ui'
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
const whiteList = ['/token/removeToken']// 白名单

// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({ showSpinner: false })// NProgress Configuration

// HTTP request拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  config.headers['Content-Type'] = 'application/json'
  if (store.getters.access_token && whiteList.indexOf(config.url) === -1) {
    const authorization = config.headers['Authorization']
    if (authorization === undefined || authorization.indexOf('Basic') === -1) {
      config.headers['Authorization'] = getToken() // 让每个请求携带token
    }
  }
  // transform form data as json string
  config.transformRequest = [function (data) {
    const requestBody = JSON.stringify({
      timestamp: new Date().getTime(),
      sign: 'nosign',
      data: data
    })
    return requestBody
  }]
  return config
}, error => {
  return Promise.reject(error)
})

// HTTP response拦截
axios.interceptors.response.use(data => {
  NProgress.done()
  return data
}, error => {
  NProgress.done()
  debugger
  if (error.response) {
    const originalRequest = error.config
    const currentRefreshToken = getRefreshToken()
    // 接口返回401并且已经重试过，自动刷新token
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry && isNotEmpty(currentRefreshToken)) {
      // 退出请求
      if (originalRequest.url.indexOf('removeToken') !== -1) {
        return
      }
    } else if (error.response.data.message === 'TOKEN过期') {
      // 刷新失败，执行退出
      store.dispatch('LogOut').then(() => location.reload())
    } else {
      // 其它错误则弹出提示
      const { code, data } = error.response.data
      const errMsg = data || errorCode[code] || errorCode['default']
      // TODO 跳转到对应的404、500提示页面
      Message({ message: errMsg, type: 'error' })
    }
  }
  return Promise.reject(new Error(error))
})

export default axios
