<template>
  <div>
    <form>
      <div class="form-group">
        <div class="inp_border">
          <input type="text" name="mobileNumber" v-model="mobile" class="form-control" v-validate="'required|mobileFa'">
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
import sharedService from '@/services/sharedService'
import submitButton from '../share/submitButton'
import generalService from "@/services/generalService";

export default {
  name: 'login',
  data () {
    return {
      submitTitle: 'ورود به حساب کاربری',
      mobile:'',
      password:'',
      result:''
    }
  },
  components: {
    submitButton
  },
  mounted () {
    sharedService.handleInputLabels()
  },
  methods: {
   
    login: function () {
       this.$validator.validateAll().then(result => {
        if (result) {
           generalService.postMethod("auth/login",{mobileNumber: this.mobile ,password:this.password}).then(Response => {
             if (response.status === 200 && 'token' in response.body) {
              this.$session.start()
              this.$session.set('mySession', response.body.token)
              Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token

              this.$router.push('detailList') 
            }
           }).catch(error=>{
             this.result="شماره موبایل یا رمز ورود اشتباه است"
           });
          //todo
          this.$router.push('detailList') 

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
