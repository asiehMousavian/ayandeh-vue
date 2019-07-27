<template>
  <div>
    <form>
      <!--<form-input v-bind:labelTitle= "PhoneTitle"></form-input>-->
      <div class="form-group">
        <div class="inp_border">
          <input type="text" name="mobileNumber" class="form-control" v-validate="'numeric'">
          <div class="form-alert">
            <p>{{ errors.first('mobileNumber') }}</p>
          </div>
          <i class="placeholder">شماره موبایل</i>
          <i class="line"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="inp_border">
          <input type="password" name="password" class="form-control">
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
export default {
  name: 'login',
  data () {
    return {
      inputVal: '',
      isVistited: false,
      submitTitle: 'ورود به حساب کاربری'
    }
  },
  components: {
    submitButton
  },
  mounted () {
    sharedService.handleInputLabels()
  },
  methods: {
    blurFunction: function () {
      // eslint-disable-next-line eqeqeq
      // if (this.inputVal != '') {
      //   this.isVistited = true
      // } else {
      //   this.isVistited = false
      // }
    },
    login: function () {
      debugger
    }
  }
}
</script>

<style scoped>

</style>
