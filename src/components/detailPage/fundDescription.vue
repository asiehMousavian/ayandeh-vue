<template>
  <div>
    <div>
      <!-- {{tabIndex}} -->
      <b-tabs v-model= "tabIndex">
        <b-tab title="توضیحات صندوق" title-item-class="desctab" active>
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
        </b-tab>
        <b-tab title="شرایط احراز هویت" title-item-class="desctab">
          <div class="desc">
            <h3>لورم ایپسوم</h3>
            <p>صندوق تجربه ایرانیان بزرگترین صندوق مختلط بازار سرمایه می ­باشد و بر اساس حدنصاب­ های مندرج در امیدنامه، وجوه خود را هم
              در سهام و حق تقدم آن و هم در اوراق مشارکت و سپرده بانکی سرمایه­ گذاری می­نماید.</p>

          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: ['desTabIndex'],
  name: 'fundDescription',
  data(){
    return{
      tabIndex:0
    }
  }
  ,mounted()
  {
    this.tabIndex=this.desTabIndex
  }
}
</script>

<style scoped>

</style>
