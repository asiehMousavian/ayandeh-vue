import Vue from 'vue'
import VueSnackbar from 'vue-snack'
import 'vue-snack/dist/vue-snack.min.css'
Vue.use(VueSnackbar)
const snackbar = Vue.prototype.$snack

/* eslint-disable */
export default {
  //todo use log to see how many times this function is called
  //VerificationcheckInputs () {
    // $('.verificationCode input').each(function () {
    //   if ($(this).val().length == 1)
    //     $(this).next().focus()
    //     // $(this).next().addClass('visited')
    // })
  //},

test2(id){
  $(id).val("");
},
test(id,length)
{
    if($(id).val().length==length){
        $(id).next().focus();
    }
  //   if($(id).val().length==0){
  //     $(id).before().focus();
  // }
},


  handleInputLabels () {
    $('.form-control').blur(function () {
      if ($(this).val() !== '') {
        $(this).parent().addClass('visited')
      } else {
        $(this).parent().removeClass('visited')
      }
    })
  },
  checkInputs () {
    $('.form-control').each(function () {
      //if ($(this)[0].val() !== '') {
      if ($(this).val() !== '') {
        $(this).parent().addClass('visited')
      } else {
        $(this).parent().removeClass('visited')
      }
    })
  },
  toggleMenu () {
    $('.toggle_menu').click(function () {
      $('.filter_body').css('display', 'block')
      $('.small_menu').animate({'right': '0px'}, 400)
    })
    $('.small_menu .small_menu_close').click(function () {
      $('.filter_body').css('display', 'none')
      $('.small_menu').animate({'right': '-300px'}, 400)
    })
    $('.filter_body').click(function () {
      $('.small_menu').animate({'right': '-300px'}, 400)
      $(this).css('display', 'none')
    })
  },
  requestDone (msg) {
    snackbar.success({
      text: msg,
      button: 'باشه',
      // color: '#ddd'
      //   action: this.doSomeThing
    })
  },
  requestFailed (msg) {
    snackbar.danger({
      text: msg,
      button: 'باشه'
    })
  },
  checkReadOnly () {
    $('.form-control').each(function () {
      if ($(this[0]).val() !== '') {
        $(this).attr('readonly', true);
      } else {
        $(this).removeAttr('readonly');
      }
    })
  },
  showModal() {
    $('.modal .modal-content .modal_extra').addClass('active')


    //$('.modal .modal-content .box_tab .box_tab_t ul').css("border","none")
    // $('.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link').addClass("box_tab");
    // $('.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link').addClass("box_tab_t");

    // $('.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link').css({"display":"block","height":"68px","line-height":"68px","text-align":"center"," font-family":"Iransans_Medium"});
    // $('.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active').css({"color":"#7d4434", "position":"relative"});

  },
  closeModal(){
    $('.modal .modal-content .modal_extra').removeClass('active')
  },
  loginBox () {
    $('#header .header .login_link .login_link_t').click(function () {
      if ($(this).parent().hasClass('active')){
        $(this).parent().removeClass('active');
        $(this).next().fadeOut(300);
      }
      else {
        $(this).parent().addClass('active');
        $(this).next().fadeIn(300);
      }
    });
  },
  closeLoginBox() {
    $('#header .header .login_link .login_link_box > ul > li > a').click(function () {
      $(this).parent().parent().parent().fadeOut(300);
      $(this).parent().parent().parent().parent().removeClass('active');
    });
  }
}




