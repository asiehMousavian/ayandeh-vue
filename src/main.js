// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMask from 'v-mask'
import VueSession from 'vue-session'
import VueSnackbar from 'vue-snack'
import 'vue-snack/dist/vue-snack.min.css'

import DatatableFactory from 'vuejs-datatable'

// import VuePromiseBtn from 'vue-promise-btn'
// // // not required. Styles for built-in spinner
// // import 'vue-promise-btn/dist/vue-promise-btn.css'
// Vue.use(VuePromiseBtn) // or with global options:  Vue.use(VuePromiseBtn, {loader: '...'})
// Vue.prototype.$clientName = {value: 'ورود / عضویت'}
// Vue.mixin({
//   data: function() {
//     return {
//       globalVar:'global'
//     }
//   }
// })
// let globalData = new Vue({
//   data: { $globalVar: 'green' }
// });
// Vue.mixin({
//   computed: {
//     $globalVar: {
//       get: function () { return globalData.$data.$globalVar },
//       set: function (newColor) { globalData.$data.$globalVar = newColor; }
//     }
//   }
// })

Vue.use(VueSnackbar)
Vue.use(VueSession)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.use(VueMask)
Vue.use(DatatableFactory)

// require('./assets/css/global.css')
require('./validation/index')
require('./assets/css/bootstrap.min.css')
require('./assets/css/bootstrap.min.rtl.css')
require('./assets/css/app.css')
require('./assets/js/jquery.js')
// require('./assets/css/screen.css')
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
