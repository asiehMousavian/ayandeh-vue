<template>

  <div class="detail_list">
    <ul class="list-unstyled">
      <li>
        <div class="detail_list__p">
          <div class="detail_list__p--d">
            <div class="detail_list__p--sec">
              ارزش کل دارایی‌های :<i>۳۴۰،۰۰۰،۰۰۰ ریال</i>
            </div>
            <div class="divider"></div>
            <div class="detail_list__p--sec">
              تعداد واحد سرمایه‌گذاری شده :<i>132 واحد</i>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="detail_list__p">
          <h3>بازدهی بر‌اساس دوره</h3>
          <div class="detail_list__p--d">
            <div class="detail_list__p--sec">
              <p>۱ ماه</p>
              <p>%{{fund.simpleMonthly}}</p>
            </div>
            <div class="divider"></div>
            <div class="detail_list__p--sec">
              <p>3 ماه</p>
              <p>%{{fund.simpleMonthly3}}</p>
            </div>
            <div class="divider"></div>
            <div class="detail_list__p--sec">
              <p>6 ماه</p>
              <p>%{{fund.simpleYearly}}</p>
            </div>
          </div>
        </div>

        <div class="detail_list__p">
          <h3>مبالغ ابطال و صدور</h3>
          <div class="detail_list__p--d">
            <div class="detail_list__p--sec">
              <i>مبلغ ابطال</i>
              <i>{{fund.saleNav  | persianCurrency}} ریال</i>
            </div>
            <div class="divider"></div>
            <div class="detail_list__p--sec">
              <i>مبلغ صدور</i>
              <i>{{fund.purchaseNav | persianCurrency}} ریال</i>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="detail_list__p">
          <h3>توضیحات صندوق</h3>
          <div class="text">
            <p>صندوق تجربه ایرانیان بزرگترین صندوق مختلط بازار سرمایه می ­باشد و بر اساس حدنصاب­ های مندرج در امیدنامه، وجوه خود را هم در سهام و حق تقدم آن و هم در اوراق مشارکت و سپرده بانکی سرمایه­ گذاری می­نماید. با توجه به ماهیت مختلط این صندوق، گزینه بسیار مناسبی برای افرادی است که تمایل دارند علاوه بر اطمینان خاطر از سرمایه­ گذاری در بازار اوراق بهادار با درآمد ثابت، از نوسانات بازار سرمایه نیز بهره ببرند. صندوق تجربه ایرانیان پرداخت سود ماهانه نداشته و سود سرمایه ­گذاران از مابه ­التفاوت قیمت خریداری شده واحدها و قیمت روز آنها ناشی می ­شود.</p>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>

export default {
  name: 'requestReport',
  props: ['fund'],
  filters: {
    persianCurrency: function (value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1/')
    }
  }
}
</script>
<style scoped>

</style>
