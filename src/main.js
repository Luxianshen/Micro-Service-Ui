import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters
import VueParticles from 'vue-particles'
import { loadStyle } from './utils/util'
import * as urls from '@/config/env'
import Spinner from 'vue-spinkit'

import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

const iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi', '667895_xte3dcfrvbo6r']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VOrgTree)

// 使用登录页粒子效果插件
Vue.use(VueParticles)

// loading效果
Vue.component('Spinner', Spinner)

Vue.config.productionTip = false

Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

const vue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
console.log(vue)
