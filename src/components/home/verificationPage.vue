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
                          <br><br>
                          <p style="color: #575757;font-family:'Iransans_Bold'">ورود کد :</p>
                        </div>
                      </div>
                      <form>
                        <div class="form-group">
                          <div class="inp_border">
                            <div class="verificationCode">
                                  <input type="text" v-model= "dig_one" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-validate="'required|numeric'"/>
                                  <input type="text" v-model= "dig_two" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-validate="'required|numeric'"/>
                                  <input type="text" v-model= "dig_three" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-validate="'required|numeric'"/>
                                  <input type="text" v-model= "dig_four" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-validate="'required|numeric'"/>
                            </div>
                            <!-- <input
                              type="text"
                              v-model="verificationCode"
                              name="verificationCode"
                              class="form-control"
                              v-validate="'required'"
                            /> -->
                            <div class="form-alert" style="text-align:center">
                              <br>
                              <p>{{responseRresult}}</p>
                            </div>
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
                      <br>
                  </div>
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
      responseRresult:'',
      dig_one:'',
      dig_two:'',
      dig_three:'',
      dig_four:'',
      leavePage:false

    }
  },
  components:{PageHeader,toggleMenu,VueLoadingButton},
  mounted() {
     sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
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
  },
beforeRouteLeave (to, from, next) {
  if(to.fullPath=="/detailList")
  {
    next()
  }
  if(this.leavePage==true)
  {
    next()
  }
},
  beforeUpdate() {
   sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  },
  computed: {
    isComplete() {
      // return this.verificationCode
      return  this.$validator.validateAll()
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
        debugger
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
              this.responseRresult = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
              if(error.response != null){
                if (error.response.data.status === 500501) {
                this.responseRresult = 'خطا در ارتباط با صندوق لطفا مجددا بعدا تلاش نمایید'
                }else {
                this.responseRresult = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
                }
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
            this.responseRresult = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
            if(error.response != null){
              if (error.response.data.status === 500501) {
              this.responseRresult = 'خطا در ارتباط با صندوق لطفا مجددا بعدا تلاش نمایید'
              }else {
              this.responseRresult = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
              }
            }
          })
        }
      },
      registerCode()
      {
        this.isLoading= true
        // this.verificationCode= this.dig_four+ this.dig_three+ this.dig_two+ this.dig_one
        this.verificationCode= this.dig_one+ this.dig_two+ this.dig_three+ this.dig_four
        //  this.verificationCode= this.$refs.dig_one.value + this.$refs.dig_two.value +this.$refs.dig_three.value+this.$refs.dig_four.value
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
          this.isLoading= false
          this.responseRresult="کد وارد شده معتبر نیست" //error.response.data.message
          this.stopTimer()
          this.reSend=true
          this.leavePage=false
        })
      },
      reSendCode(){
        this.resetTimer()
        this.responseRresult= ''
        this.reSend= false
        this.setTimer()
        this.sendSms()
      },
      stopTimer()
      {
        this.minutes =0
        this.seconds =0
        this.dig_one= ''
        this.dig_two =''
        this.dig_three =''
        this.dig_four =''
      },
      resetTimer()
      {
        this.minutes=4
        this.seconds=59
      }
  }
};
</script>
<style scoped>

</style>
