<template>
  <div class="all">
      <h3 class="modal_title">صدور سهم</h3>
      <div class="modal_txt">
        <p>عملیات صدور براساس NAV تخمینی برای ۲ روز کاری بعد انجام می‌پذیرد و مابه التفاوت به مشخص شده توسط شما در صندوق برگردانده
          خواهد شد</p>
      </div>
      <div class="modal_desc">
        <p>کد ملی 0024323653 21 واحد دارد.</p>
      </div>
      <form>
        <div class="f_body d-flex">
          <form-input v-bind:labelTitle="unitNumb"></form-input>
          <a href="#" class="exchange">
            <img src="@/assets/img/exchange.svg" alt="">
          </a>
          <form-input v-bind:labelTitle="seeValue"></form-input>
        </div>
        <div class="modal_desc">
          <p>
            شما در حال صدور ۱۵۳ واحد سرمایه‌گذاری
            <br/>
            به ارزش ۱۳،۰۰۰،۰۰۰ ریال می‌باشید
          </p>
        </div>
      </form>
    </div>
</template>

<script>
import FormInput from '../share/FormInput'
export default {
  name: 'issueUnit',
  data () {
    return {
      unitNumb: 'ورود تعداد واحد',
      seeValue: 'مشاهده ارزش به ریال'
    }
  },
  components: {
    FormInput
  }
}
</script>

<style scoped>
  .form-group{
    width: 41.5%;
  }
</style>
