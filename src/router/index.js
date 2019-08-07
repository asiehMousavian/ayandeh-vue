import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'

import Home from '@/components/home/Home'
import Detail from '@/components/detailPage/Detail'
import detailList from '@/components/detailList/detailList'
import redirect from '@/components/redirect'
import user from '@/components/profile/user'
// import service from '@/services/generalService'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/detailList',
      name: 'detailList',
      component: detailList
    },
    {
      path: '/redirect/:status',
      name: 'redirect',
      component: redirect
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
