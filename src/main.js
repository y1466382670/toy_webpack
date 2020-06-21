// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs

var root = process.env.API_ROOT;
//请求拦截
axios.interceptors.request.use((config) => {

  // 设置全局请求头
  if (config.url !== '/auth/auth.login') {// 登录接口不加请求头
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers.common['Authorization'] = AUTH_TOKEN
  }
  //请求之前重新拼装url
  config.url = root + config.url;
  return config;
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)
  // Do something with response data
  if (response.data.code === '401') {
    ElementUI.Message({
      message: '登陆过期',
      type: 'error'
    })
    localStorage.clear()
    router.replace({
      path: '/'
    })
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
