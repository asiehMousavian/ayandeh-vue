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
      minutes:4,
      seconds:59
    }
  },
  components:{PageHeader,toggleMenu},
  mounted() {
    this.hasAccount=false
    this.mobile=this.$session.get('mobile')
    this.nationalId=this.$session.get('nationalId')
    if(this.nationalId)
    {
      this.hasAccount=true
    }

    //todo
    //check session to see has account or not
    //this.hasAccount=true
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
  },
  computed: {
    // isComplete() {
    //    return this.password && this.confirmpassword
    // }
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
                return
              }
            }
          }, 1000)
        },
      sendSms(){
        let smsObj={}
        debugger
        if(this.nationalId != '' && this.nationalId != undefined)
        {
          smsObj={
            nationalId : this.nationalId
            }
        }
        else
        {
          smsObj={
            phoneNumber: this.mobile
          }
        }
        generalService.postMethod("auth/smsCode",smsObj).then(response=>{
            if(response.status == 0 && response.message=="OK")
            {
              //todo
            }
        }).catch(error=>{
          debugger
        })
      },
      registerCode()
      {
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
            }
        }).catch(error=>{
          debugger
        })
      },
      registerPass(){}
  }
};
</script>
<style scoped>
</style>
