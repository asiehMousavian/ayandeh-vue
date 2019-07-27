<template>
  <div>
    <div class="box_text">
      <div class="text">
        <p>اگر مشتری بانک آینده باشید به سهولت میتوانید به صندوق‌های
          سرمایه‌گذاری دسترسی داشته باشید</p>
      </div>
    </div>
    <form>
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
      <!--<form-input v-bind:labelTitle= "accountNumber"></form-input>-->
      <div class="d-flex">
        <submit-button v-bind:buttonTitle="registerButton" v-on:submit="register"></submit-button>
      </div>
    </form>
  </div>
</template>

<script>
import FormInput from '../share/FormInput'
import submitButton from '../share/submitButton'
export default {
  name: 'register',
  data () {
    return {
      accountNumber: 'شماره حساب',
      registerButton: 'ورود به پیشخوان'
    }
  },
  components: {
    submitButton, FormInput
  },
  methods: {
    register: function () {
      // alert("register submit")
    }
  }
}
</script>

<style scoped>

</style>
