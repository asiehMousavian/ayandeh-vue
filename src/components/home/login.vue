<template>
  <div>
    <form id="loginForm">
      <div class="form-group">
        <div class="inp_border">
          <input type="text" name="mobileNumber" v-model="mobile"  class="form-control" v-validate="'required|mobileFa'">
          <div class="form-alert">
            <p>{{ errors.first('mobileNumber')}}</p>
            <!-- <p>نمونه شماره موبایل : ۰۹۱۲۱۱۲۲۳۲۱</p> -->
          </div>
          <span class="format_inp">نمونه شماره موبایل : ۰۹۱۲۱۱۲۲۳۲۱</span>
          <i class="placeholder">شماره موبایل</i>
          <i class="line"></i>
        </div>
      </div>
      <!-- <div class="form-group">
        <div class="inp_border">
          <input type="password" name="password" v-model="password" class="form-control" v-validate="'required'">
          <div class="form-alert">
            <p>{{ errors.first('password') }}</p>
            <span style="color:#cb0d0d" class="format_inp">{{responseRresult}}</span>
          </div>
          <i class="placeholder">رمز عبور</i>
          <i class="line"></i>
        </div>
      </div> -->
      <br>
      <div class="d-flex box_c">
        <!-- <button  :disabled = 'errors.any() || isComplete' type="button" class="btn mx-auto" @click.prevent="login">{{submitTitle}}</button> -->
        <VueLoadingButton :disabled = 'errors.any() || !isComplete' type="button" class="btn mx-auto" @click.native="login" :loading="isLoading">{{submitTitle}}</VueLoadingButton>
      </div>
      <!-- <div class="d-flex">
        <a href="#" class="forget_pass mx-auto">فراموشی رمز عبور؟</a>
      </div> -->
    </form>
  </div>
</template>

<script>
// import generalService from '@/services/generalService'
import VueLoadingButton from 'vue-loading-button'
// import sharedService from '@/services/sharedService'
export default {
  name: 'login',
  data () {
    return {
      submitTitle: 'ورود به حساب کاربری',
      mobile: '',
      password: '',
      result: '',
      isLoading: false,
      responseRresult: ''
    }
  },
  components: {VueLoadingButton},
  computed: {
    isComplete () {
      return this.mobile // && this.password
    }
  },
  methods: {
    login: function () {
      this.isLoading = true
      // setTimeout(() => {
      this.$validator.validateAll().then(result => {
        if (result) {
          // let UserInfo={
          //   mobile: this.mobile,
          //   password:this.password
          // }

          // let UserInfo = {
          //   email: 'ehs.ghasemi@gmail.com',
          //   password: 'xGgcO5Re'
          // }
          //   let UserInfo={
          //     email: "shokri074@gmail.com",
          //     password:"123"

          // let UserInfo = {
          //   email: 'ehs.ghasemi@gmail.com',
          //   password: 'xGgcO5Re'

          // }
          // generalService.postMethod('auth/login', UserInfo).then(response => {
          //   if (response.message === 'OK' && response.status === 0) {
          //     if (response.content.user.isActive) {
          //       //todo start ?
          //       this.$session.start()
          //       this.$session.set('isLogged', true)
          //       this.$session.set('clientInfo', JSON.stringify(response.content.user))
          //       this.$router.push('detailList')
          //       return
          //     }
          //     else {
          //       sharedService.registerFailed('حساب کاربری شما در انتظار تایید است')
          //     }
          //   }
          // }).catch(error => {
          //   this.responseRresult = error.response.data.message
          // })

          // azade 12-06-98
          this.$session.set('mobile', this.mobile)
          this.$router.push('verification')
        } else {
          // todo
        }
      })
      // this.isLoading = false
      // }, 1000)
    }
  }
}
</script>
<style scoped>

  /*.form-alert {*/
  /*  background-color: #fff;*/
  /*}*/
  /*.format_inp {*/
  /*  display: block;*/
  /*  color: #575757;*/
  /*  font-size: 15px;*/
  /*  position: absolute;*/
  /*  right: 0;*/
  /*  direction: ltr;*/
  /*}*/
</style>
