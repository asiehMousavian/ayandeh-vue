<template>
  <div v-if="!confirm">
    <h3 class="modal_title">ابطال سهم</h3>
    <div class="modal_txt userAlert">
      <p>
        عملیات صدور براساس <span>NAV</span> تخمینی برای <span>۲ روز کاری</span> بعد انجام می‌پذیرد و مابه التفاوت به مشخص شده توسط شما در صندوق برگردانده
        خواهد شد
      </p>
    </div>
    <div class="modal_desc">
      <!-- <p>
        کد ملی
        <span>{{nationalId}}</span>
        <span>-{{licenseNumber}}-</span> واحد دارد.
      </p> -->
      <p>قیمت هر واحد در تاریخ {{new Date() | moment("jYYYY/jMM/jDD")}} ، {{unitValue}} ریال می باشد.</p>
    </div>
    <form >
      <div class="f_body d-flex justify-content-center ebtal_form">
        <div class="form-group f_form">
          <div class="inp_border">
            <input type="text" class="form-control" v-model="unitCount" name="count" v-validate="'required|decimal'"  v-on:keyup="checkInput()"/>
            <i class="placeholder">تعداد واحد ها</i>
            <i class="line"></i>
          </div>
          <div class="form-alert">
              <p v-show="errors.has('count')">{{ errors.first('count') }}</p>
          </div>
        </div>
      </div>
      <div class="modal_desc">
        <div class="f_text" >
          <p v-show="!(errors.any() || !isComplete)">
            شما در حال ابطال
            <i>{{unitCount}}</i> واحد سرمایه‌گذاری به ارزش
            <i>{{price?price:0|persianCurrency}} ریال</i> می باشید
          </p>
            <!-- <p v-if="success">در خواست شما با موفقیت ثبت شد</p>
            <p v-else>{{errorMsg}}</p> -->
        </div>
      </div>
      <br>
      <div slot="modal-footer">
        <button class="btn" :disabled='errors.any() || !isComplete' @click.prevent="confirmRevoke" >ابطال واحد</button>
        <!-- <VueLoadingButton class="btn" :disabled='errors.any() || !isComplete' type="button" @click.native="confirmRevoke" :loading="isLoading">ابطال واحد</VueLoadingButton> -->
        <button class="btn btn-cancel" @click.prevent="close">لغو</button>
      </div>
    </form>
  </div>
  <div v-else>
   <form >
        <div class="modal_desc">
        <div class="f_text">
          <p>از ابطال سهم اطمینان دارید؟</p>
          <br>
          <p>
            بعد از ابطال شما <i>{{unitCount}}</i> واحد از سهم خود را از مالکیت خارج می کنید
          </p>
          <br>
          <p style="color : #0f7d29" v-if="success">در خواست شما با موفقیت ثبت شد</p>
          <p style="color : #e2241b" v-else>{{errorMsg}}</p>
        </div>
       </div>
      <br/>
      <br>
      <div slot="modal-footer">
        <VueLoadingButton v-show="!success" class="btn" :disabled= "isSuccessed" type="button" @click.native= "ebtalUnits" :loading= "isLoading">ابطال واحد</VueLoadingButton>
        <button class="btn btn-cancel" @click.prevent= "check">{{canselBtn}}</button>
      </div>
    </form>
  </div>


</template>
<script>
import service from "@/services/generalService"
import sharedService from "@/services/sharedService"
import VueLoadingButton from 'vue-loading-button'
export default {
  name: "issueUnit",
  data() {
    return {
      nationalId: "",
      licenseNumber: '12',
      unitCount:'',
      fund: {},
      fundId: 0,
      userLicense: {},
      unitValue:0,
      fundId:0,
      revokeFund:{},
      errorMsg:'',
      price:0,
      // responseError:false,
      success:false,
      isLoading:false,
      confirm:false,
      canselBtn:'بررسی مجدد'
    }
  },
  components:{
    VueLoadingButton
  },
  
  computed: {
    isComplete () {
      return this.unitCount && 1
    },
    isSuccessed(){
      return this.success
    }
  },
  methods: {
    check()
    {
      this.confirm= false
      this.canselBtn= 'بررسی مجدد'
      this.success=false
      this.errorMsg= ''
    },
    confirmRevoke(){
      this.confirm=true
    },
    checkInput(){
      this.price = this.fund.saleNav * this.unitCount
    },
     close() {
      this.$emit("exit", true)
    },
    ebtalUnits()
    {
      this.isLoading=true
        this.revokeFund = {
          fundId:this.fundId,
          licenseNumber: this.licenseNumber,
          fundUnit: this.unitCount
        }
        service.postMethod(`invest/fund/revoke/${this.revokeFund}`)
        .then(response => {
          //todo
          this.success= true
          this.isLoading = false
          this.canselBtn='بازگشت'
        })
        .catch(error => {
          this.success= false
          this.isLoading = false
          this.errorMsg = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
          if(error.response!= null){
          //todo
            if (error.response.data.status === 500501) {
              this.errorMsg = 'خطا در ارتباط با صندوق لطفا مجددا بعدا تلاش نمایید'
             }
             // else {
            //   this.errorMsg = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
            //}
            }
        })
    },
    getLicense(){
      this.userLicense= this.$session.get("userLicense")
      if(this.userLicense.licenseNumber != undefined)
      {
        this.licenseNumber=this.userLicense.licenseNumber
      }
    },
    getClientInfo(){
      if (this.$session.has("clientInfo")) {
        let client = this.$session.get("clientInfo")
        if (client) {
          let user = JSON.parse(client)
          this.nationalId = user.nationalId
        }
      }
    },
    getFundInfo(){
      this.fund = JSON.parse(this.$session.get("currentFund"))
      this.fundId = this.fund.code
      this.unitValue=this.fund.saleNav
    }
  },
    filters: {
      persianCurrency: function(value) {
        return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1/")
      }
  },
  mounted() {
    this.getClientInfo()
    this.getFundInfo()
    this.getLicense()
  },
  beforeUpdate(){
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  }
}
</script>

<style scoped>
.form-group {
  width: 41.5%;
  /* width: 100%; */
}
.btn-is-disabled {
  opacity: 0.7;
  pointer-events: none;
}
.modal_txt p span
{
  font-family:"Iransans_Bold"
}
</style>
