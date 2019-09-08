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
                      <input type="text" name="firstName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.firstName" :disabled="validations && validations.firstNameConfirmed" />
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
                      <input type="text" name="lastName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.lastName" :disabled="validations && validations.lastNameConfirmed"/>
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
                      <input type="tell" name="birth" class="form-control birth"
                             v-validate="'required'"
                             @blur="checkDate()"
                             v-mask="'## ## ####'"
                             v-model="userInfo.birthDate"
                             :disabled="validations && validations.birthDateConfirmed"/>
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
                      <input type="text" name="birthCertNumber" class="form-control" v-validate="'required|numeric|max:10'" v-model="userInfo.birthCertNumber" :disabled="validations && validations.birthCertNumberConfirmed"/>
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
                      <input type="text" name="issuingCity" class="form-control" v-validate="'required|alpha'" v-model="userInfo.issuingCity" :disabled="validations && validations.issuingCityConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('issuingCity') }}</p>
                      </div>
                      <i class="placeholder">محل صدور</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="birthCertSerial" class="form-control" v-validate="'required'" v-model="userInfo.birthCertSerial" :disabled="validations && validations.birthCertSerialConfirmed"/>
                      <div class="form-alert">
                        <p v-show="errors.first('birthCertSerial')">{{ errors.first('birthCertSerial') }}</p>
                      </div>
                      <span class="format_inp">مثال :‌الف12123456</span>
                      <i class="placeholder">سریال شناسنامه</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="fatherName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.fatherName" :disabled="validations && validations.fatherNameConfirmed"/>
                      <div class="form-alert">
                        <p v-show="errors.first('fatherName')">{{ errors.first('fatherName') }}</p>
                      </div>
                      <i class="placeholder">نام پدر</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="nationalId" class="form-control" v-validate="'required|numeric|length:10'" v-model="userInfo.nationalId" :disabled="validations && validations.nationalIdConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('nationalId') }}</p>
                      </div>
                      <i class="placeholder">کد ملی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                      <div class="tt_body">
                        <span class="tt">جنسیت :</span>
                        <label class="radio">
                          <input type="radio" name="gender" value="Male" v-validate="'required|included:Male,Female'" v-model="userInfo.gender"/>
                          مرد
                        </label>
                        <label class="radio">
                          <input type="radio" name="gender" value="Female" v-validate="'required|included:Male,Female'" v-model="userInfo.gender"/>
                          زن
                        </label>
                      </div>
                      <div class="form-alert">
                        <p>{{ errors.first('gender') }}</p>
                      </div>
<!--                      <i class="placeholder">جنسیت</i>-->
<!--                      <i class="line"></i>-->
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="d-flex justify-content-end align-items-center uploadBtns">
                      <div class="form-group">
                          <div class="d-flex align-items-center">
                            <div class="upload_file btn">
                              آپلود تصویر پروفایل کاربری
                              <input type="file" name="profilePhoto" ref="profilePhotoInput" @change="uploadProfilePic()"
                                     class="upload-btn" v-validate="'required'" value=""/>
                            </div>
                            <div class="upload_pic">
                                <img v-if="userInfo.profilePic" v-bind:src="userInfo.profilePic.previewUrl" alt />
<!--                                <span class="dl_pic" v-if="userInfo.profilePic.previewUrl" @click="deleteImage()">-->
<!--                                    <img src="@/assets/img/close2.svg" alt="">-->
<!--                                </span>-->
                            </div>
                          </div>
                          <div class="form-alert">
                            <p>{{ errors.first('profilePhoto') }}</p>
                          </div>
                          <span class="format_inp">فرمت تصویر png یا jpeg وارد شود</span>
                      </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="d-flex justify-content-end align-items-center uploadBtns">
                    <div class="form-group">
                      <div class="d-flex align-items-center">
                        <div class="upload_file btn">
                          آپلود تصویر اول شناسنامه
                          <input type="file" name="birthCertPic" ref="birthCertPhotoInput" @change="uploadBirthCertPicId()"
                                 class="upload-btn" v-validate="'required'" value=""/>
                        </div>
                        <div class="upload_pic" style="margin-right: 20px; width: 120px;">
                          <img v-if="userInfo.birthCertPic" v-bind:src="userInfo.birthCertPic.previewUrl" alt />
<!--                          <span class="dl_pic" v-if="userInfo.birthCertPic.previewUrl" @click="deleteImage()">-->
<!--                              <img src="@/assets/img/close2.svg" alt="">-->
<!--                          </span>-->
                        </div>
                      </div>
                      <div class="form-alert">
                        <p>{{ errors.first('birthCertPic') }}</p>
                      </div>
                      <span class="format_inp">فرمت تصویر png یا jpeg وارد شود</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="d-flex justify-content-end align-items-center uploadBtns">
                    <div class="form-group">
                      <div class="d-flex align-items-center">
                        <div class="upload_file btn">
                          آپلود تصویرآپلود تصویر توضیحات شناسنامه
                          <input type="file" name="birthCertDescPic" ref="birthCertDescPhotoInput" @change="uploadBirthCertDescPicId()"
                                 class="upload-btn" v-validate="'required'" value=""/>
                        </div>
                        <div class="upload_pic" style="margin-right: 20px; width: 120px;">
                          <img v-if="userInfo.birthCertDescPic" v-bind:src="userInfo.birthCertDescPic.previewUrl" alt />
<!--                          <span class="dl_pic" v-if="userInfo.birthCertDescPic.previewUrl" @click="deleteImage()">-->
<!--                              <img src="@/assets/img/close2.svg" alt="">-->
<!--                          </span>-->
                        </div>
                      </div>
                      <div class="form-alert">
                        <p>{{ errors.first('birthCertDescPic') }}</p>
                      </div>
                      <span class="format_inp">فرمت تصویر png یا jpeg وارد شود</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="d-flex justify-content-end align-items-center uploadBtns">
                    <div class="form-group">
                      <div class="d-flex align-items-center">
                        <div class="upload_file btn">
                          آپلود تصویر کارت ملی
                          <input type="file" name="nationalCardPic" ref="nationalCardPhotoInput" @change="uploadNationalCardPicId()"
                                 class="upload-btn" v-validate="'required'" value=""/>
                        </div>
                        <div class="upload_pic" style="margin-right: 20px; width: 120px;">
                          <img v-if="userInfo.nationalCardPic" v-bind:src="userInfo.nationalCardPic.previewUrl" alt />
<!--                          <span class="dl_pic" v-if="userInfo.nationalCardPic.previewUrl" @click="deleteImage()">-->
<!--                              <img src="@/assets/img/close2.svg" alt="">-->
<!--                          </span>-->
                        </div>
                      </div>
                      <div class="form-alert">
                        <p>{{ errors.first('nationalCardPic') }}</p>
                      </div>
                      <span class="format_inp">فرمت تصویر png یا jpeg وارد شود</span>
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
                      <input type="tell" name="phoneNumber" class="form-control" v-validate="'required|phoneNumberFa'" v-model="userInfo.phoneNumber" :disabled="validations && validations.phoneNumberConfirmed"/>
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
                      <input type="tell" name="mobileNumber" class="form-control"
                             v-on:blur="nationalIdMobileCompatibility" v-validate="'required|mobileFa'" v-model="userInfo.mobileNumber" :disabled="validations && validations.mobileNumberConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('mobileNumber') }}</p>
                      </div>
                      <span class="format_inp">مثال:09121804532</span>
                      <i class="placeholder">شماره موبایل</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="tell" name="fax" class="form-control" v-validate="'required'" v-model="userInfo.fax" :disabled="validations && validations.faxNumberConfirmed">
                      <i class="placeholder">فکس</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="address" class="form-control" v-validate="'required'" v-model="userInfo.address" :disabled="validations && validations.addressConfirmed"/>
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
                      <input type="tell" name="postalCode" class="form-control" v-validate="'required|numeric|length:10'" v-model="userInfo.postalCode" :disabled="validations && validations.postalCodeConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('postalCode') }}</p>
                      </div>
                      <i class="placeholder">کدپستی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="email" class="form-control" v-validate="'required'" v-model="userInfo.email" :disabled="validations && validations.emailAddressConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('email') }}</p>
                      </div>
                      <i class="placeholder">ایمیل</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <h3>نوع حساب</h3>
                  <div class="form-group">
                    <select name="acountType" class="form-control"
                            ref="acountTypeInput"
                            v-model="userInfo.accountType"
                            v-validate="'required'">
                      <option value="LONG_TERM">بلند مدت</option>
                      <option value="CHEQUE">حساب جاری</option>
                      <option value="INVESTMENT">سرمایه گذاری</option>
                      <option value="SHORT_TERM">کوتاه مدت</option>
                      <option value="Unknown">سایر</option>
                    </select>
                    <div class="form-alert">{{errors.first('acountType')}}</div>
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
                      <input type="text" name="bankName" class="form-control" v-validate="'required|alpha'" v-model="userInfo.bankName" :disabled="validations && validations.bankNameConfirmed"/>
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
                      <input type="text" name="accountNumber" class="form-control" v-validate="'required'" v-model="userInfo.accountNumber" :disabled="validations && validations.accountNumberConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('accountNumber') }}</p>
                      </div>
                      <i class="placeholder">شماره حساب بانکی</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="ibanNumber" @blur="getBankInfo() , checkIban()" class="form-control" v-model="userInfo.ibanNumber" v-mask="'IR##-###-######-#############'" :disabled="validations && validations.ibanNumberConfirmed"/>
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
                  <button type="button" class="btn" @click.prevent="submitData()">ثبت اطلاعات</button>
                  <button type="button" class="btn btn-cancel marginR25" @click="cancelOp()">انصراف</button>
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
    <!-- confirmCancel Modal -->
    <b-modal id="confirmCancel" title="BootstrapVue" hide-header hide-footer size="md">
      <div class="confirm_txt">
        <p>آیا از انصراف خود اطمینان دارید؟</p>
      </div>
      <div class="d-flex justify-content-start confirm_btn">
        <a href="#" class="btn" @click.prevent="yesConfirmCancel() , $bvModal.hide('confirmCancel')">بله</a>
        <a href="#" class="btn btn-cancel" @click.prevent="noConfirmCancel() , $bvModal.hide('confirmCancel')">خیر</a>
      </div>
    </b-modal>
    <!-- confirmCancel Modal -->
    <!-- confirmRefresh Modal -->
    <b-modal id="confirmRefresh" title="BootstrapVue" hide-header hide-footer size="md" ref="confirmRefresh">
      <div class="confirm_txt">
        <p>آیا مایل به بازخوانی اطلاعات خود هستید؟</p>
      </div>
      <div class="d-flex justify-content-start confirm_btn">
        <a href="#" class="btn" @click.prevent="yesConfirmRefresh() , $bvModal.hide('confirmRefresh')">بله</a>
        <a href="#" class="btn btn-cancel" @click.prevent="noConfirmRefresh() , $bvModal.hide('confirmRefresh')">خیر</a>
      </div>
    </b-modal>
    <!-- confirmRefresh Modal -->
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
      file: '',
      userInfo: {
        profilePic: {},
        birthCertPic: {},
        birthCertDescPic: {},
        nationalCardPic: {}
      },
      uploadResponse: {
        active: 0,
        msg: '',
        status: 0,
        bvHeader: 0
      },
      mode: 'create',
      validations: {},
      get_founds_url: 'invest/user'
    }
  },
  // beforeUpdate () {
  //   sharedService.checkInputs()
  // },
  components: {
    PageHeader, toggleMenu
  },
  mounted () {
    sharedService.handleInputLabels()
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
    if (this.$route.params.mode) {
      this.mode = 'update'
      generalService.getMethod('/invest/user/')
        .then(response => {
          this.userInfo = response.content
          this.getRegisteredUserConfirmations()
          setTimeout(() => {
            sharedService.checkInputs()
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    }
    if (localStorage.getItem('userInfoData')) {
      this.showMyModal()
    }
  },
  methods: {
    showMyModal () {
      this.$refs['confirmRefresh'].show()
    },
    submitData: function () {
      this.$validator.validate().then(valid => {
        if (valid) {
          if (this.mode !== 'creat') {
            this.userInfo.profilePicId = this.userInfo.profilePic ? this.userInfo.profilePic.uniqueId : null
            this.userInfo.personalPicId = this.userInfo.profilePic ? this.userInfo.profilePic.uniqueId : null
            this.userInfo.birthCertPicId = this.userInfo.birthCertPic ? this.userInfo.birthCertPic.uniqueId : null
            this.userInfo.birthCertDescPicId = this.userInfo.birthCertDescPic ? this.userInfo.birthCertDescPic.uniqueId : null
            this.userInfo.nationalCardPicId = this.userInfo.nationalCardPic ? this.userInfo.nationalCardPic.uniqueId : null
            // if (this.userInfo.birth) {
            //   let birth = this.userInfo.birth.split('/')
            //   let birthDate = birth[0] + '/' + birth[1] + '/' + birth[2]
            //   this.userInfo.birthDate = moment(birthDate, 'jYYYY,jMM,jDD').valueOf()
            // }
            debugger
            generalService
              .postMethod('invest/fund/register/investor/10915', this.userInfo)
              .then(response => {
                debugger
                if (response.status === 0 && response.message === 'OK') {
                  // sharedService.Done('ثبت نام با موفقیت انجام شد')
                  this.$router.push('/userInformation')
                }
              }).catch(error => {
                console.log(error)
              // sharedService.Failed(error.response.data.message)
              })
          } else {
            // generalService
            //   .putMethod(`invest/fund/register/investor/${this.fundId}`, this.userInfo)
            //   .then(response => {
            //     debugger
            //     if (response.status === 0 && response.message === 'OK') {
            //       // sharedService.Done('ثبت نام با موفقیت انجام شد')
            //     }
            //   }).catch(error => {
            //     console.log(error)
            //   // sharedService.Failed(error.response.data.message)
            //   })
          }
        }
      })
    },
    checkDate () {
      if (this.userInfo.birthDate) {
        let bir = this.userInfo.birthDate.split(' ').reverse()
        this.userInfo.birthDate = bir.join('/')
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
    handleFileUpload (ref) {
      return new Promise((resolve, reject) => {
        if (ref.files.length > 0) {
          this.file = ref.files[0]
          let fileSize = ref.files[0].size
          if (fileSize > 1048576) {
            this.uploadResponse.status = 0
            this.uploadResponse.msg = 'حجم فایل بیشتر از ۱ مگابایت هست.'
            this.refreshAlerts()
          } else {
            let formData = new FormData()
            let self = this
            formData.append('file', this.file)
            generalService
              .uploadFile(formData)
              .then(response => {
                if (response.status === 0) {
                  self.uploadResponse.status = 1
                  self.uploadResponse.msg = 'آپلود با موفقیت انجام شد'
                  self.refreshAlerts()
                  resolve(response)
                } else if (response.response.status === 500) {
                  this.uploadResponse.status = 0
                  this.uploadResponse.msg = 'آپلود انجام نشد، لطفا دوباره تلاش کنید'
                }
              })
              .catch(error => {
                this.uploadResponse.status = 0
                this.uploadResponse.msg = 'آپلود انجام نشد، لطفا دوباره تلاش کنید'
                self.refreshAlerts()
                reject(error)
              })
          }
        }
      })
    },
    uploadProfilePic () {
      this.uploadResponse.active = 1
      this.handleFileUpload(this.$refs.profilePhotoInput)
        .then(response => {
          this.userInfo.profilePic = response.content
          console.log(this.userInfo.profilePic)
        })
        .catch(error => {
          console.log(error)
        })
    },
    uploadBirthCertPicId () {
      this.handleFileUpload(this.$refs.birthCertPhotoInput)
        .then(response => {
          this.uploadResponse.active = 2
          this.userInfo.birthCertPic = response.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    uploadBirthCertDescPicId () {
      this.uploadResponse.active = 3
      this.handleFileUpload(this.$refs.birthCertDescPhotoInput)
        .then(response => {
          this.userInfo.birthCertDescPic = response.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    uploadNationalCardPicId () {
      this.uploadResponse.active = 4
      this.handleFileUpload(this.$refs.nationalCardPhotoInput)
        .then(response => {
          this.userInfo.nationalCardPic = response.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteImage (ref) {
      switch (ref) {
        case 'profilePic':
          this.$refs.profilePic = null
          this.userInfo.profilePic = {}
          break
        case 'birthCertPic':
          this.$refs.birthCertPic = null
          this.userInfo.birthCertPic = {}
          break
        case 'birthCertDescPic':
          this.$refs.birthCertDescPic = null
          this.userInfo.birthCertPic = {}
          break
        case 'nationalCardPic':
          this.$refs.nationalCardPic = null
          this.userInfo.nationalCardPic = {}
          break
      }
    },
    refreshAlerts () {
      setTimeout(() => {
        this.uploadResponse = {
          active: 0,
          msg: '',
          status: 0
        }
      }, 5000)
    },
    noConfirmCancel () {
      this.$validator.validate()
    },
    yesConfirmCancel () {
      if (Object.keys(this.userInfo).length > 4) {
        // console.log(Object.keys(this.userInfo).length)
        let userInfoData = JSON.stringify(this.userInfo)
        localStorage.setItem('userInfoData', userInfoData)
      }
      this.$router.push('detail/10915')
    },
    yesConfirmRefresh () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfoData'))
      setTimeout(() => {
        sharedService.checkInputs()
      }, 10)
    },
    noConfirmRefresh () {
      localStorage.removeItem('userInfoData')
    },
    getRegisteredUserConfirmations () {
      generalService
        .getMethod('/invest/user/validate/info')
        .then(response => {
          this.validations = response.content
          for (let item in this.validations) {
            if (!this.validations[item]) {
              debugger
              let data = item.split('Confirmed')
              data = data[0]
              if (this.userInfo.hasOwnProperty(data)) {
                this.userInfo[data] = ''
                this.errors.add({
                  field: data,
                  msg: 'مقدار فیلد مورد تایید نمی باشد.'
                })
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // TODO fix cancel op
    cancelOp () {
      if (this.mode === 'create') {
        this.$bvModal.show('confirmCancel')
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style scoped>
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
  .confirm_txt{
    margin-bottom: 15px;
  }
  .confirm_txt p{
    font-size: 15px;
  }
  .confirm_btn .btn{
    width: 130px;
    height: 40px;
    line-height: 39px;
  }
  .confirm_btn .btn-cancel{
    margin-right: 25px;
  }
  .upload_pic{
    position: relative;
  }
  .upload_pic > img{
    width: 110px;
    margin-right: 10px;
  }
  .dl_pic{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    cursor: pointer;
  }
</style>
