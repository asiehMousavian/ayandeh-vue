<template>
  <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xm-12 col-12">
    <div class="box">
      <div class="clearfix">
        <div class="box-img">
          <img v-bind:src= "boxImage" alt="">
        </div>
        <div class="box-body">
          <div class="box-header">
            <h1 class="heading">{{boxTitle}}</h1>
            <p class="body-p">
              {{boxText}}
            </p>
            <div class="d-flex justify-content-end">
              <button class="btn">مشاهده صندوق</button>
            </div>
          </div>
          <div class="d-flex justify-content-between box-footer">
            <div class="box-footer-item"><span>تعداد واحدها</span><span>{{unitNumber}} واحد</span></div>
            <div class="box-footer-item"><span>واحد صندوق شما</span><span>{{fundNumber}} واحد</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['boxImage', 'boxTitle', 'boxText', 'unitNumber', 'fundNumber'],
  name: 'boxComponent'
}
</script>

<style scoped>
  .box{
    margin-bottom: 20px;
    min-height: 252px;
  }
</style>
