// 处理路由拦截器 导航守卫
import router from '../router'
// 全局前置守卫 当 路由发生变化时 这个方法里的回调函数就会执行
router.beforeEach(function (to, from, next) {
// 权限拦截 认为有token 让过去 没不让
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
