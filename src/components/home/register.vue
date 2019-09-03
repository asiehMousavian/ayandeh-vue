<template>
  <div id="registerPage">
    <div v-if= "signupStep =='first'">
      <div class="box_text">
        <div class="text">
          <p>
            اگر مشتری بانک آینده باشید به سهولت میتوانید به صندوق‌های
            سرمایه‌گذاری دسترسی داشته باشید
          </p>
        </div>
      </div>
      <div id="signUpS1">
        <div class="option" @click.prevent= "goToWithAccount">
          <div class="d-flex justify-content-between">
            <img src="@/assets/img/MaskGroup.png" alt="" />
            <span >حساب بانک آینده دارم</span>
          </div>
        </div>
        <div class="option" @click.prevent= "goToWithoutAccount">
          <div class="d-flex justify-content-between">
            <img src="@/assets/img/smartphone.png" alt="" />
            <span>ورود با شماره تلفن</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if= "signupStep=='withAccount'">
      <div class="box_text">
        <div class="text">
          <!-- <p>
          شماره حساب بانک آینده و کد ملی خود را وارد کنید
          </p> -->
          <p>
            کد ملی خود را وارد کنید
          </p>
        </div>
      </div>
      <form>
        <!-- <div class="form-group">
          <div class="inp_border">
            <input type="text" v-model="account" name="accountNumber" class="form-control" v-validate="'required|ayandeAccountNumber'" />
            <div class="form-alert">
              <p>{{ errors.first('accountNumber') }}</p>
            </div>
            <span class="format_inp">نمونه شماره حساب : 021586521485</span>
            <i class="placeholder">شماره حساب</i>
            <i class="line"></i>
          </div>
        </div> -->
        <div class="form-group">
          <div class="inp_border">
            <input type="text" v-model="nationalId" name="nationalId" class="form-control" v-validate="'required|nationalCode'"/>
            <div class="form-alert">
              <p>{{ errors.first('nationalId') }}</p>
            </div>
            <i class="placeholder">کد ملی</i>
            <i class="line"></i>
          </div>
        </div>
        <div class="d-flex box_c">
          <button :disabled = 'errors.any() || !isComplete' type="button" class="btn mx-auto" @click.prevent="sendSmsCode">مرحله بعد</button>
        </div>
        <div class="d-flex">
          <a href="" @click.prevent="goToWithoutAccount" class="forget_pass mx-auto">حساب بانک آینده ندارید؟</a>
        </div>
      </form>
    </div>
    <div v-else-if= "signupStep=='withoutAccount'">
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
          <button  type="button" class="btn mx-auto" @click.prevent="sendSmsCode">مرحله بعد</button>
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
    name: "register",
    data() {
      return {
        account: '',
        signupStep:'first',
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
      isComplete() {
        // return this.account && this.nationalId
        return this.nationalId
      }
    },
    methods: {
      goToWithoutAccount(){
        this.signupStep="withoutAccount"
      },
      goToWithAccount(){
        this.signupStep="withAccount"
      },
      // getCustomerAccount()
      // {
      //   //todo
      //   //get account and send message
      //   this.sendSmsCode()
      // },
      sendSmsCode()
      {
        this.$session.set('nationalId', this.nationalId)
        this.$session.set('mobile', this.mobile)
        this.$router.push('verification')
      }
      // register: function() {
      //   this.$validator.validateAll().then(result => {
      //     if (result) {
      //       let userInfo = {
      //         confirmPassword: "123",
      //         email: "azade_khalili@yahoo.com",
      //         password: "123"
      //       };
      //       generalService
      //         .postMethod("auth/register", userInfo)
      //         .then(response => {
      //           if (response.status === 0 && response.message === "OK") {
      //             sharedService.requestDone("ثبت نام با موفقیت انجام شد");
      //           }
      //         })
      //         .catch(error => {
      //           sharedService.requestFailed(error.response.data.message);
      //         });
      //     } else {
      //       //todo
      //     }
      //   })
      // }
    }
  };
</script>
<style scoped>
</style>
