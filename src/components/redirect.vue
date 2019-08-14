<template>
  <div>
    <page-header></page-header>
    <!-- MainBody-->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container" v-if="isDone">
          <div v-if="isSucceed">
            <!-- <div v-if="status==1"> -->
            <div class="d-flex">
              <img class="mx-auto" src="@/assets/images/checked (1).png" alt="">
            </div>
            <h1 class="page-header c_green">درخواست صدور صندوق شما با موفقیت انجام شد</h1>
          </div>
          <div v-else>
            <!-- <div v-if="status==2"> -->
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
                  <div><span class="value-span">{{receiptNumber}}</span></div>
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
        <div v-else>
          <loading :active.sync="isLoading"></loading>
        </div>
      </div>
    </div>
    <!-- MainBody-->
  </div>
</template>

<script>
import PageHeader from './header/PageHeader'
import submitButton from './share/submitButton'
import generalService from '@/services/generalService'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'redirect',
  components: {
    PageHeader, submitButton, Loading
  },
  data: function () {
    return {
      isSucceed: true,
      receiptNumber: '۴۳۲۱۵۸۷۱۲',
      statementButton: 'مشاهده گردش حساب',
      accountButton: 'مشاهده اطلاعات کاربر',
      isDone: false,
      isLoading: true
    }
  },
  methods: {
    back: function () {
      // todo
      this.$router.push('/detailList')
    },
    goToStatement: function () {

    },
    goToUserProfile: function () {
      this.$router.push('/user')
    },
    getInvoiceStatus: function () {
      let invoiceId = this.$route.params.invoiceId
      generalService.getMethod(`payment/invoice2/${invoiceId}/`,{retries:2}).then(response => {
        if (response.message === 'OK' && response.status === 0) {
          this.receiptNumber = response.content.receiptNumber
          if (response.content.status === 'Failed') {
            this.isSucceed = false
          } else {
            this.isSucceed = true
          }
        } else {
          // todo
          debugger
        }
        this.isDone = true
      }).catch(error => {
        // todo
        console.log(error)
        this.isDone = true
        this.isSucceed = false
      })
    }
  },
  mounted () {
    this.isDone = false
    this.getInvoiceStatus()
  }
}
</script>

<style scoped>

</style>
