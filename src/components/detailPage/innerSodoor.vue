<template>
  <div>
    <form action="">
      <h3 class="modal_title">پیش فاکتور صدور</h3>
      <div class="modal_txt userAlert">
       <p>
        عملیات صدور براساس <span>NAV</span> تخمینی برای <span>۲ روز کاری</span> بعد انجام می‌پذیرد و مابه التفاوت به مشخص شده توسط شما در صندوق برگردانده
        خواهد شد
      </p>
      </div>
      <div class="modal_desc">
        <p>
          شما در حال صدور
          <i>{{purchaseObj.unitCount}}</i> واحد سرمایه‌گذاری به ارزش
          <i>{{purchaseObj.price}} ریال</i> می باشید
        </p>
      </div>

      <div class="paymentContainer">
        <div>
          <p>
            نوع پرداخت از طریق :
          </p>
        </div>
        <div class="d-flex">
        <div class="radioOprion" @click="selectOption('ayande')">
          <span v-bind:class= "['circle', {'fillCircle' : isSelected}]"></span>
          <p>پیشخوان مجازی بانک آینده</p>
        </div>
        <div class="radioOprion" @click="selectOption('gate')">
          <span v-bind:class= "['circle', {'fillCircle' : !isSelected}]"><span></span></span>
          <p>درگاه پرداخت</p>
        </div>
        </div>
        </div>

      <div class="confirm_text">
        <p>
          با زدن دکمه اتصال به درگاه قبول میکنم که <a href="javascripts:void(0)" @click="showInnerModal(0)" class="link1"> توضیحات صندوق</a>
          و <a href="javascripts:void(0)" @click="showInnerModal(1)" class="link2">شرایط احراز هویت</a> را مطالعه کرده ام
        </p>
      </div>
      <br>
      <div clas="form-alert">
        <span style="color:#cb0d0d" class="format_inp">{{errMsg}}</span>
      </div>
      <br><br>
      <div slot="modal-footer">
        <button @click="connectToBank" class="btn">اتصال به درگاه بانک</button>
        <button class="btn btn-cancel" @click.prevent="close">انصراف</button>
      </div>
      <div class="modal_extra">
        <span class="modal_extra_close" >
            <img src="@/assets/img/close.png" alt="" @click="closeInnerModal">
        </span>

        <div class="box_tab">
          <b-tabs content-class="mt-3"  v-model="tabIndex">
            <b-tab title="توضیحات صندوق" active>
              <div class="desc_scroll">
                <div class="desc">
                  <h3>لورم ایپسوم</h3>
                  <p>صندوق تجربه ایرانیان بزرگترین صندوق مختلط بازار سرمایه می ­باشد و بر اساس حدنصاب­ های مندرج در امیدنامه، وجوه خود را هم در سهام و حق تقدم آن و هم در اوراق مشارکت و سپرده بانکی سرمایه­ گذاری می­نماید.</p>
                  <h3>لورم ایپسوم</h3>
                  <p>صندوق تجربه ایرانیان بزرگترین صندوق مختلط بازار سرمایه می ­باشد و بر اساس حدنصاب­ های مندرج در امیدنامه، وجوه خود را هم در سهام و حق تقدم آن و هم در اوراق مشارکت و سپرده بانکی سرمایه­ گذاری می­نماید. با توجه به ماهیت مختلط این صندوق، گزینه بسیار مناسبی برای افرادی است که تمایل دارند علاوه بر اطمینان خاطر از سرمایه­ گذاری در بازار اوراق بهادار با درآمد ثابت، از نوسانات بازار سرمایه نیز بهره ببرند. صندوق تجربه ایرانیان پرداخت سود ماهانه نداشته و سود سرمایه ­گذاران از مابه ­التفاوت قیمت خریداری شده واحدها و قیمت روز آنها ناشی می ­شود.
                  </p>
                  <h3>لورم ایپسوم</h3>
                  <p>صندوق تجربه ایرانیان بزرگترین صندوق مختلط بازار سرمایه می ­باشد و بر اساس حدنصاب­ های مندرج در امیدنامه، وجوه خود را هم در سهام و حق تقدم آن و هم در اوراق مشارکت و سپرده بانکی سرمایه­ گذاری می­نماید.
                  </p>
                </div>
              </div>
            </b-tab>
            <b-tab title="شرایط احراز هویت">
              <div class="desc">
                <h3>لورم ایپسوم</h3>
                <p>صندوق تجربه ایرانیان بزرگترین صندوق مختلط بازار سرمایه می ­باشد و بر اساس حدنصاب­ های مندرج در امیدنامه، وجوه خود را هم
                  در سهام و حق تقدم آن و هم در اوراق مشارکت و سپرده بانکی سرمایه­ گذاری می­نماید.</p>

              </div>
            </b-tab>
          </b-tabs>
        </div>

      </div>

    </form>
  </div>
</template>
<script>
import service from '@/services/generalService'
import sharedService from '@/services/sharedService'
export default {
  name: 'innerSodoor',
  data () {
    return {
      purchaseObj: {},
      errMsg: null,
      tabIndex: 0,
      isSelected:true,
      paymentOption:'ayande'
    }
  },
  mounted () {
    this.errMsg = null
    this.purchaseObj = JSON.parse(this.$session.get('purchaseObj'))
  },
  methods: {
    selectOption(option)
    {
      if(option != this.paymentOption){
      this.isSelected= !this.isSelected
      this.paymentOption=option
      }
    },
    closeInnerModal () {
      sharedService.closeModal()
    },
    showInnerModal (tab) {
      this.tabIndex = tab
      sharedService.showModal()
    },
    close () {
      this.$emit('exit', true)
    },
    connectToBank () {
      // let paymentObj = {
      //   detail: 'string',
      //   price: 100000,
      //   redirectUrl: baseUrl + '/redirect' // `${baseUrl}/redirect`
     // }
      debugger

      //todo base on payment option
      service.postMethod('payment', this.purchaseObj)
        .then(response => {
          debugger
          if (response.message === 'OK' && response.status === 0) {
            window.location.href = response.content.redirectUrl
          }
        })
        .catch(error => {
          debugger
          this.errMsg = error.response.data.message
          // todo
        })
    }
  }
}
</script>
<style scoped>
.modal_txt p span
{
  font-family:"Iransans_Bold"
}
</style>
