// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueAxios from 'vue-axios'
    
Vue.use(VueAxios, axios)

Vue.use(BootstrapVue)
Vue.use(VeeValidate)

// require('./assets/css/global.css')
require('./validation/index')
require('./assets/css/bootstrap.min.css')
require('./assets/css/bootstrap.min.rtl.css')
require('./assets/css/app.css')
// require('./assets/css/screen.css')
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
