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
                  <div class="verificationForm">
                    <div class="box_title">
                        <p>ورود کد احراز هویت</p>
                    </div>
                      <div class="box_text">
                        <div class="text">
                           <p v-show="hasAccount">
                            <span>توجه</span>: شماره موبایل شما از اطلاعات حساب بانک آینده به صورت
                            اتوماتیک خوانده شده است
                          </p>
                          <!-- <p>
                            کد احراز هویت شما که به شماره موبایل <span>{{mobile}}</span>
                            تا <span>{{minutes}}:{{seconds}}</span> دقیقه دیگر ارسال خواهد شد را وارد کنید
                          </p> -->
                          <p>
                            کد احراز هویت شما     
                            تا <span>{{minutes}}:{{seconds}}</span> دقیقه دیگر ارسال خواهد شد را وارد کنید
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
                              <p>{{responseRresult}}</p>
                            </div>
                            <i class="placeholder">ورود کد</i>
                            <i class="line"></i>
                          </div>
                        </div>
                        <div class="d-flex box_c">
                          <!-- <button type="button" class="btn mx-auto" @click.prevent="registerCode">ثبت کد</button> -->
                          <VueLoadingButton type="button" :disabled = 'errors.any() || !isComplete' class="btn mx-auto" @click.native="registerCode" :loading="isLoading">ورود به پیشخوان مجازی </VueLoadingButton>
                        </div>
                        <div class="d-flex" >
                          <a href="" v-show="reSend" @click.prevent="reSendCode" class="reSend_Code mx-auto" >ارسال مجدد کد</a>
                        </div>
                      </form>
                  </div>
                  <!-- <div v-else class="verificationForm">
                    <div class="box_title">
                        <p>ثبت رمز عبور</p>
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
                  </div> -->
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
import VueLoadingButton from 'vue-loading-button'

export default {
  name: "verificationPage",
  data() {
    return {
      hasAccount: false,
      verificationCode: '',
      mobile:'',
      nationalId:'',
      // verifyCode:true,
      //password:'',
      //confirmpassword:'',
      minutes:'',
      seconds:'',
      isLoading: false,
      reSend:false,
      responseRresult:''
    }
  },
  components:{PageHeader,toggleMenu,VueLoadingButton},
  mounted() {
    this.hasAccount=false
    this.mobile=this.$session.get('mobile')
    this.nationalId=this.$session.get('nationalId')
    if(this.nationalId)
    {
      this.hasAccount=true
    }
    //todo
    this.resetTimer()
    this.setTimer()
    this.sendSms()
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  },
  beforeUpdate() {
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
    // this.responseRresult=''
  },
  computed: {
    isComplete() {
       return this.verificationCode
    }
  },
  methods: {
      setTimer(){
        setInterval(() => 
        {
          if(this.seconds>0){
            this.seconds--
              if(this.seconds==0 && this.minutes>0)
              {
                this.seconds=59
                this.minutes--
              }
              else if(this.minutes==0 && this.seconds==0)
              {
                this.reSend=true
                return
              }
            }
          }, 1000)
        },
      sendSms(){
        let smsObj={}
        if(this.nationalId != '' && this.nationalId != undefined)
        {
          smsObj={ nationalId : this.nationalId }
          generalService.postMethod("auth/smsCode/nationalId",smsObj).then(response=>{
            if(response.status == 0 && response.message=="OK")
            {
              //todo
            }
          }).catch(error=>{
            debugger
            if (error.response.data.status === 500501) {
            this.responseRresult = 'خطا در ارتباط با صندوق لطفا مجددا بعدا تلاش نمایید'
            }else {
            this.responseRresult = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
            }
          })
        }
        else
        {
          smsObj={
            phoneNumber: this.mobile
          }
          generalService.postMethod("auth/smsCode",smsObj).then(response=>{
            if(response.status == 0 && response.message=="OK")
            {
              //todo
            }
          }).catch(error=>{
            debugger
            if (error.response.data.status === 500501) {
            this.responseRresult = 'خطا در ارتباط با صندوق لطفا مجددا بعدا تلاش نمایید'
            }else {
            this.responseRresult = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
            }
          })
        }
      },
      registerCode()
      {
        this.isLoading = true
        let smsObj={
          phoneNumber: this.mobile,
          code : this.verificationCode
        }
        generalService.postMethod("auth/signin",smsObj).then(response=>{
            if(response.status == 0 && response.message=="OK")
            {
              if (response.content.user.isActive) {
              this.$session.start()
              this.$session.set('isLogged', true)
              this.$session.set('clientInfo', JSON.stringify(response.content.user))
              this.$router.push('detailList')
              }
              if(response.commands.length>0)
              {
                response.commands.forEach((value, index)  => {
                  if(value.type=="set_session")
                  {
                    localStorage.setItem('session', value.session)
                    generalService.setSession()
                  }
                });
              }
            }
        }).catch(error=>{
          debugger
          this.isLoading= false
          this.responseRresult="کد وارد شده معتبر نیست" //error.response.data.message
          this.stopTimer()
          this.reSend=true

        })
      },
      reSendCode(){
       this.resetTimer()
        this.responseRresult=''
        this.reSend=false
        this.setTimer()
        this.sendSms()
      },
      stopTimer()
      {
        this.minutes=0
        this.seconds=0
      },
      resetTimer()
      {
        this.minutes=0
        this.seconds=59
      }
  }
};
</script>
<style scoped>

</style>
