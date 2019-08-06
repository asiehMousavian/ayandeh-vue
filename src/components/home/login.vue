<template>
  <div>
    <form>
      <div class="form-group">
        <div class="inp_border">
          <input type="text" name="mobileNumber" v-model="mobile"  class="form-control" v-validate="'required|mobileFa'">
          <div class="form-alert">
            <p>{{ errors.first('mobileNumber') }}</p>
          </div>
          <span class="format_inp">hint</span>
          <i class="placeholder">شماره موبایل</i>
          <i class="line"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="inp_border">
          <input type="password" name="password" v-model="password" class="form-control" v-validate="'required'">
          <div class="form-alert">
            <p>{{ errors.first('password') }}</p>
            <span style="color:#cb0d0d" class="format_inp">{{result}}</span>
          </div>
          <i class="placeholder">رمز عبور</i>
          <i class="line"></i>
        </div>
      </div>
      
      <div class="d-flex box_c">
        <submit-button v-bind:buttonTitle="submitTitle" v-on:submit="login"></submit-button>
      </div>
      <div class="d-flex">
        <a href="#" class="forget_pass mx-auto">فراموشی رمز عبور؟</a>
      </div>
    </form>
  </div>
</template>

<script>
import submitButton from '../share/submitButton'
import { debuglog } from 'util'
import generalService from '@/services/generalService.js'
import { userInfo } from 'os';


export default {
  name: 'login',
  data () {
    return {
      submitTitle: 'ورود به حساب کاربری',
      mobile:'09120450115',
      password:'1',
      result:''
    }
  },
  components: {
    submitButton
  },
  mounted () {
    // sharedService.handleInputLabels()
  },
  methods: {
    login: function () {
       this.$validator.validateAll().then(result => {
        if (result) {
          //let UserInfo={
          //   mobile: this.mobile,
          //   password:this.password
          // }
          // let UserInfo={
          //     email: "ehs.ghasemi@gmail.com",
          //     password:"1"
          // }
            let UserInfo={
              email: "shokri074@gmail.com",
              password:"123"
          }
           generalService.postMethod('auth/login',UserInfo).then(response => {

             if (response.message=="OK" && response.status == 0){// && 'token' in response.body) {
                this.$session.start()
                this.$session.set('isLogged', true)
                // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
                this.$router.push('detailList') 
            }
           }).catch(error=>{
              this.result = error.response.data.message
           });
          //todo
          // this.$router.push('detailList') 

        } else {
          return;
        }
      });


    }
  }
}
</script>

<style scoped>
.form-alert {
  left: 0;
  background-color: #f2f2f2;
}
.format_inp {
  display: block;
  color: #666;
  font-size: 13px;
  position: absolute;
  right: 0;
}
</style>
