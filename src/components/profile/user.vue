<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea">
        <div class="container">
          <div class="top_site d-flex">
            <h1 class="page-header ml-auto">ورود اطلاعات کاربر</h1>
<!--            <button class="btn edit_btn mr-auto" disabled style="cursor: default">-->
<!--              <img src="@/assets/img/edit.svg" alt />-->
<!--              ویرایش اطلاعات-->
<!--            </button>-->
          </div>
          <form class="user-details-form" action>
            <div class="form-row-new">
              <h1 class="form-header">مشخصات عمومی</h1>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="firstName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.firstName" />
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
                      <input type="text" name="lastName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.lastName"/>
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
                      <input type="tell" name="birth" class="form-control birth" v-validate="'required'" @blur="checkDate()" v-mask="'## ## ####'" v-model="userInfo.birth"/>
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
                      <input type="text" name="birthCertNumber" class="form-control" v-validate="'required|numeric|max:10'" v-model="userInfo.birthCertNumber"/>
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
                      <input type="text" name="issuingCity" class="form-control" v-validate="'required|alpha'" v-model="userInfo.issuingCity"/>
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
                      <input type="text" name="nationalId" class="form-control" v-validate="'required|numeric|length:10'" v-model="userInfo.nationalId"/>
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
<!--                    <div class="form-group">-->
<!--                        <div class="d-flex align-items-center">-->
<!--                          <div class="upload_file btn">-->
<!--                            آپلود تصویر کارت ملی-->
<!--                            <input type="file" name="nationalCardPhoto" ref="myFile" @change="previewFiles()"-->
<!--                                   class="upload-btn" v-validate="'required'" value=""/>-->
<!--                          </div>-->
<!--                          <div class="upload_pic" style="margin-right: 20px; width: 120px;">-->
<!--                              <img v-bind:src="profileImage" id="sample" alt />-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div class="form-alert">-->
<!--                          <p>{{ errors.first('nationalCardPhoto') }}</p>-->
<!--                        </div>-->
<!--                        <span class="format_inp">فرمت تصویر png یا jpeg وارد شود</span>-->
<!--                            &lt;!&ndash;                      <div class="pic marginR25">&ndash;&gt;-->
<!--                      &lt;!&ndash;                        <span class="dl_pic">&ndash;&gt;-->
<!--                      &lt;!&ndash;                            <img src="@/assets/img/close2.svg" alt="">&ndash;&gt;-->
<!--                      &lt;!&ndash;                        </span>&ndash;&gt;-->
<!--                      &lt;!&ndash;                      </div>&ndash;&gt;-->
<!--                    </div>-->
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
                      <input type="text" name="phoneNumber" class="form-control" v-validate="'required|phoneNumberFa'" v-model="userInfo.phoneNumber"/>
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
                             v-on:blur="nationalIdMobileCompatibility" v-validate="'required|mobileFa'" v-model="userInfo.mobileNumber"/>
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
                      <input type="text" name="address" class="form-control" v-validate="'required'" v-model="userInfo.address"/>
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
                      <input type="text" name="postalCode" class="form-control" v-validate="'required|numeric|length:10'" v-model="userInfo.postalCode"/>
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
                      <input type="text" name="bankName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.bankName"/>
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
                      <input type="text" name="ibanNumber" @blur="getBankInfo , checkIban()" class="form-control" v-model="userInfo.ibanNumber" v-mask="'IR##-###-######-#############'"/>
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
    return {
      userInfo: {},
      get_founds_url: 'invest/user'
    }
  },
  components: {
    PageHeader, toggleMenu
  },
  mounted () {
    sharedService.handleInputLabels()
    // sharedService.checkInputs()
    sharedService.toggleMenu()
    // if (this.$session.has('clientInfo')) {
    //   let client = this.$session.get('clientInfo')
    //   if (client) {
    //     let user=JSON.parse(client)
    //   }
    // }
    // generalService.getMethod('invest/user/')
    //   .then(response => {
    //     this.userInfo = response.content
    //     if (response.status === 0 && response.message === 'OK') {
    //       sharedService.checkInputs()
    //       sharedService.checkReadOnly()
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // if (localStorage.getItem('userData')) {
    //   this.userInfo = JSON.parse(localStorage.getItem('userData'))
    // }
  },
  methods: {
    submitData: function () {
      this.$validator.validate().then(valid => {
        if (valid) {
          generalService
            .postMethod('invest/fund/register/investor/10915', this.userInfo)
            .then(response => {
              debugger
              if (response.status === 0 && response.message === 'OK') {
                // sharedService.Done('ثبت نام با موفقیت انجام شد')
              }
            }).catch(error => {
              console.log(error)
              // sharedService.Failed(error.response.data.message)
            })
        } else {
        }
      })
    },
    checkDate () {
      if (this.userInfo.birth) {
        let bir = this.userInfo.birth.split(' ').reverse()
        this.userInfo.birth = bir.join('/')
      }
    },
    checkIban () {
      let IR = this.userInfo.ibanNumber.split('-')
      this.userInfo.ibanNumber = IR.join('')
    },
    nationalIdMobileCompatibility () {
      // check value of mobile and nationalCode
      let condition = true
      if (condition) {
        generalService
          .getMethod('auth/nationalId-mobile-compatibility', {
            params: {nationalId: 'userInfo.nationalId', mobileNumber: 'userInfo.mobileNumber'}
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
