/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from './store'
import Cookie from './api/cookie';
// axios 配置
// axios.defaults.timeout = 10000  
axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (Cookie.getCookie('token')) {
      config.headers.token = `${store.state.token}`
    }
    return config
  },
  err => {
    // if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
    //   alert('当前访问人数较多，请稍后再试')
    //   return null;
    // }
    // return Promise.reject(err)
    
  },
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
      return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        // 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT)
          
        // 只有在当前路由不是登录页面才跳转
        //   router.currentRoute.path !== 'login' &&
        //     router.replace({
        //       path: 'login',
        //       query: { redirect: router.currentRoute.path },
        //     })
        break;
        case 500:
          console.log("网络开小差，请稍后重试")
          // Toast({
          //   message: "网络开小差，请稍后重试",
          //   duration: 1000
          // });
        break;
      }
    }
    return Promise.reject(error.response)
  },
)

export default axios