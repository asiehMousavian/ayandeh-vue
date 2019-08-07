<template>
  <div class="all">
    <page-header></page-header>
    <!-- MainBody-->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div v-if="isSucceed">
            <div class="d-flex">
              <img class="mx-auto" src="@/assets/images/checked (1).png" alt="">
            </div>
            <h1 class="page-header c_green">درخواست صدور صندوق شما با موفقیت انجام شد</h1>
          </div>
          <div v-else>
            <div class="d-flex">
              <img class="mx-auto" src="@/assets/images/error.png" alt="">
            </div>
            <h1 class="page-header c_red">متاسفانه درخواست خرید با خطا مواجه شد</h1>
          </div>
          <div class="row">
            <div class="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-xs-12" >
              <div class="d-flex flex-column main-body">
                <h1 v-if="isSucceed">توجه داشته باشید که عملیات صدور دو روز کاری زمان خواهد برد</h1>
                <div class="d-flex justify-content-between pursuit-btns">
                  <div><span class="code-span">کد پیگیری درخواست:</span></div>
                  <div><span class="value-span">{{trackingCode}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
              <div class="d-flex justify-content-center pursuit-btn-group">
                <submit-button v-bind:buttonTitle="statementButton" v-on:submit="goToStatement"></submit-button>
                <submit-button v-bind:buttonTitle="accountButton" v-on:submit="goToUserProfile"></submit-button>
                <button class="btn btn-cancel" @click="back()">بازگشت</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- MainBody-->
  </div>
</template>

<script>
import PageHeader from './header/PageHeader'
import submitButton from './share/submitButton'
import { truncate } from 'fs';
export default {
  props: [],
  name: 'redirect',
  components: {
    PageHeader, submitButton
  },
  data: function () {
    return {
      isSucceed: true,
      trackingCode: '۴۳۲۱۵۸۷۱۲',
      statementButton: 'مشاهده گردش حساب',
      accountButton: 'مشاهده اطلاعات کاربر'
    }
  },
  methods: {
    back: function () {
      //todo
      this.$router.push('/detail/box1')
    },
    goToStatement:function()
    {

    },
    goToUserProfile:function()
    {
      this.$router.push('/user')

    }
  },
  mounted () {
    // setTimeout(() => {
    //   // eslint-disable-next-line
    //   if (this.$route.hash == '#failed') {
    //     this.isSucceed = false
    //   }
    // }, 100)
    var status=this.$route.params.status
      if (status == "failed") {
        this.isSucceed = false
      }
      else if(status == "success"){
        this.isSucceed = true
      }
  }
}
</script>

<style scoped>

</style>
