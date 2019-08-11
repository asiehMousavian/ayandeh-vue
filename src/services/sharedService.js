import Vue from 'vue'
import VueSnackbar from 'vue-snack' 
import 'vue-snack/dist/vue-snack.min.css'
Vue.use(VueSnackbar)

const snackbar = Vue.prototype.$snack

export default {
    Done (msg) {
      snackbar.success({
          text: msg,
          button: 'باشه'
        //   action: this.doSomeThing
        })
      },
    Failed (msg) {
      snackbar.danger({
          text: msg,
          button: 'باشه'
        })
    }
 }


//  import Vue from 'vue'
// import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
// import VuetifyToast from 'vuetify-toast-snackbar'

// // Vue.use(Vuetify, {
// //   components: {
// //     VSnackbar,
// //     VBtn,
// //     VIcon
// //   }
// // })
// Vue.use(VuetifyToast, {
// 	x: 'right', // default
// 	y: 'bottom', // default
// 	color: 'info', // default
// 	icon: 'info',
// 	classes: [
// 		'body-2'
// 	],
// 	timeout: 3000, // default
// 	dismissable: true, // default
// 	multiLine: false, // default
// 	vertical: false, // default
// 	queueable: false, // default
// 	showClose: false, // default
// 	shorts: {
// 		custom: {
// 			color: 'purple'
// 		}
// 	},
// 	property: '$toast' // default
// })

// Vue.use(VuetifyToast)

// export default {
//   Failed (msg) {
//     this.$toast('Default toast')

// this.$toast.info('Info toast')

// this.$toast('Custom options', {
// 	color: 'green',
// 	dismissable: true,
// 	queueable: true
// })

// this.$toast.custom('Custom short')
//   }
// }







 //===========================================
 //   handleInputLabels () {
//     $('.form-control').blur(function () {
//       if ($(this).val() !== '') {
//         $(this).parent().addClass('visited')
//       } else {
//         $(this).parent().removeClass('visited')
//       }
//     })
//   },
//   checkInputs: function () {
//     $('.form-control').each(function () {
//       if ($(this).val() !== '') {
//         $(this).parent().addClass('visited')
//       } else {
//         $(this).parent().removeClass('visited')
//       }
//     })
//   }