<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
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
                    <button class="btn edit_btn mr-auto">
                      <img src="@/assets/img/edit.svg" alt />ویرایش اطلاعات
                    </button>
                  </div>
                  <div class="conf_text">
                    <p>اطلاعات شما ثبت گردیده است و در انتظار تایید مدیریت می باشد.</p>
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
                        <span class="user_info_sec--t">کد ملی :</span>
                        <span class="user_info_sec--txt">{{userInfo.nationalId}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">اطلاعات تماس</h1>
                  <div class="row">
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-4 col-6">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">اطلاعات تماس :</span>
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
                        <span class="user_info_sec--t">کدپستی :</span>
                        <span class="user_info_sec--txt">{{userInfo.postalCode}}</span>
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
                    <div class="">
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
    <!-- Main -->
    <!-- Mobile Menu -->
    <toggleMenu></toggleMenu>
    <!-- Mobile Menu -->
  </div>
</template>

<script>

import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
import sharedService from '@/services/sharedService'

export default {
  name: 'userInformation',
  data () {
    return {
      userInfo: {},
      get_founds_url: 'invest/userInformation'
    }
  },
  components: {
    PageHeader, toggleMenu
  },
  mounted () {
    sharedService.handleInputLabels()
    sharedService.toggleMenu()
    if (localStorage.getItem('userData')) {
      this.userInfo = JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
