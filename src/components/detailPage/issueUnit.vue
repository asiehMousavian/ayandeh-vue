<template>
  <div>
    <h3 class="modal_title">صدور سهم</h3>
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
            <input
              type="text"
              class="form-control"
              v-model="price"
              name="price"
              v-validate="'required|decimal'"
              v-on:keyup="calculatePrice()"
            />
            <!-- @blur="isValidPrice()" -->
            <i class="placeholder">ارزش مبلغ (ریال)</i>
            <i class="line"></i>
          </div>
          <div class="form-alert">
            <p v-show="errors.has('price')">{{ errors.first('price') }}</p>
            <p
              v-show="priceErr"
            >مبلغ ورودی حداقل باید {{fund.purchaseNav |persianCurrency }} ریال باشد.</p>
          </div>
        </div>
      </div>
      <br />
      <div class="modal_desc">
        <div class="f_text">
          <p>
            شما در حال صدور
            <i>{{unitCount}}</i> واحد سرمایه‌گذاری به ارزش
            <i>{{price?price:0|persianCurrency}} ریال</i> می باشید
          </p>
        </div>
      </div>
      <div slot="modal-footer">
        <!-- <button :class="['btn', 'sodur_btn',enableSodoor?'':'btn-is-disabled']"
          @click.prevent="showSodoor">صدور واحد
        </button> -->
         <button class="btn" :disabled='errors.any() || !enableSodoor' @click.prevent="showSodoor">صدور واحد </button>
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
      enableSodoor: false,
      nationalId: "",
      licenseNumber: 0,
      unitValue: 0,
      price: null,
      unitCount: 0,
      priceErr: false,
      fund: {},
      fundId: 0,
      userLicense: {},
    };
  },
  methods: {
    showSodoor() {
      let baseUrl = window.location.origin
      let purchaseObj={
          detail: 'string',
          price: this.price,
          unitCount:this.unitCount,
          redirectUrl: `${baseUrl}/redirect`
      }
      this.$session.set("purchaseObj",JSON.stringify(purchaseObj))
      this.$emit("purchase", true)
    },
    close() {
      this.$emit("exit", true)
    },
    calculatePrice() {
      sharedService.checkInputs()
      let p = parseInt(this.price)
      let n = parseInt(this.fund.purchaseNav)
      if (p >= n) {
        this.unitCount = Math.floor(this.price / this.unitValue)
        this.priceErr = false
        this.enableSodoor = true
      } else {
        this.unitCount = 0
        this.priceErr = true
        this.enableSodoor = false
      }
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
      this.unitValue = this.fund.purchaseNav + 20000
      this.fundId = this.fund.code
    }
    // isValidPrice() {
    //   let p = parseInt(this.price)
    //   let n = parseInt(this.fund.purchaseNav)
    //   this.priceErr = p < n
    // },
    //getFundDetail() {
      // service
      //   .getMethod(`invest/fund/${this.fundId}`)
      //   .then(response => {
      //     this.fund = response.content
      //     this.unitValue = this.fund.purchaseNav
      //     localStorage.setItem("unitValue", this.unitValue)
      //     localStorage.setItem("fundId", this.fundId)
      //     localStorage.setItem("currentFund", JSON.stringify(this.fund))
      //   })
      //   .catch(error => {
      //     //todo
      //   });
    //}
  },
  mounted() {
    this.getClientInfo()
    this.getFundInfo()
    this.getLicense()

  },
  filters: {
    persianCurrency: function(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1/")
    }
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
