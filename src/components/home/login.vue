<template>
  <div>
    <form id="loginForm">
      <div class="form-group">
        <div class="inp_border">
          <input type="text" name="mobileNumber" v-model="mobile"  class="form-control" v-validate="'required|mobileFa'">
          <div class="form-alert">
            <p>{{ errors.first('mobileNumber') }}</p>
          </div>
          <span class="format_inp"> <span id="phoneHint">0912********</span> :نمونه شماره موبایل</span>
          <i class="placeholder">شماره موبایل</i>
          <i class="line"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="inp_border">
          <input type="password" name="password" v-model="password" class="form-control" v-validate="'required'">
          <div class="form-alert">
            <p>{{ errors.first('password') }}</p>
            <span style="color:#cb0d0d" class="format_inp">{{responseRresult}}</span>
          </div>
          <i class="placeholder">رمز عبور</i>
          <i class="line"></i>
        </div>
      </div>
      <div class="d-flex box_c">
        <!-- <button  :disabled = 'errors.any() || isComplete' type="button" class="btn mx-auto" @click.prevent="login">{{submitTitle}}</button> -->
        <VueLoadingButton :disabled = 'errors.any() || isComplete' type="button" class="btn mx-auto" @click.native="login" :loading="isLoading">{{submitTitle}}</VueLoadingButton>
      </div>
      <div class="d-flex">
        <a href="#" class="forget_pass mx-auto">فراموشی رمز عبور؟</a>
      </div>
    </form>
  </div>
</template>

<script>
import generalService from '@/services/generalService'
import sharedService from '@/services/sharedService'
import VueLoadingButton from 'vue-loading-button'

export default {
  name: 'login',
  data () {
    return {
      submitTitle: 'ورود به حساب کاربری',
      mobile: '',
      password: '',
      responseRresult:'',
      isLoading:false
    }
  },
  components:{VueLoadingButton},
  computed: {
    isComplete () {
      this.$validator.validateAll().then(result => {
      return result
   })
  }
},
  methods: {
    login: function () {
      this.isLoading = true;
      setTimeout(() => 
      {
        this.$validator.validateAll().then(result => {
        if (result) {
          // let UserInfo={
          //   mobile: this.mobile,
          //   password:this.password
          // }
          let UserInfo = {
            email: 'ehs.ghasemi@gmail.com',
            password: '1'
          }
          //   let UserInfo={
          //     email: "shokri074@gmail.com",
          //     password:"123"
          // }
          generalService.postMethod('auth/login', UserInfo).then(response => 
          {
            if (response.message === 'OK' && response.status === 0) {
              if(response.content.user.isActive)
              {
                let fullname=response.content.user.firstName +" "+response.content.user.lastName
                this.$session.start()
                this.$session.set('isLogged', true)
                this.$session.set('clientName', fullname)
                // this.$clientName.value=fullname
                this.$router.push('detailList')
              }
              else
              {
                sharedService.Failed("حساب کاربری شما در انتظار تایید است")
              }
              
            }
          }).catch(error => 
          {
           this.responseRresult= error.response.data.message
          })
        }
         else {}
      })
      this.isLoading = false}, 1000);
    }
  }
}
</script>

<style scoped>
.form-alert {
  left: 0;
  background-color: #fff;
}
.format_inp {
  display: block;
  color: #575757;
  font-size: 15px;
  position: absolute;
  right: 0;
  direction: ltr;
}

#loginForm #phoneHint
{
  direction: ltr;
}

@media only screen and (max-width: 991px) {
 #loginForm .format_inp {
    font-size: 12px;
  }
}
@media only screen and (max-width: 567px) {
 #loginForm .format_inp {
    font-size: 10px;
  }
}

.btn {
  height: 48px;
  line-height: 47px;
  font-size: 18px;
  font-family: "Iransans_Bold";
  padding: 0 45px;
  cursor: pointer;
}
</style>
