// 网关地址
// const GATEWAY_HOST = process.env.GATEWAY_HOST || 'gateway.jximec.com'
const GATEWAY_HOST = process.env.GATEWAY_HOST || '127.0.0.1'
const GATEWAY_PORT = process.env.GATEWAY_PORT || '8078'
const TOKEN_PORT = process.env.TOKEN_PORT || '8076'
const TTANSMIT_PORT = process.env.TTANSMIT_PORT || '8079'

// 转发配置
// 本地
module.exports = {
  proxyList: {
    '/api': {
      target: 'http://' + GATEWAY_HOST + ':' + GATEWAY_PORT,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
    '/token': {
      target: 'http://' + GATEWAY_HOST + ':' + TOKEN_PORT,
      changeOrigin: true
    },
    '/tranmist': {
      target: 'http://' + GATEWAY_HOST + ':' + TTANSMIT_PORT,
      changeOrigin: true
    }
  }
}
// 正式
// module.exports = {
//   proxyList: {
//     '/api': {
//       target: 'http://' + GATEWAY_HOST,
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '/gateway'
//       }
//     },
//     '/token': {
//       target: 'http://' + GATEWAY_HOST,
//       changeOrigin: true
//     },
//     '/tranmist': {
//       target: 'http://' + GATEWAY_HOST,
//       changeOrigin: true
//     }
//   }
// }
