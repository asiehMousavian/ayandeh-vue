<template>
  <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xm-12 col-12">
    <div class="box">
      <div class="clearfix">
        <div class="box-img">
          <img src="@/assets/images/gostaresh.png" alt="">
        </div>
        <div class="box-body">
          <div class="box-header">
            <h1 class="heading">{{fund.name}}</h1>
            <p class="body-p">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
            </p>
            <div class="d-flex justify-content-end">
              <VueLoadingButton @click.native="goToDetail(10915)" class="btn" :loading="isLoading" >
                {{submitTitle}}
              </VueLoadingButton>
            </div>
          </div>
          <div class="d-flex justify-content-between box-footer">
            <div class="box-footer-item"><span>تعداد واحدها</span><span>132 واحد</span></div>
            <div class="box-footer-item"><span>واحد صندوق شما</span><span>132 واحد</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoadingButton from 'vue-loading-button'
export default {
  props: ['fund'],
  name: 'boxComponent',
  data () {
    return {
      submitTitle: 'مشاهده صندوق',
      isLoading: false
    }
  },
  components: {
    VueLoadingButton
  },
  methods: {
    goToDetail: function () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = true
        this.$router.push('detail/10915')
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .box{
    margin-bottom: 20px;
    min-height: 252px;
  }
</style>
