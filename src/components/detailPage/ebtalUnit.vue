<template>
  <div>
    <h3 class="modal_title">ابطال سهم</h3>
    <div class="modal_txt">
      <p>
        عملیات صدور براساس <span>NAV</span> تخمینی برای <span>۲ روز کاری</span> بعد انجام می‌پذیرد و مابه التفاوت به مشخص شده توسط شما در صندوق برگردانده
        خواهد شد
      </p>
    </div>
    <div class="modal_desc">
      <p>
        کد ملی
        <span>{{nationalId}}</span>
        <span>-{{licenseNumber}}-</span> واحد دارد.
      </p>
    </div>
    <form>
      <div class="f_body d-flex">
        <div class="form-group">
          <div class="inp_border">
            <input type="text" class="form-control" v-model="unitCount" name="count" v-validate="'required|decimal'"  v-on:keyup="checkInput()"/>
            <i class="placeholder">تعداد واحد ها</i>
            <i class="line"></i>
          </div>
        <div class="form-alert">
            <p v-show="errors.has('count')">{{ errors.first('count') }}</p>
            <p
              v-show="responseError">{{errorMsg}}</p>
          </div>
        </div>
      </div>
      <br />
      <div class="modal_desc">
        <div class="f_text" v-show="showDescription">
          <p>
            شما در حال ابطال
            <i>{{unitCount}}</i> واحد سرمایه‌گذاری به ارزش
            <i>{{price?price:0|persianCurrency}} ریال</i> می باشید
          </p>
        </div>
      </div>
      <br>
      <div slot="modal-footer">
        <button class="btn" :disabled='errors.any() || !isComplete' @click.prevent="ebtalUnits" >ابطال واحد
        </button>
        <button class="btn btn-cancel" @click.prevent="close">لغو</button>
      </div>
    </form>
  </div>


</template>
<script>
import service from "@/services/generalService"
import sharedService from "@/services/sharedService"

export default {
  name: "issueUnit",
  data() {
    return {
      nationalId: "",
      licenseNumber: 0,
      unitCount:'',
      fund: {},
      fundId: 0,
      userLicense: {},
      unitValue:0,
      fundId:0,
      revokeFund:{},
      errorMsg:'',
      price:0,
      showDescription:false,
      responseError:false
    }
  },
  computed: {
    isComplete () {
      return this.unitCount && 1
    }
  },
  methods: {
    checkInput(){
      sharedService.checkInputs()
      this.price = this.fund.saleNav * this.unitCount
      this.showDescription=true

    },
     close() {
      this.$emit("exit", true)
    },
    ebtalUnits()
    {
        this.revokeFund = {
        fundId:    this.fundId,
        licenseNumber: this.licenseNumber,
        fundUnit: this.unitCount
      }
        service.postMethod(`invest/fund/revoke`, this.revokeFund)
        .then(response => {
          //todo
          debugger
        })
        .catch(error => {
          debugger
            this.responseError=true
          if (error.response.data.status === 500501) {
            this.errorMsg = 'خطا در ارتباط با صندوق لطفا مجددا بعدا تلاش نمایید'
          } else {
            this.errorMsg = 'خطا در برقراری ارتباط با سرور لطفا با پشتیبانی تماس بگیرید'
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
      // this.unitValue = this.fund.purchaseNav + 20000
      this.fundId = this.fund.code

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
