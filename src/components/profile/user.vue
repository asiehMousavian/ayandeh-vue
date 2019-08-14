<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div class="top_site d-flex">
            <h1 class="page-header ml-auto">ورود اطلاعات کاربر</h1>
            <button class="btn edit_btn mr-auto" disabled style="cursor: default">
              <img src="@/assets/img/edit.svg" alt />
              ویرایش اطلاعات
            </button>
          </div>
          <form class="user-details-form" action>
            <div class="form-row-new">
              <h1 class="form-header">مشخصات عمومی</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="firstName" class="form-control" v-validate="'required|alpha'"/>
                      <div class="form-alert">
                        <p v-show="errors.has('firstName')">{{ errors.first('firstName') }}</p>
                      </div>
                      <i class="placeholder">نام</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="lastName" class="form-control" v-validate="'required|alpha'"/>
                      <div class="form-alert">
                        <p v-show="errors.first('lastName')">{{ errors.first('lastName') }}</p>
                      </div>
                      <i class="placeholder">نام خانوادگی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="tell" name="birth" class="form-control birth" v-validate="'required'" @blur="checkDate()" v-mask="'## ## ####'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('birth') }}</p>
                      </div>
                      <span class="format_inp">(روز/ماه/سال)</span>
                      <i class="placeholder">تاریخ تولد</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="birthCertNumber" class="form-control" v-validate="'required|numeric|max:10'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('birthCertNumber') }}</p>
                      </div>
                      <i class="placeholder">شماره شناسنامه</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="issuingCity" class="form-control" v-validate="'required|alpha'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('issuingCity') }}</p>
                      </div>
                      <i class="placeholder">محل صدور</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="nationalId" class="form-control" v-validate="'required|numeric|length:10'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('nationalId') }}</p>
                      </div>
                      <i class="placeholder">کد ملی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="d-flex justify-content-end align-items-center uploadBtns">
                    <div class="form-group">
                        <div class="d-flex align-items-center">
                          <div class="upload_file btn">
                            آپلود تصویر کارت ملی
                            <input type="file" name="nationalCardPhoto" ref="myFile" @change="previewFiles()"
                                   class="upload-btn" v-validate="'required'" value=""/>
                          </div>
                          <div class="upload_pic" style="margin-right: 20px; width: 120px;">
                              <img v-bind:src="profileImage" id="sample" alt />
<!--                              <span class="dl_pic">-->
<!--                                 <img src="@/assets/img/close2.svg" alt="">-->
<!--                              </span>-->
                          </div>
                        </div>
                        <div class="form-alert">
                          <p>{{ errors.first('nationalCardPhoto') }}</p>
                        </div>
                        <span class="format_inp">فرمت تصویر png یا jpeg وارد شود</span>
                            <!--                      <div class="pic marginR25">-->
                      <!--                        <span class="dl_pic">-->
                      <!--                            <img src="@/assets/img/close2.svg" alt="">-->
                      <!--                        </span>-->
                      <!--                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <h1 class="form-header">اطلاعات تماس</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="phoneNumber" class="form-control" v-validate="'required|phoneNumberFa'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('phoneNumber') }}</p>
                      </div>
                      <span class="format_inp">مثال:02144874661</span>
                      <i class="placeholder">شماره تماس</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="mobileNumber" class="form-control"
                             v-on:blur="nationalIdMobileCompatibility" v-validate="'required|mobileFa'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('mobileNumber') }}</p>
                      </div>
                      <span class="format_inp">مثال:09121804532</span>
                      <i class="placeholder">شماره موبایل</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="address" class="form-control" v-validate="'required'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('address') }}</p>
                      </div>
                      <i class="placeholder">آدرس</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="postalCode" class="form-control" v-validate="'required|numeric|length:10'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('postalCode') }}</p>
                      </div>
                      <i class="placeholder">کدپستی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <h1 class="form-header">اطلاعات بانکی</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="bankName" class="form-control" v-validate="'required|alpha'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('bankName') }}</p>
                      </div>
                      <i class="placeholder">نام بانک</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="ibanNumber" v-on:blur="getBankInfo" class="form-control" v-validate="'required|length:27'"/>
                      <div class="form-alert">
                        <p>{{ errors.first('ibanNumber') }}</p>
                      </div>
                      <span class="format_inp">مثال:IR410160000000008301078412</span>
                      <i class="placeholder">شماره شبا</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <div class="form-group">
                <div class="d-flex justify-content-start submitBtns">
                  <button class="btn" @click.prevent="submitData()">ثبت اطلاعات</button>
                  <button type="button" class="btn btn-cancel marginR25">انصراف</button>
                </div>
              </div>
            </div>
          </form>
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
import generalService from '@/services/generalService'

export default {
  name: 'user',
  data () {
    // var userInfo
    return {
      userInfo: {
        profilePic: {},
        birthCertPic: {},
        birthCertDescPic: {},
        nationalCardPic: {}
      }
    }
  },
  components: {
    PageHeader, toggleMenu
  },
  mounted () {
    sharedService.handleInputLabels()
    sharedService.checkInputs()
    sharedService.toggleMenu()
  },
  methods: {
    submitData () {
      this.$validator.validate().then(valid => {
        if (!valid) {
          alert()
        } else {
          // this.$bvModal.show('modal1')
        }
      })
    },
    checkDate () {
      let v = this.userInfo.birth.split(' ').reverse()
      this.userInfo.birth = v.join('/')
    },
    nationalIdMobileCompatibility () {
      // check value of mobile and natonalcode
      let condition = true
      if (condition) {
        generalService
          .getMethod('auth/nationalId-mobile-compatibility', {
            params: {nationalId: '4680059088', mobileNumber: '09120450115'}
          })
          .then(response => {
            if (response.message === 'OK' && response.status === 0) {
              if (response.content.status) {
              } else {
                this.errors.add({
                  field: 'mobileNumber',
                  msg: 'کد ملی و شماره موبایل تطابق ندارد'
                })
              }
            }
          })
          .catch(error => {
            // todo
            console.log(error.response.message)
          })
      }
    },
    getBankInfo () {
      let condition = true
      if (condition) {
        // generalService
        //   .getMethod("account", {
        //     params: { iban: "IR070560086280002295585001"}}).then(response => {
        //       debugger
        //     if (response.message === "OK" && response.status === 0) {
        //       // if (response.content.status) {
        //       // }
        //       //  else
        //       //   {
        //       //   this.errors.add({
        //       //     field: "mobileNumber",
        //       //     msg: "کد ملی و شماره موبایل تطابق ندارد"
        //       //   })
        //       // }
        //     }
        //   })
        //   .catch(error => {
        //     //todo
        //     console.log(error);
        //   })
      }
    },
    previewFiles () {
      let files = this.$refs.myFile.files
      let That = this
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
          That.profileImage = e.target.result
        }
        reader.readAsDataURL(files[0])
      }
    }
  }
}
</script>

<style scoped>
  .form-alert {
    left: 0;
    background-color: #f2f2f2;
  }
  .format_inp {
    display: block;
    color: #666;
    font-size: 13px;
    position: absolute;
    right: 0;
  }
  .upload_file{
    position: relative;
    cursor: pointer;
  }
  .user-details-form .form-row-new .uploadBtns .upload-btn{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    font-size: 0;
    background-color: transparent;
    border: none;
    padding: 0;
    opacity: 0;
    cursor: pointer;
    margin-top: 0;
  }
</style>
