<template>
  <div class="all">
    <h3 class="modal_title">پیش فاکتور صدور</h3>
    <div class="modal_txt">
      <p>عملیات صدور براساس NAV تخمینی برای ۲ روز کاری بعد انجام می‌پذیرد و مابه التفاوت به مشخص شده توسط شما در صندوق برگردانده
        خواهد شد</p>
    </div>
    <div class="modal_desc">
      <p>شما در حال صدور ۱۵۳ واحد سرمایه‌گذاری</p>
      <p>به ارزش ۱۳،۰۰۰،۰۰۰ ریال می‌باشید</p>
    </div>
    <div class="modal_dropdown">
      <div class="d-flex modal_dropdown_body">
        <div class="ml-auto">
          <div class="form-group">
            <label>نوع پرداخت</label>
            <div class="no_search">
<!--              <select class="form-control">-->
<!--                <option>واریز درگاه</option>-->
<!--                <option>واریز درگاه</option>-->
<!--                <option>واریز درگاه</option>-->
<!--                <option>واریز درگاه</option>-->
<!--              </select>-->
              <vue-select class="vue-select1" name="select1" :options="options1" :model.sync="result1">
              </vue-select>

            </div>
          </div>
        </div>
        <div class="mr-auto">
          <div class="form-group">
            <label>نوع درگاه</label>
            <div class="no_search">
              <select class="form-control">
                <option>ایران کیش</option>
                <option>ایران کیش</option>
                <option>ایران کیش</option>
                <option>ایران کیش</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm_text">
      <p>
        با زدن دکمه اتصال به درگاه قبول میکنم که <a href="javascripts:void(0)" class="link1"> توضیحات صندوق</a>
        و <a href="javascripts:void(0)" class="link2">شرایط احراز هویت</a> را مطالعه کرده ام
      </p>
    </div>
  </div>

</template>

<script>
import FormInput from '../share/FormInput'
export default {
  name: 'innerSodoor',
  data () {
    return {

    }
  },
  components: {
    FormInput
  }
}
</script>

<style scoped>

</style>
