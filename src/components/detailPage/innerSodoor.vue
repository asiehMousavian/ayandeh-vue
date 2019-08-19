<template>
  <div>
    <form action="">
    <h3 class="modal_title">پیش فاکتور صدور</h3>
    <div class="modal_txt">
      <p>عملیات صدور براساس NAV تخمینی برای ۲ روز کاری بعد انجام می‌پذیرد و مابه التفاوت به مشخص شده توسط شما در صندوق برگردانده
        خواهد شد</p>
    </div>
    <div class="modal_desc">
        <p>
            شما در حال صدور
            <i>{{purchaseObj.unitCount}}</i> واحد سرمایه‌گذاری به ارزش
            <i>{{purchaseObj.price}} ریال</i> می باشید
        </p>
    </div>
    <div class="confirm_text">
      <p>
        با زدن دکمه اتصال به درگاه قبول میکنم که <a href="javascripts:void(0)" class="link1"> توضیحات صندوق</a>
        و <a href="javascripts:void(0)" class="link2">شرایط احراز هویت</a> را مطالعه کرده ام
      </p>
    </div>
    <br>
    <div clas="form-alert">
      <span style="color:#cb0d0d" class="format_inp">{{errMsg}}</span>
    </div>
    <br><br>
    <div slot="modal-footer">
          <a @click="connectToBank" class="btn">اتصال به درگاه بانک</a>
          <b-button class="btn btn-cancel" @click="close">انصراف</b-button>
        </div>
    </form>
  </div>
</template>

<script>
import service from '@/services/generalService'
export default {
  name: 'innerSodoor',
  data () {
    return {
      purchaseObj:{},
      errMsg:null
  }
  },
  mounted(){
    this.errMsg=null
    this.purchaseObj=JSON.parse(this.$session.get("purchaseObj"))
  },
  methods:{
      close() {
      this.$emit("exit", true)
    },
        connectToBank () {
      // let baseUrl = window.location.origin // + '/#/'
      // let paymentObj = {
      //   detail: 'string',
      //   price: 100000,
      //   redirectUrl: baseUrl + '/redirect' // `${baseUrl}/redirect`
      // }
      service.postMethod('payment',this.purchaseObj)
        .then(response => {
          debugger
          if (response.message === 'OK' && response.status === 0) {
            window.location.href = response.content.redirectUrl
          }
        })
        .catch(error => {
          this.errMsg=error.response.data.message
          //todo
        })
    }
  }
}
</script>
<style scoped>
</style>
