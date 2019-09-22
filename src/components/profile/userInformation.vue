<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main" v-if="isDone">
      <div class="mainarea main_wh">
          <div class="container">
              <div class="top_site d-flex">
                <h1 class="page-header ml-auto">اطلاعات کاربر</h1>
              </div>
              <div class="user-details-desc">
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">مشخصات کاربری</h1>
                  <div class="row">
                    <div class="col-xl-12 clo-lg-12 col-md-12 col-sm-12 col-12">
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
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام :</span>
                        <span class="user_info_sec--txt">{{userInfo.firstName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام خانوادگی :</span>
                        <span class="user_info_sec--txt">{{userInfo.lastName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">تاریخ تولد :</span>
                        <span class="user_info_sec--txt">{{birthDate}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره شناسنامه :</span>
                        <span class="user_info_sec--txt">{{userInfo.birthCertNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">محل صدور :</span>
                        <span class="user_info_sec--txt">{{userInfo.issuingCity}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">سریال شناسنامه :</span>
                        <span class="user_info_sec--txt">{{userInfo.birthCertSerial}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام پدر :</span>
                        <span class="user_info_sec--txt">{{userInfo.fatherName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">کد ملی :</span>
                        <span class="user_info_sec--txt">{{userInfo.nationalId}}</span>
                      </div>
                    </div>
                    <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">جنسیت :</span>
                        <span class="user_info_sec--txt">{{userInfo.gender}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <div class="upload_body">
                          <div class="upload_file">
                            <img src="@/assets/img/default.svg" alt="">
                            <div class="upload_pic">
                              <img v-if="userInfo.profilePic" v-bind:src="(userInfo.profilePic)?userInfo.profilePic.previewUrl:''" alt />
                              <div class="upload_back" v-if="userInfo.profilePic">
                                <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal2')">
                                  <img src="@/assets/img/see.svg" alt="">
                                  مشاهده تصویر
                                </a>
                              </div>
                            </div>
                          </div>
                          <span class="upload_title">
                             تصویر پروفایل کاربری
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <div class="upload_body">
                          <div class="upload_file">
                            <img src="@/assets/img/default.svg" alt="">
                            <div class="upload_pic">
                              <img v-if="userInfo.birthCertPic" v-bind:src="(userInfo.birthCertPic)?userInfo.birthCertPic.previewUrl:''" alt />
                              <div class="upload_back" v-if="userInfo.birthCertPic">
                                <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal')">
                                  <img src="@/assets/img/see.svg" alt="">
                                  مشاهده تصویر
                                </a>
                              </div>
                            </div>
                          </div>
                          <span class="upload_title">
                             تصویر صفحه اول شناسنامه
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <div class="upload_body">
                          <div class="upload_file">
                            <img src="@/assets/img/default.svg" alt="">
                            <div class="upload_pic">
                              <img v-if="userInfo.birthCertDescPic" v-bind:src="(userInfo.birthCertDescPic)?userInfo.birthCertDescPic.previewUrl:''" alt />
                              <div class="upload_back" v-if="userInfo.birthCertDescPic">
                                <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal3')">
                                  <img src="@/assets/img/see.svg" alt="">
                                  مشاهده تصویر
                                </a>
                              </div>
                            </div>
                          </div>
                          <span class="upload_title">
                             تصویر توضیحات شناسنامه
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <div class="upload_body">
                          <div class="upload_file">
                            <img src="@/assets/img/default.svg" alt="">
                            <div class="upload_pic">
                              <img v-if="userInfo.nationalCardPic" v-bind:src="(userInfo.nationalCardPic)?userInfo.nationalCardPic.previewUrl:''" alt />
                              <div class="upload_back" v-if="userInfo.nationalCardPic">
                                <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal4')">
                                  <img src="@/assets/img/see.svg" alt="">
                                  مشاهده تصویر
                                </a>
                              </div>
                            </div>
                          </div>
                          <span class="upload_title">
                             تصویر کارت ملی
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-details-sec">
                  <h1 class="user-details-sec--title">اطلاعات تماس</h1>
                  <div class="row">
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره تماس :</span>
                        <span class="user_info_sec--txt">{{userInfo.phoneNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره موبایل :</span>
                        <span class="user_info_sec--txt">{{userInfo.mobileNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">کدپستی :</span>
                        <span class="user_info_sec--txt">{{userInfo.postalCode}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">ایمیل :</span>
                        <span class="user_info_sec--txt">{{userInfo.email}}</span>
                      </div>
                    </div>
                    <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">فکس :</span>
                        <span class="user_info_sec--txt">{{userInfo.fax}}</span>
                      </div>
                    </div>
                    <div class="col-xl-9 clo-lg-6 col-md-9 col-sm-12 col-12">
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
                    <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نام بانک :</span>
                        <span class="user_info_sec--txt">{{userInfo.bankName}}</span>
                      </div>
                    </div>
                    <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره حساب بانکی :</span>
                        <span class="user_info_sec--txt">{{userInfo.accountNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">شماره شبا :</span>
                        <span class="user_info_sec--txt">{{userInfo.ibanNumber}}</span>
                      </div>
                    </div>
                    <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="user_info_sec">
                        <span class="user_info_sec--t">نوع حساب :</span>
                        <span class="user_info_sec--txt">{{userInfo.accountType}}</span>
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
    <!-- Show Photo Modal -->
    <b-modal id="displayPhoto" title="BootstrapVue" hide-header hide-footer size="md">
      <img v-if="hasPic" v-bind:src="imgSrc" alt />
    </b-modal>
    <!-- Show Photo Modal -->
  </div>
</template>

<script>

import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
import generalService from '@/services/generalService'
import sharedService from '@/services/sharedService'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
const moment = require('jalali-moment')


export default {
  name: 'userInformation',
  data () {
    return {
      userInfo: {
        profilePic: {},
        birthCertPic: {},
        birthCertDescPic: {},
        nationalCardPic: {}
      },
      foundId: this.$route.params.foundId,
      registerStatusMsg: '',
      isLoading: true,
      isDone: false,
      get_founds_url: 'invest/userInformation',
      imgSrc: '',
      hasPic: false,
      birthDate:''
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
        this.userInfo = response.content
        let date= moment.unix(this.userInfo.birthDate / 1000).format('jDD jMM jYYYY')
        this.birthDate=this.checkDate(date);

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
        checkDate (date) {
          let bir = date.split(' ').reverse()
          return bir.join('/')
      },
    editUser () {
      this.$router.push('user/update')
    },
    showMyModal (modalId) {
      if (modalId === 'showPhotoModal') {
        this.imgSrc = this.userInfo.birthCertPic.previewUrl
        if (this.userInfo.birthCertPic != null) {
          this.hasPic = true
        } else {
          this.hasPic = false
        }
      } else if (modalId === 'showPhotoModal2') {
        this.imgSrc = this.userInfo.profilePic.previewUrl
        if (this.userInfo.profilePic != null) {
          this.hasPic = true
        } else {
          this.hasPic = false
        }
      } else if (modalId === 'showPhotoModal3') {
        this.imgSrc = this.userInfo.birthCertDescPic.previewUrl
        if (this.userInfo.birthCertDescPic != null) {
          this.hasPic = true
        } else {
          this.hasPic = false
        }
      } else if (modalId === 'showPhotoModal4') {
        this.imgSrc = this.userInfo.nationalCardPic.previewUrl
        if (this.userInfo.nationalCardPic != null) {
          this.hasPic = true
        } else {
          this.hasPic = false
        }
      }
      this.$bvModal.show('displayPhoto')
    }
  }
}
</script>

<style scoped>

</style>
