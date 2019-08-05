import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import register from '@/components/home/register'
import login from '@/components/home//login'


import Detail from '@/components/detailPage/Detail'
import detailList from '@/components/detailList/detailList'
import redirect from '@/components/redirect'
import user from '@/components/profile/user'

Vue.use(Router)


// router.beforeEach((to, from, next) => {
//   if(to.path != '/login') {
//       if(checkToken()) { 
//           logger('There is a token, resume. (' + to.path + ')');
//           next();
//       } else {
//           logger('There is no token, redirect to login. (' + to.path + ')');
//           next('login');
//       }
//   } else {
//       logger('You\'re on the login page');
//       next(); // This is where it should have been
//   }
//   // next(); - This is in the wrong place
// });


const guard = function(to, from, next) {
  axios.get('/api/checkAuthToken').then(response => {
      // check valid:
      next();
  }).catch(error => {
      window.location.href = "/login";
  })
};


export default new Router({
  mode: 'history',
  routes: [
  
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'login',
          component: login
        },
        {
          path:'register',
          component:register
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
      //check
      // beforeEnter: (to, from, next) => {
      //   guard(to, from, next);
      // }
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

//end of all routes
      //check
      // {
      //   path: '*',
      //   redirect: '/login'
      // }
  ]
})
