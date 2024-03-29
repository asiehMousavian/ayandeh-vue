import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import register from '@/components/home/register'
import login from '@/components/home//login'
import verificationPage from '@/components/home/verificationPage'

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
  if (!generalService.getSession()) {
    generalService.postMethod('auth/session', sessionObj).then(response => {
      if (response.message === 'OK' && response.status === 0) {
        if (response.content.session) {
          // todo
          // localStorage.setItem("session",JSON.stringify(response.content.session))
          localStorage.setItem('session', 'EUc8Zc24AY9CCMjD78Y8PHFhy3RM3LWJod2j')
        }
        generalService.setSession()
        return true
      }
    }).catch(error => {
      return false
    })
  } else {
    return true
    // next()
    //  next({
    //   name: "login", // back to safety route //
    //   query: { redirectFrom: to.fullPath }
    // })
  }
}
var isLogged = function () {
  if (session.has('isLogged')) {
    let logged = session.get('isLogged')

    if (logged) { return true }
  } else {
    return false
  }
}
var checkIsLogged = function (to, from, next) {
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
            next('detailList')
          } else {
            next()
          }
        } else {
          next()
        }
      },
      children: [
        {
          path: 'login',
          component: login,
          beforeEnter (from, to, next) {
            session.clear()
            next()
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
        checkIsLogged(to, from, next)
      }
    },
    {
      path: '/detail/:fundId',
      name: 'Detail',
      component: Detail,
      beforeEnter: (to, from, next) => {
        checkIsLogged(to, from, next)
      }
    },
    {
      path: '/redirect/:invoiceId',
      name: 'redirect',
      component: redirect,
      beforeEnter: (to, from, next) => {
        checkIsLogged(to, from, next)
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      beforeEnter: (to, from, next) => {
        checkIsLogged(to, from, next)
        if (isLogged()) {
          generalService.getMethod('invest/user/')
            .then(response => {
              if (response.status === 0 && response.message === 'OK') {
                let userData = JSON.stringify(response.content)
                localStorage.setItem('userData', userData)
                if (response.content.registerStatus !== 'UNKNOWN') {
                  next('/userInformation')
                } else {
                  next()
                }
              } else {
                console.log()
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          next()
        }
      }
    },
    {
      path: '/userInformation',
      name: 'userInformation',
      component: userInformation,
      beforeEnter: (to, from, next) => {
        checkIsLogged(to, from, next)
      }
    },
    {
      path: '/user/:mode',
      name: 'user',
      component: user,
      beforeEnter: (to, from, next) => {
        checkIsLogged(to, from, next)
      }
    },
    {
      path: '/verification',
      name: 'verification',
      component: verificationPage,
      beforeEnter: (to, from, next) => {
        if (GetSession(to, from, next)) {
          if (isLogged()) {
            next('detailList')
          } else {
            if (session.has('mobile')) {
              let mobNum = session.get('mobile')
              if (mobNum !== '') {
                next()
                return
              }
            }
          }
          next('login')
        } else {
          next('login')
        }

        // if (from.fullPath == "/login" || from.fullPath == "/") {
        //   if (session.has('mobile')) {
        //     let mobNum = session.get('mobile')
        //     if (mobNum == "") {
        //       //todo
        //       next('login')
        //     }
        //   }
        // }
        // else if (GetSession(to, from, next)) {
        //   if (isLogged()) {
        //     next('detailList')
        //   } else {
        //     next('login')
        //   }
        // }
        // next()
      }
    },
    // end of all routes
    // check
    {
      path: '*',
      redirect: '/login'
    }
  ]
  // abort: () => {
  //   this.
  // }
})
