import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
// 封装一个axios

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置一个常态值
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 请求通过
  // config 请求参数配置
  let token = window.localStorage.getItem('user-token')// 取token

  config.headers.Authorization = `Bearer ${token}`// 统一注入token
  return config // 表示会用该config
}, function () {
// 请求错误
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
// 成功时执行该函数 状态码 200/201/204
  return response.data ? response.data : {}
}, function (error) {
// 失败时执行该函数
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数失败'
      break
    case 507 :
      message = '服务器数据库异常'
      break
    case 401:
      window.localStorage.removeItem('user-token')// 删除过期的token
      router.push('/login')
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})
export default axios
