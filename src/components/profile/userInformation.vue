<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main" v-if="isDone">
      <div class="mainarea">
          <div class="container">
              <div class="top_site d-flex">
                <h1 class="page-header ml-auto">اطلاعات کاربر</h1>
              </div>
              <div class="user-details-desc">
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">مشخصات کاربری</h1>
                  <div class="row">
                    <div class="col-xl-12 clo-lg-12 col-md-12 col-sm-4 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">ایمیل :</span>
                        <span class="user_info_sec--txt">{{userInfo.email}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <button class="btn edit_btn mr-auto" @click.prevent="editUser()" v-if="userInfo.registerStatus === 'FAILED'">
                      <img src="@/assets/img/edit.svg" alt />ویرایش اطلاعات
                    </button>
                  </div>
                  <div class="conf_text">
                    <p>{{registerStatusMsg}}</p>
                  </div>
                </div>
              </div>
              <div class="user-details-desc">
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">مشخصات عمومی</h1>
                  <div class="row">
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام :</span>
                        <span class="user_info_sec--txt">{{userInfo.firstName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام خانوادگی :</span>
                        <span class="user_info_sec--txt">{{userInfo.lastName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">تاریخ تولد :</span>
                        <span class="user_info_sec--txt">{{userInfo.birth}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره شناسنامه :</span>
                        <span class="user_info_sec--txt">{{userInfo.birthCertNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">محل صدور :</span>
                        <span class="user_info_sec--txt">{{userInfo.issuingCity}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">سریال شناسنامه :</span>
                        <span class="user_info_sec--txt">{{userInfo.birthCertSerial}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام پدر :</span>
                        <span class="user_info_sec--txt">{{userInfo.fatherName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">کد ملی :</span>
                        <span class="user_info_sec--txt">{{userInfo.nationalId}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">جنسیت :</span>
                        <span class="user_info_sec--txt">{{userInfo.gender}}</span>
                      </div>
                    </div>
<!--                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">-->
<!--                      <div class="user_info_sec">-->
<!--                        <span class="user_info_sec&#45;&#45;t"> تصویر پروفایل کاربری :</span>-->
<!--                        <span class="user_info_sec&#45;&#45;txt">{{userInfo.profilePic}}</span>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">-->
<!--                      <div class="user_info_sec">-->
<!--                        <span class="user_info_sec&#45;&#45;t">تصویر اول شناسنامه :</span>-->
<!--                        <span class="user_info_sec&#45;&#45;txt">{{userInfo.birthCertPic}}</span>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">-->
<!--                      <div class="user_info_sec">-->
<!--                        <span class="user_info_sec&#45;&#45;t">تصویر توضیحات شناسنامه :</span>-->
<!--                        <span class="user_info_sec&#45;&#45;txt">{{userInfo.birthCertDescPic}}</span>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">-->
<!--                      <div class="user_info_sec">-->
<!--                        <span class="user_info_sec&#45;&#45;t">تصویر توضیحات شناسنامه :</span>-->
<!--                        <span class="user_info_sec&#45;&#45;txt">{{userInfo.nationalCardPic}}</span>-->
<!--                      </div>-->
<!--                    </div>-->
                  </div>
                </div>
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">اطلاعات تماس</h1>
                  <div class="row">
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره تماس :</span>
                        <span class="user_info_sec--txt">{{userInfo.phoneNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره موبایل :</span>
                        <span class="user_info_sec--txt">{{userInfo.mobileNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">فکس :</span>
                        <span class="user_info_sec--txt">{{userInfo.fax}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">کدپستی :</span>
                        <span class="user_info_sec--txt">{{userInfo.postalCode}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">ایمیل :</span>
                        <span class="user_info_sec--txt">{{userInfo.email}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نوع حساب :</span>
                        <span class="user_info_sec--txt">{{userInfo.accountType}}</span>
                      </div>
                    </div>
                    <div class="col-xl-12 clo-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">آدرس :</span>
                        <span class="user_info_sec--txt">{{userInfo.address}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">اطلاعات بانکی</h1>
                  <div class="row">
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام بانک :</span>
                        <span class="user_info_sec--txt">{{userInfo.bankName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره حساب بانکی :</span>
                        <span class="user_info_sec--txt">{{userInfo.accountNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره شبا :</span>
                        <span class="user_info_sec--txt">{{userInfo.ibanNumber}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
    <div v-else>
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- Main -->
    <!-- Mobile Menu -->
    <toggleMenu></toggleMenu>
    <!-- Mobile Menu -->
  </div>
</template>

<script>

import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
import generalService from '@/services/generalService'
import sharedService from '@/services/sharedService'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'userInformation',
  data () {
    return {
      userInfo: {},
      foundId: this.$route.params.foundId,
      registerStatusMsg: '',
      isLoading: true,
      isDone: false,
      get_founds_url: 'invest/userInformation'
    }
  },
  components: {
    PageHeader, toggleMenu, Loading
  },
  mounted: function () {
    // let loader = Vue.$loading.show({
    //   color: 'blue'
    // }
    this.isDone = false
    sharedService.handleInputLabels()
    sharedService.toggleMenu()
    if (localStorage.getItem('userData')) {
      this.userInfo = JSON.parse(localStorage.getItem('userData'))
    }
    generalService
      .getMethod('/invest/user/')
      .then(response => {
        this.user = response.content
        this.isDone = true
        // localStorage.setItem('regUser', JSON.stringify(this.user))
        if (response.content.registerStatus === 'UNKNOWN') {
          this.registerStatusMsg = 'اطلاعات شما در سیستم ثبت نشده است'
        } else if (response.content.registerStatus === 'PENDING') {
          this.registerStatusMsg = 'اطلاعات شما در انتظار تایید است'
        } else if (response.content.registerStatus === 'FAILED') {
          this.registerStatusMsg = 'برخی از اطلاعات شما توسط مدیر سیستم تایید نشده است لطفا از دکمه ویرایش جهت تکمیل اطالاعات استفاده کنید'
        } else if (response.content.registerStatus === 'READY') {
          this.registerStatusMsg = ''
        }
      })
      .catch(error => {
        console.log(error)
        this.user = null
        this.isDone = true
      })
  },
  methods: {
    editUser () {
      this.$router.push('user/edit')
    }
  }
}
</script>

<style scoped>

</style>
