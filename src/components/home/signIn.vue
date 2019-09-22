<template>
  <div id="registerPage">
    <div>
      <div class="box_text">
        <div class="text">
          <p>
            شماره موبایل خود را وارد کنید
          </p>
        </div>
      </div>
      <form>
        <div class="form-group">
          <div class="inp_border">
            <input type="text" v-model="mobile" name="mobileNumber" class="form-control" v-validate="'required|mobileFa'"/>
            <div class="form-alert">
              <p>{{ errors.first('mobileNumber') }}</p>
            </div>
            <span class="format_inp">نمونه شماره موبایل : ۰۹۱۲۱۱۲۲۳۲۱</span>
            <i class="placeholder">شماره موبایل</i>
            <i class="line"></i>
          </div>
        </div>
        <div class="d-flex box_c">
          <button  type="button" :disabled = 'errors.any() || !isValidMobile' class="btn mx-auto" @click.prevent="sendSmsCode">مرحله بعد</button>
        </div>
        <div class="d-flex">
          <a href="" @click.prevent="goToWithAccount" class="forget_pass mx-auto">حساب بانک آینده دارید؟</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import generalService from "@/services/generalService"
  import sharedService from "@/services/sharedService"
  export default {
    name: "signIn",
    data() {
      return {
        account: '',
        nationalId:'',
        mobile:''
      }
    },
    beforeUpdate () {
      sharedService.handleInputLabels()
      sharedService.checkInputs()
      sharedService.toggleMenu()
    },
    computed: {
       isValidMobile() {
        return this.mobile
      },
        isValidId() {
        return this.nationalId
      },
    },
    methods: {
       goToWithoutAccount(){
        this.$emit("goToWithoutAccount", true)
      },
      goToWithAccount(){
         this.$emit("goToWithAccount", true)
      },
      sendSmsCode()
      {
        this.$session.set('nationalId', this.nationalId)
        this.$session.set('mobile', this.mobile)
        this.$router.push('verification')
      }
 
    }
  };
</script>
<style scoped>
</style>
