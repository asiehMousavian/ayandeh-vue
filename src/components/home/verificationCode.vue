<template>
  <div id="verificationPage">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
              <div class="box">
                <!-- <div class=""> -->
                  <div v-if="verifyCode" class="verificationForm">
                    <div class="box_title">
                        <p>ورود کد احراز هویت</p>
                    </div>
                      <div class="box_text">
                        <div class="text">
                          <p>
                            کد احراز هویت شما که به شماره موبایل <span>{{mobile}}</span>
                            تا <span>{{timer}}</span> دقیقه دیگر ارسال خواهد شد را وارد کنید
                          </p>
                          <p v-show="hasAccount">
                            <span>توجه</span>: شماره موبایل شما از اطلاعات حساب بانک آینده به صورت
                            اتوماتیک خوانده شده است
                          </p>
                        </div>
                      </div>
                      <form>
                        <div class="form-group">
                          <div class="inp_border">
                            <input
                              type="text"
                              v-model="verificationCode"
                              name="verificationCode"
                              class="form-control"
                              v-validate="'required'"
                            />
                            <div class="form-alert">
                              <p>{{ errors.first('verificationCode') }}</p>
                            </div>
                            <i class="placeholder">ورود کد</i>
                            <i class="line"></i>
                          </div>
                        </div>
                        <div class="d-flex box_c">
                          <button type="button" class="btn mx-auto" @click.prevent="registerCode">ثبت کد</button>
                        </div>
                      </form>
                  </div>
                  <div v-else class="verificationForm">
                    <div class="box_title">
                        <p>ورود کد احراز هویت</p>
                    </div>
                      <div class="box_text">
                        <div class="text">
                          <p>
                            رمز عبور دلخواه خود را ثبت کنید
                          </p>
                          <p>
                            <span>توجه</span>: لطفا از انتخاب رمز عبور‌های ساده مانند کد ملی و یا شماره 
موبایل پرهیز کنید
                          </p>
                        </div>
                      </div>
                      <form>
                        <div class="form-group">
                          <div class="inp_border">
                            <input
                              type="password" v-model="password" name="password" class="form-control" v-validate="'required'" ref="password"/>
                            <div class="form-alert">
                              <p>{{ errors.first('password')}}</p>
                            </div>
                            <i class="placeholder">ورود رمز عبور</i>
                            <i class="line"></i>
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="inp_border">
                            <input
                              type="password" v-model="confirmpassword" name="confirmpassword" class="form-control" v-validate="'required|confirmed:password'" />
                            <div class="form-alert">
                              <p>{{ errors.first('confirmpassword') }}</p>
                            </div>
                            <i class="placeholder">تکرار رمز عبور</i>
                            <i class="line"></i>
                          </div>
                        </div>
                        <div class="d-flex box_c">
                          <button
                            :disabled="errors.any() || !isComplete"
                            type="button"
                            class="btn mx-auto"
                            @click.prevent="registerPass"
                          > ورود به پیشخوان</button>
                        </div>
                      </form>
                  </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main -->
    <!-- Mobile Menu -->
    <toggleMenu></toggleMenu>
    <!-- Mobile Menu -->
  </div>
</template>
<script>
import generalService from "@/services/generalService"
import sharedService from "@/services/sharedService"
import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
export default {
  name: "verificationCode",
  data() {
    return {
      hasAccount: true,
      verificationCode: "",
      mobile:'',
      timer:'',
      verifyCode:true,
      password:'',
     confirmpassword:''
    }
  },
  components:{PageHeader,toggleMenu},
  mounted() {
    this.mobile=this.$session.get('mobile')
    this.sendSms()
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
    
  },
  beforeUpdate() {
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  },
  computed: {
    isComplete() {
       return this.password && this.confirmpassword
    }
  },
  methods: {
      sendSms(){
        let smsObj={
            //phoneNumber: this.mobile
        }
        generalService.postMethod("auth/smsCode",smsObj).then(response=>{
            if(response.status == 0 && response.message=="OK")
            {
            debugger
            }
        }).catch(error=>{})
      },
      registerCode()
      {
          //todo
          //check code
        this.verifyCode=false
      },
      registerPass()
      {
          //todo
      }
  }
};
</script>

<style scoped>
</style>
