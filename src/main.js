import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookie from './api/cookie.js'
// import Api from './api/index.js';
// import Axios from 'axios';

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'



import Axios from './http';
import share from './api/share.js'

import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

Vue.use(ElementUI)
Vue.use(Mint)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$Axios = Axios;

router.afterEach((to,from) => {
  window.scrollTo(0,0);
})


// //判断是否登录了 授权
// router.beforeEach((to, from ,next) => {
  
//   // next();
//   // avatar  不等于空就是登录了  就可以做其他事情了  
//   if( Cookie.getCookie('token') == null  &&  to.path != '/userlogin'){
//     next({ 
//       path: '/',
//       replace: true
//     })
//   }else{
//     next();
//   }
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
