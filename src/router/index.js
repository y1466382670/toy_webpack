import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Home from '@/view/home'
import Index from '@/view/index'
import User from '@/view/user/user'
import BookClassify from '@/view/book_classify/bookClassify'
import BookInfo from '@/view/book_info/bookInfo'
import BookClassifyDetail from '@/view/book_classify_detail/bookClassifyDetail'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/bookClassify',
          name: 'bookClassify',
          component: BookClassify
        },
        {
          path: '/bookInfo',
          name: 'bookInfo',
          component: BookInfo
        },
        {
          path: '/bookClassifyDetail',
          name: 'bookClassifyDetail',
          component: BookClassifyDetail
        }
      ]
    }
  ]
})
