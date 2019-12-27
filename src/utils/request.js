import axios from 'axios'
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

axios.interceptors.response.use(function () {

}, function () {

})
export default axios
