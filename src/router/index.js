import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import register from '@/components/home/register'
import login from '@/components/home//login'

import Detail from '@/components/detailPage/Detail'
import detailList from '@/components/detailList/detailList'
import redirect from '@/components/redirect'
import user from '@/components/profile/user'
import userInformation from '@/components/profile/userInformation'
import VueSession from 'vue-session'

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
// const guard = function(to, from, next) {
//   axios.get('/api/checkAuthToken').then(response => {
//       // check valid:
//       next();
//   }).catch(error => {
//       window.location.href = "/login";
//   })
// }

import generalService from '@/services/generalService'
// import service from '@/services/generalService'
Vue.use(Router)
Vue.use(VueSession)
const session = Vue.prototype.$session
let sessionObj = {
  'device': {
    'appVersion': '1.0.1',
    'brand': 't',
    'buildNo': 0,
    'deviceId': '1',
    'imei': 't',
    'imsi': 't',
    'mac': 't',
    'model': 't',
    'osVersion': 't',
    'platform': 'Android'
  }
}

var GetSession = function (to, from, next) {
  localStorage.setItem('session', 'EUc8Zc24AY9CCMjD78Y8PHFhy3RM3LWJod2j')
  generalService.setSession()
  next()
  // if (!generalService.getSession()) {
  //   generalService.postMethod('auth/session', sessionObj).then(response => {
  //     if (response.message === 'OK' && response.status === 0) {
  //       if (response.content.session) {
  //         // todo
  //         // localStorage.setItem("session",JSON.stringify(response.content.session))
  //         // ehsan
  //         localStorage.setItem('session', 'EUc8Zc24AY9CCMjD78Y8PHFhy3RM3LWJod2j')
  //         // localStorage.setItem("session","BqwGB79bYVCTPDL52nSMPZUvDGowNQXOQ2yW")
  //       }
  //       generalService.setSession()
  //       return true
  //       // next()
  //     }
  //     // eslint-disable-next-line handle-callback-err
  //   }).catch(error => {
  //     // todo
  //     // next({
  //     //   name: "login", // back to safety route //
  //     //   query: { redirectFrom: to.fullPath }
  //     // })
  //   })
  // } else {
  //   return true
  //   // next()
  // }
}
var isLogged = function () {
  if (session.has('isLogged')) {
    let logged = session.get('isLogged')
    if (logged) { return true }
  } else {
    return false
  }
}

var checkSession = function (to, from, next) {
  if (session.has('isLogged')) {
    let logged = session.get('isLogged')
    if (logged) { next() }
  } else {
    next('login')
  }
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (GetSession(to, from, next)) {
          if (isLogged()) {
            // next(-2)
            next('detailList')
          } else {
            next()
          }
        }
      },
      children: [
        {
          path: 'login',
          component: login,
          beforeRouteEnter (to, from, next) {
            debugger
          }

        },
        {
          path: 'register',
          component: register
        }
      ]
    },
    {
      path: '/detailList',
      name: 'detailList',
      component: detailList,
      beforeEnter: (to, from, next) => {
        checkSession(to, from, next)
      }
    },
    {
      path: '/detail/:fundId',
      name: 'Detail',
      component: Detail,
      beforeEnter: (to, from, next) => {
        checkSession(to, from, next)
      }
    },
    {
      path: '/redirect/:invoiceId',
      name: 'redirect',
      component: redirect,
      beforeEnter: (to, from, next) => {
        checkSession(to, from, next)
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      // beforeEnter: (to, from, next) => {
      //   generalService.getMethod('invest/user/')
      //     .then(response => {
      //       this.userInfo = response.content
      //       if (response.status === 0 && response.message === 'OK') {
      //         let userData = JSON.stringify(response.content)
      //         localStorage.setItem('userData', userData)
      //         if (response.content.registerStatus !== 'unknown') {
      //           next('/userInformation')
      //         } else {
      //           next()
      //         }
      //       } else {
      //         console.log()
      //       }
      //     })
      //     .catch(error => {
      //       console.log(error)
      //     })
      // }
    },
    {
      path: '/userInformation',
      name: 'userInformation',
      component: userInformation,
      beforeEnter: (to, from, next) => {
        checkSession(to, from, next)
      }
    }
    // end of all routes
    // check
    // {
    //   path: '*',
    //   redirect: '/login'
    // }
  ]
})
