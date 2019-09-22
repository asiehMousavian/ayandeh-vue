<template>
  <div class="all">
    <page-header></page-header>
    <!-- Main -->
    <div id="main" role="main">
      <div class="mainarea main_wh">
        <div class="container">
          <div class="top_site d-flex">
            <h1 class="page-header ml-auto">ورود اطلاعات کاربر</h1>
          </div>
          <form class="user-details-form" action>
            <div class="form-row-new">
              <h1 class="form-header">مشخصات عمومی</h1>
              <div class="row">
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
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
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
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
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="tell" name="birth" class="form-control birth"
                             v-validate="'required'"
                             @blur="checkDate()"
                             v-mask="'## ## ####'"
                             v-model="d"
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
                      <input type="text" name="nationalId" class="form-control" v-validate="'required|numeric|length:10'" v-model="userInfo.nationalId" :disabled="validations && validations.nationalIdConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('nationalId') }}</p>
                      </div>
                      <i class="placeholder">کد ملی</i>
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
                <div class="col-xl-4 clo-lg-4 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="tt_body d-flex">
                      <span class="tt ml-auto">جنسیت :</span>
                      <div class="mr-auto d-flex">
                        <div class="md-radio">
                          <input type="radio" id="1" name="gender" value="Male" v-validate="'required|included:Male,Female'" v-model="userInfo.gender"/>
                          <label for="1">مرد</label>
                        </div>
                        <div class="md-radio">
                          <input type="radio" id="2" name="gender" value="Female" v-validate="'required|included:Male,Female'" v-model="userInfo.gender"/>
                          <label for="2">زن</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-alert">
                      <p>{{ errors.first('gender') }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <div class="upload_body">
                      <div class="upload_file">
                        <img src="@/assets/img/default.svg" alt="">
                        <span class="upload_file_t" v-if="validations && !validations.profilePicConfirmed">بارگزاری تصویر</span>
                        <input v-if="validations && !validations.profilePicConfirmed" type="file" name="profilePhoto" ref="profilePhotoInput" @change="uploadProfilePic()"
                               class="upload-btn" v-validate="'required'" value="" id="pic1"/>
                        <div class="upload_pic" v-if="validations && !validations.profilePicConfirmed">
                          <img v-if="userInfo.profilePic"
                               v-bind:src="(userInfo.profilePic)?userInfo.profilePic.previewUrl:''" alt />
                        </div>
                        <div class="upload_back" v-if="userInfo.profilePic && userInfo.profilePic.previewUrl">
                          <div class="d-flex flex-column justify-content-center" style="height:100%">
                            <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal2')">
                              <img src="@/assets/img/see.svg" alt="">
                              مشاهده تصویر
                            </a>
                            <a href="#" v-if="validations && !validations.profilePicConfirmed" class="dl_pic upload_back_btn mx-auto" @click.prevent="showDelete('profilePhotoInput')">
                              <img src="@/assets/img/close.svg" alt="">
                              حذف تصویر
                            </a>
                            <label v-if="validations && !validations.profilePicConfirmed" class="upload_back_btn mx-auto" for="pic1">
                              <img src="@/assets/img/upload.svg" alt="">
                              بارگزاری مجدد
                            </label>
                          </div>
                        </div>
                      </div>
                      <span class="upload_title">
                         تصویر پروفایل کاربری
                      </span>
                    </div>
                    <div class="form-alert">
                      <p>{{ errors.first('profilePhoto') }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <div class="upload_body">
                      <div class="upload_file">
                        <img src="@/assets/img/default.svg" alt="">
                        <span class="upload_file_t" v-if="validations && !validations.birthCertPicConfirmed">بارگزاری تصویر</span>
                        <input v-if="validations && !validations.birthCertPicConfirmed" type="file" name="birthCertPic" ref="birthCertPhotoInput" @change="uploadBirthCertPicId()"
                               class="upload-btn" v-validate="'required'" value="" id="pic2"/>
                        <div class="upload_pic" v-if="validations && !validations.birthCertPicConfirmed">
                          <img v-if="userInfo.birthCertPic" v-bind:src="(userInfo.birthCertPic)?userInfo.birthCertPic.previewUrl:''" alt />
                        </div>
                        <div class="upload_back" v-if="userInfo.birthCertPic && userInfo.birthCertPic.previewUrl">
                          <div class="d-flex flex-column justify-content-center" style="height:100%">
                            <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal')">
                              <img src="@/assets/img/see.svg" alt="">
                              مشاهده تصویر
                            </a>
                            <a v-if="validations && !validations.birthCertPicConfirmed" href="#" class="dl_pic upload_back_btn mx-auto" @click.prevent="showDelete('birthCertPhotoInput')">
                              <img src="@/assets/img/close.svg" alt="">
                              حذف تصویر
                            </a>
                            <label v-if="validations && !validations.birthCertPicConfirmed" class="upload_back_btn mx-auto" for="pic2">
                              <img src="@/assets/img/upload.svg" alt="">
                              بارگزاری مجدد
                            </label>
                          </div>
                        </div>
                      </div>
                      <span class="upload_title">
                         تصویر صفحه اول شناسنامه
                      </span>
                    </div>
                    <div class="form-alert">
                      <p>{{ errors.first('birthCertPic') }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <div class="upload_body">
                      <div class="upload_file">
                        <img src="@/assets/img/default.svg" alt="">
                        <span class="upload_file_t" v-if="validations && !validations.birthCertDescPicConfirmed">بارگزاری تصویر</span>
                        <input type="file" v-if="validations && !validations.birthCertDescPicConfirmed" name="birthCertDescPic" ref="birthCertDescPhotoInput" @change="uploadBirthCertDescPicId()"
                               class="upload-btn" v-validate="'required'" value="" id="pic3"/>
                        <div class="upload_pic" v-if="validations && !validations.birthCertDescPicConfirmed">
                          <img v-if="userInfo.birthCertDescPic" v-bind:src="(userInfo.birthCertDescPic)?userInfo.birthCertDescPic.previewUrl:''" alt />
                        </div>
                        <div class="upload_back" v-if="userInfo.birthCertDescPic && userInfo.birthCertDescPic.previewUrl">
                          <div class="d-flex flex-column justify-content-center" style="height:100%">
                            <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal3')">
                              <img src="@/assets/img/see.svg" alt="">
                              مشاهده تصویر
                            </a>
                            <a href="#" v-if="validations && !validations.birthCertDescPicConfirmed" class="dl_pic upload_back_btn mx-auto" @click.prevent="showDelete('birthCertDescPhotoInput')">
                              <img src="@/assets/img/close.svg" alt="">
                              حذف تصویر
                            </a>
                            <label v-if="validations && !validations.birthCertDescPicConfirmed" class="upload_back_btn mx-auto" for="pic3">
                              <img src="@/assets/img/upload.svg" alt="">
                              بارگزاری مجدد
<!--                              <input type="file" name="birthCertDescPic" @change="uploadBirthCertDescPicId()"-->
<!--                                     class="upload-btn" value=""/>-->
                            </label>
                          </div>
                        </div>
                      </div>
                      <span class="upload_title">
                        تصویر صفحه توضیحات شناسنامه
                      </span>
                    </div>
                    <div class="form-alert">
                      <p>{{ errors.first('birthCertDescPic') }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <div class="upload_body">
                      <div class="upload_file">
                        <img src="@/assets/img/default.svg" alt="">
                        <span class="upload_file_t" v-if="validations && !validations.nationalCardPicConfirmed">بارگزاری تصویر</span>
                        <input type="file" v-if="validations && !validations.nationalCardPicConfirmed" name="nationalCardPic" ref="nationalCardPhotoInput" @change="uploadNationalCardPicId()"
                               class="upload-btn" v-validate="'required'" value="" id="pic4"/>
                        <div class="upload_pic" v-if="validations && !validations.nationalCardPicConfirmed">
                          <img v-if="userInfo.nationalCardPic" v-bind:src="(userInfo.nationalCardPic)?userInfo.nationalCardPic.previewUrl:''" alt />
                        </div>
                        <div class="upload_back" v-if="userInfo.nationalCardPic && userInfo.nationalCardPic.previewUrl">
                          <div class="d-flex flex-column justify-content-center" style="height:100%">
                            <a href="#" class="upload_back_btn mx-auto" @click.prevent="showMyModal('showPhotoModal4')">
                              <img src="@/assets/img/see.svg" alt="">
                              مشاهده تصویر
                            </a>
                            <a href="#" v-if="validations && !validations.nationalCardPicConfirmed" class="dl_pic upload_back_btn mx-auto" @click.prevent="showDelete('nationalCardPhotoInput')">
                              <img src="@/assets/img/close.svg" alt="">
                              حذف تصویر
                            </a>
                            <label v-if="validations && !validations.nationalCardPicConfirmed" class="upload_back_btn mx-auto" for="pic4">
                              <img src="@/assets/img/upload.svg" alt="">
                              بارگزاری مجدد
                            </label>
                          </div>
                        </div>
                      </div>
                      <span class="upload_title">
                        تصویر کارت ملی
                      </span>
                    </div>
                    <div class="form-alert">
                      <p>{{ errors.first('nationalCardPic') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row-new">
              <h1 class="form-header">اطلاعات تماس</h1>
              <div class="row">
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-12 col-12">
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
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-12 col-12">
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
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-12 col-12">
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
                <div class="col-xl-3 clo-lg-3 col-md-6 col-sm-12 col-12">
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
                <div class="col-xl-3 clo-lg-3 col-md-4 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="tell" name="fax" class="form-control" v-validate="'required'" v-model="userInfo.fax" :disabled="validations && validations.faxNumberConfirmed">
                      <i class="placeholder">فکس</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-9 clo-lg-9 col-md-8 col-sm-12 col-12">
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
                      <i class="placeholder">شماره حساب</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="inp_border">
                      <input type="text" name="ibanNumber" @blur="getBankInfo() , checkIban()"  v-validate="'ibanNumber'" class="form-control" v-model="userInfo.ibanNumber"  :disabled="validations && validations.ibanNumberConfirmed"/>
                      <div class="form-alert">
                        <p>{{ errors.first('ibanNumber') }}</p>
                      </div>
                      <span class="format_inp">مثال:IR410160000000008301078412</span>
                      <i class="placeholder">شماره شبا</i>
                      <i class="line"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 clo-lg-6 col-md-6 col-sm-12 col-12">
                  <h3 class="select_t">نوع حساب</h3>
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
    <!-- Show Photo Modal -->
    <b-modal id="displayPhoto" title="BootstrapVue" hide-header hide-footer size="md">
      <img v-if="hasPic" v-bind:src="imgSrc" alt />
    </b-modal>
    <!-- Show Photo Modal -->
    <!-- Show Delete Modal -->
    <b-modal id="deleteModal" title="BootstrapVue" hide-header hide-footer size="md">
      <h3 class="delete_title">حذف تصویر</h3>
      <span class="modal_extra_close">
        <img src="@/assets/img/close.png" alt="" @click="$bvModal.hide('deleteModal')">
      </span>
      <div class="delete_txt">
        <p>
          آیا از
          <i>حذف تصویر</i>
          اطمینان دارید؟
        </p>
      </div>
      <span style="display: none" v-bind:src="srcDl"></span>
      <div class="d-flex justify-content-start confirm_btn">
        <a href="#" class="btn" @click.prevent="deleteImage() , $bvModal.hide('deleteModal')">بله</a>
        <a href="#" class="btn btn-cancel" @click.prevent="$bvModal.hide('deleteModal')">خیر</a>
      </div>
    </b-modal>
    <!-- Show Photo Modal -->
  </div>
</template>

<script>

import PageHeader from '../header/PageHeader'
import toggleMenu from '../share/toggleMenu'
import sharedService from '@/services/sharedService'
import generalService from '@/services/generalService'
const moment = require('jalali-moment')
export default {
  name: 'user',
  data () {
    return {
      file: '',
      fund: {},
      fundId: 0,
      d: '',
      srcDl: '',
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
      get_founds_url: 'invest/user',
      imgSrc: '',
      hasPic: false
      //  MyDataMask: ['## ## ####']
      //  '## ## ####'
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
      this.mode = this.$route.params.mode
      generalService.getMethod('/invest/user/')
        .then(response => {
          this.userInfo = response.content
          this.d = moment.unix(this.userInfo.birthDate / 1000).format('jDD jMM jYYYY')
          this.checkDate()
          this.getRegisteredUserConfirmations()
          setTimeout(() => {
            sharedService.checkInputs()
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    }
    else{
      debugger
    }
    if (localStorage.getItem('userInfoData')) {
      this.$bvModal.show('confirmRefresh')
    }
    this.getCurentFund()
  },
  methods: {
       getCurentFund () {
      service.getMethod('invest/fund/' + this.fundId)
        .then(response => {
          this.fund = response.content
          this.fundId=this.fund.code
          console.log(this.fund)
          this.$session.set('currentFund', JSON.stringify(this.fund))
        })
        .catch(error => {
          console.log(error)
        })
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
    },
    showDelete (ref) {
      this.$bvModal.show('deleteModal')
      this.srcDl = ref
    },
    submitData: function () {
      this.$validator.validate().then(valid => {
        if (valid) {
          if (this.mode === 'create') {
            this.userInfo.personalPicId = this.userInfo.profilePic ? this.userInfo.profilePic.uniqueId : null
            this.userInfo.profilePicId = this.userInfo.profilePic ? this.userInfo.profilePic.uniqueId : null
            this.userInfo.birthCertPicId = this.userInfo.birthCertPic ? this.userInfo.birthCertPic.uniqueId : null
            this.userInfo.birthCertDescPicId = this.userInfo.birthCertDescPic ? this.userInfo.birthCertDescPic.uniqueId : null
            this.userInfo.nationalCardPicId = this.userInfo.nationalCardPic ? this.userInfo.nationalCardPic.uniqueId : null
            if (this.d) {
              let birth = this.d.split(' ')
              let birthDate = birth[0] + '/' + birth[1] + '/' + birth[2]
              this.userInfo.birthDate = new Date(moment(birthDate, 'jYYYY/jMM/jDD')).getTime()
            }
            generalService
              .postMethod(`invest/fund/register/investor/${this.fundId}`, this.userInfo)
              .then(response => {
                if (response.status === 0 && response.message === 'OK') {
                  // sharedService.Done('ثبت نام با موفقیت انجام شد')
                  setTimeout(() => {
                    this.$router.push('/userInformation')
                  }, 3000)
                }
              }).catch(error => {
                console.log(error)
              })
          } else if (this.mode === 'update') {
              if (this.d) {
              let birth = this.d.split(' ')
              let birthDate = birth[0] + '/' + birth[1] + '/' + birth[2]
              this.userInfo.birthDate = new Date(moment(birthDate, 'jYYYY/jMM/jDD')).getTime()
            }
            generalService
              .postMethod('/invest/user/', this.userInfo)
              .then(response => {
                if (response.status === 0 && response.message === 'OK') {
                  this.$router.back()
                }
              })
              .catch(error => {
                console.log(error)
              })
          }
        }
      })
    },
    checkDate () {
      if (this.d) {
        let bir = this.d.split(' ').reverse()
        this.d = bir.join('/')
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
            params: {nationalId: this.userInfo.nationalId, mobileNumber: this.userInfo.mobileNumber}
          })
          .then(response => {
            if (response.message === 'OK' && response.status === 0) {
              if (response.content.status) {
                debugger
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
                debugger
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
    refreshAlerts () {
      setTimeout(() => {
        this.uploadResponse = {
          active: 0,
          msg: '',
          status: 0
        }
      }, 5000)
    },
    deleteImage () {
      if (this.srcDl === 'profilePhotoInput') {
        this.$refs.profilePic = ''
        this.userInfo.profilePic.previewUrl = ''
        sharedService.test2('#pic1')
      } else if (this.srcDl === 'birthCertPhotoInput') {
        this.$refs.birthCertPic = ''
        this.userInfo.birthCertPic.previewUrl = ''
        sharedService.test2('#pic2')
      } else if (this.srcDl === 'birthCertDescPhotoInput') {
        this.$refs.birthCertDescPic = ''
        this.userInfo.birthCertDescPic.previewUrl = ''
        sharedService.test2('#pic3')
      } else if (this.srcDl === 'nationalCardPhotoInput') {
        this.$refs.nationalCardPic = ''
        this.userInfo.nationalCardPic.previewUrl = ''
        sharedService.test2('#pic4')
      }
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
      // this.$router.push('detail/10915')
      this.$router.back()
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
    },
    closeInnerModal () {
      sharedService.closeModal()
    }
  }
}
</script>

<style scoped>
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
  .upload_back_btn{
    cursor: pointer;
  }
  .delete_title{
    font-size: 15px;
    color: #cb0d0d;
    font-family: "Iransans_Bold";
  }
  .delete_txt{
    text-align: center;
    font-family: "Iransans_Medium";
    font-size: 15px;
    margin: 35px 0;
  }
  .delete_txt i{
    color: #cb0d0d;
  }
</style>
